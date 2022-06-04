import {JsonController, Get, Post as POST , Param, Delete, Body,Put, Authorized, CurrentUser} from "routing-controllers";
import {Service} from "typedi";
import User from "../models/User";
import {DeleteResult, getConnection} from "typeorm";
import { PostCreateUpdate,PostRepository } from "../services/post";
import Post from "../models/Post";

@Service()
@JsonController('/post')
export class PostConntroller {
    constructor(private postRepository: PostRepository) {
    }
    @Get("/all")
    @Authorized()
    async all(): Promise<Post[]> {
        return await this.postRepository.findAll();
    }
    
   

    
                   
    @POST("/create")
    
    async create(@Body() post : PostCreateUpdate,@CurrentUser() user: User) {
        console.log("asdf")
        await this.postRepository.create(post , user);
        return {result:"asdf"};
    }

    @POST("/:id/add-like")
    @Authorized()
    async creaddLikeate(@Param('id') id: number,@CurrentUser() user: User) {
        return await this.postRepository.addLike(id , user);
    }
    @POST("/:id/sub-like")
    @Authorized()
    async subLike(@Param('id') id: number,@CurrentUser() user: User) {
        return await this.postRepository.subLike(id , user);
    }

    

    

}