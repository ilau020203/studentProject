import { IsDefined, MinLength } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,  
    JoinTable
} from 'typeorm';

import { RoleType } from '../common/enums';
import Post from './Post';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
    nullable: true,
    })
    refreshToken?: string;

    @Column()
    @MinLength(32)
    @IsDefined()
    passwordHash!: string;

    @Column({
    length: 255,
    })
    @MinLength(4)
    email!: string;

    @Column({
    length: 80,
    })
    @IsDefined()
    username!: string;

    @Column({
    default: RoleType.CANDIDATE,
    })
    roleId!: RoleType;

    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    public updatedAt!: Date;

    @OneToMany(() => Post, post => post.author, {
        onDelete: 'CASCADE',
        nullable: true,
      })
    posts?: Post[];

    @ManyToMany(() => Post)
    @JoinTable({ name: 'likes' })
    likes?: Post[]; 
    
}
