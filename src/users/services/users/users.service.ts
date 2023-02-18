import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encryptPassword } from 'src/utils/bcrypt';
import { InjectRepository} from '@nestjs/typeorm'
import { UserSchema } from 'src/typeorm/User.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserSchema)private readonly userRepository:Repository<UserSchema>){

        /*in nest we use repos to say that is a table,if want to instanciate a user,just use userRepository*/
 }
 
    async findUSerByEmail(email:string){
    const userFound= await this.userRepository.findOneBy({email})
    return userFound;
    }

    async newUSer(userData:CreateUserDto){
        //checks if the user exists
        const userExists= await this.findUSerByEmail(userData.email)
        if(userExists)
        throw new HttpException('someone already uses this email,pls use another one',HttpStatus.CONFLICT);


     const password=encryptPassword(userData.password);
     const userCreated= this.userRepository.create({...userData,password})//user created we need to save it in db
     
    return this.userRepository.save(userCreated);
    }
    
    async findAllUSers(){
        const users= await this.userRepository.find();
        return users;

    }

    

}
