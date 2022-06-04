import {Service} from "typedi";
import User from "../models/User";
import {DeleteResult, getConnection} from "typeorm";
import { Action, HttpError, UnauthorizedError } from 'routing-controllers';

@Service()
export class UserRepository{

    async findAll(): Promise<User[]> {
        return await getConnection().getRepository(User).find();
    }
    
  

    async searchOneUserWithDrivinEntry(user_id: number) {
        return await getConnection().getRepository(User).createQueryBuilder("user")
        .leftJoinAndSelect("user.drivingEntries", "drivingEntry")
        .where("user.id = :id", { id:user_id})
        .getOne();
    }

    async searchOneUserName(username: string) {
        return await getConnection().getRepository(User).findOne({where :{ username } });
    }
    
    async searchManyUserName( username: string) {
        return await getConnection().getRepository(User).find({where :{ username } });
    }              
    
    async create( car: User) {
        return await getConnection().getRepository(User).save(car);
    }

  
    async delete( id: number):Promise<DeleteResult> {
        return await getConnection().getRepository(User).createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();
    }

    
    async update( id: number,  user: User) {
        return await getConnection().getRepository(User).createQueryBuilder()
        .update(User)
        .set(user)
        .where("id = :id", { id: 1 })
        .execute()
    }

}