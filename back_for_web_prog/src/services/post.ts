import {Service} from "typedi";
import User from "../models/User";
import Post from "../models/Post";
import {DeleteResult, getRepository} from "typeorm";
import { Action, HttpError, NotFoundError, UnauthorizedError } from 'routing-controllers';

export class PostCreateUpdate {
   text!:string;
   title!:string;
}  

@Service()
export class PostRepository{

    async findAll(): Promise<Post[]> {
        console.log("test")
        return await getRepository(Post).find({
            relations:["author","likes"]
        });
    }
    
    async addLike( id: number, user :User) {
        const postRep = getRepository(Post);
        let post = await postRep.findOne(id,{
            relations:["likes"]
        });

        if(!post){
            throw new NotFoundError("post.not.found")
        }

        if(!post.likes){
            post.likes=[user]
        }else{
            if(post.likes.findIndex((e)=>{e.id==user.id})!=-1)
                throw new HttpError(413,"pshelNahuy");
            post.likes.push(user)
        }
        return await postRep.save(post)        

        
    }

    async subLike( id: number, user :User) {
        const postRep = getRepository(Post);
        let post = await postRep.findOne(id,{
            relations:["likes"]
        });

        if(!post){
            throw new NotFoundError("post.not.found")
        }

        if(!post.likes){
            throw new HttpError(413,"pshelNahuy");
        }else{
            let id =post.likes.findIndex((e)=>{e.id==user.id})
            if(id ==-1)
                throw new HttpError(413,"pshelNahuy");
           
            post.likes.splice(id,1)
        }
        return await postRep.save(post)        

        
    }
  

    

 
    
    async create( post: PostCreateUpdate, user :User) {
        const postRep = getRepository(Post);
        console.log("1asdf")
        const userRep = getRepository(User);
        const addedPost = await postRep.save({
            text: post.text,
            title: post.title,
            author: user
        })
        console.log("2asdf")
        if(!user.posts){
            user.posts=[addedPost]
        }else{
            user.posts.push(addedPost)
        }
        console.log("3asdf")

        return await userRep.save(user)
    }

  
    async delete( id: number):Promise<DeleteResult> {
        return await getRepository(User).createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();
    }

    
    async update( id: number,  user: User) {
        return await getRepository(User).createQueryBuilder()
        .update(User)
        .set(user)
        .where("id = :id", { id: 1 })
        .execute()
    }

}