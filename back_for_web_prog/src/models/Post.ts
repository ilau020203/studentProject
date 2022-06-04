import { IsDefined, MinLength } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,  
} from 'typeorm';

import { RoleType } from '../common/enums';
import User from './User';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.posts, {
    onDelete: "CASCADE",
    })
    author!: User;

    @ManyToMany(() => User)
    @JoinTable({ name: 'likes' })
    likes?: User[]|null; 
    
    @Column({
    length: 80,
    })
    @IsDefined()
    title!: string;


    @Column({
        type: 'text',
    })
    @IsDefined()
    text?: string;


    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    public updatedAt!: Date;

    
}
