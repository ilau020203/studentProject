import { Action, HttpError, UnauthorizedError } from 'routing-controllers';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import  User  from '../models/User';
import { RoleType } from '../common/enums';
import { DataStoredInJWT, TokenData } from '../common/types';
import { REFRESH_TOKEN_LIFESPAN, TOKEN_LIFESPAN } from '../common/constants';
import { getLogger } from 'log4js';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { CurrentUserChecker } from 'routing-controllers/types/CurrentUserChecker';


import { DeepPartial, getRepository } from 'typeorm';


export interface RegistrationParams {
  username: string;
  email: string;
  password: string;
}

const logger = getLogger();

export const signUp = async ({
  username,
  email,
  password
}: RegistrationParams) => {
  

  const userRep = getRepository(User);


  let user = await userRep.findOne({
    where: [{ email }],
  });

  if (user) {
    throw new HttpError(422, 'auth.duplicate-email');
  }

   user = await userRep.findOne({
    where: [{ username }],
  });

  if (user) {
    throw new HttpError(422, 'auth.duplicate-username');
  }
  
  const roleId = RoleType.ADMIN;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await userRep.save<DeepPartial<User>>({
    username,
    email,
    passwordHash,
    roleId
  });

  
  
  
  return await userRep.save<DeepPartial<User>>(newUser);
};

export interface AuthorizationParams {
  email: string;
  password: string;
}

export const logout = async (currentUser: User) => {
  const userRep = getRepository(User);

  currentUser.refreshToken = '';

  await userRep.save(currentUser);
};

export const login = async ({ email, password }: AuthorizationParams) => {
  const userRep = getRepository(User);

  const user = await userRep.findOne({
    where: [{ email }],
  });

  if (!user) {
    throw new UnauthorizedError('auth.invalid');
  }

  


  const isMatched = await bcrypt.compare(password, user.passwordHash);

  if (!isMatched) {
    throw new UnauthorizedError('auth.invalid');
  }

  const token = createToken(user);

  user.refreshToken = token.refreshToken;
  await userRep.save(user);
  const id = user.id;
  return {token,id  };
};


export interface RefreshTokenParams {
  refreshToken: string;
}



export const refreshUserToken = async ({ refreshToken }: RefreshTokenParams) => {
  if (isTokenExpired(refreshToken)) {
    throw new UnauthorizedError('auth.refresh-expired');
  }

  const userRep = getRepository(User);

  const { refreshSecret } = getSecrets();

  const refreshData = jwt.verify(refreshToken, refreshSecret) as DataStoredInJWT;

  // TODO: change to Redis server
  // Will allow to run multiple processes.

  const tryFindUser = await userRep.findOne({
    where: [
      {
        id:Number.parseInt( refreshData.id),
        refreshToken,
      },
    ],
  });

  if (!tryFindUser) {
    throw new UnauthorizedError('auth.refresh-invalid');
  }

 

  const token = createToken(tryFindUser);

  tryFindUser.refreshToken = token.refreshToken;
  await userRep.save(tryFindUser);

  return token;
};

export const getSecrets = () => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET)
    logger.fatal(
      'No JWT_SECRET or JWT_REFRESH_SECRET provided in .env, JWT tokens will fail.'
    );

  return {
    accessSecret: process.env.JWT_SECRET || 'asdf',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fsda',
  };
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    const expiresAtMs = exp * 1000;

    return Date.now() >= expiresAtMs;
  } catch {
    return true;
  }
};

export const createToken = (user: User): TokenData => {
  const { accessSecret, refreshSecret } = getSecrets();
  const dataStoredInToken: DataStoredInJWT = {
    id: user.id.toString(),
    role: user.roleId,
  };
  return {
    expiresIn: TOKEN_LIFESPAN,
    token: jwt.sign(dataStoredInToken, accessSecret, {
      expiresIn: TOKEN_LIFESPAN,
    }),
    refreshToken: jwt.sign(dataStoredInToken, refreshSecret, {
      expiresIn: REFRESH_TOKEN_LIFESPAN,
    }),
  };
};

export const authorizationChecker: AuthorizationChecker = async (
  action: Action,
  roles: RoleType[]
) => {

    const header = action.request.headers['authorization'];
   
  if (!header) {
    throw new HttpError(422, 'Authorization header is required');
  }

  const token = header.replace('Bearer ', '');

  if (isTokenExpired(token)) {
    throw new HttpError(401, 'auth.expired');
  }

  const { accessSecret } = getSecrets();

  try {
    const verificationResponse = jwt.verify(token, accessSecret) as DataStoredInJWT;
    const { role } = verificationResponse;

    return !roles.length || roles.includes(role);
  } catch (e) {}

  return false;

  
};

export const currentUserChecker: CurrentUserChecker = async (action: Action) => {
  const header = action.request.headers['authorization'];

  if (!header) {
    throw new HttpError(422, 'Authorization header is required');
  }

  const token = header.replace('Bearer ', '');

  if (isTokenExpired(token)) {
    return false;
  }

  const { accessSecret } = getSecrets();

  try {
    const userRep = getRepository(User);

    const verificationResponse = jwt.verify(token, accessSecret) as DataStoredInJWT;
    const id = verificationResponse.id;

    return userRep.findOne(id, {
      relations: [
        'posts'

      ],
    });

  } catch (e) {
    return undefined;
  }
};