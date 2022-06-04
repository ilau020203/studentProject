import {JsonController, Get, Post , Param, Delete, Body,Put, Authorized} from "routing-controllers";
import {Service} from "typedi";
import User from "../models/User";
import {DeleteResult, getConnection} from "typeorm";
import { UserRepository } from "../services/user";

@Service()
@JsonController()
export class UserConntroller {
    constructor(private userRepository: UserRepository) {
    }
    @Get("/user")
    @Authorized()
    async all(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
    
   

    
                   
    @Post("/user")
    async post(@Body() user: User) {
        return await this.userRepository.create(user);
    }

    

    @Delete("/user-delete/:id")
    async delete(@Param("id") id: number):Promise<DeleteResult> {
        return   await this.userRepository.delete(id);
    }

    @Put('/user-update/:id')
    async put(@Param('id') id: number, @Body() user: User) {
        return await this.userRepository.update(id,user)
    }

}