import {
    PostgresConnectionOptions
} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import User from './models/User'
import Post from './models/Post'


const typeOrmConfig: PostgresConnectionOptions = {

    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "ilau",
    
    password: "ilau020203",
    database: "project_student",
    synchronize: true,
    logging: false,
   
    entities: [
        User,
        Post
    ],
  
};

export { typeOrmConfig };
//"src/entity/*.ts"