import {
    JsonController,
    Post,
    Body,
    CurrentUser,
    Param,
    Authorized,
  } from 'routing-controllers';
  import 'reflect-metadata';
  import {
    signUp,
    RegistrationParams,
    login,
    AuthorizationParams,
    RefreshTokenParams,
    refreshUserToken,
    logout,
  } from '../services/auth';
  import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
  import  User  from '../models/User';
  
  // https://github.com/typestack/routing-controllers
  
  class RegistrationData implements Partial<RegistrationParams> {
    @IsNotEmpty()
    @IsEmail()
    email!: string;
  
    @IsNotEmpty()
    username!: string;
  
    @IsNotEmpty()
    password!: string;
  
  }
  
  class LoginData implements Partial<AuthorizationParams> {
    @IsNotEmpty()
    email!: string;
  
    @IsNotEmpty()
    password!: string;
  }
  
  class RefreshTokenData implements RefreshTokenParams {
    @IsNotEmpty()
    refreshToken!: string;
  }
  
  @JsonController('/auth')
  export class AuthController {
    @Post('/registration')
    async registration(@Body() registrationData: RegistrationData) {
      console.log("asdf")
      const res = await signUp(registrationData);
      const json = res as Partial<User>;
      delete json.passwordHash;
      delete json.refreshToken;
      return {
        result: json,
      };
    }
  
    @Post('/login')
    async login(@Body() loginData: LoginData) {
      const res = await login(loginData);
  
      return {
        result: res,
      };
    }
  
    @Post('/logout')
    async logout(@CurrentUser() user: User) {
      await logout(user);
  
      return {
        result: true,
      };
    }
  
    @Post('/refresh')
    async refreshToken(@Body() refreshTokenData: RefreshTokenData) {
      const res = await refreshUserToken(refreshTokenData);
  
      return {
        result: res,
      };
    }
  
   

  }
  