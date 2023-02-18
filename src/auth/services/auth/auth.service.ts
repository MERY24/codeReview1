import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService){ }

    async validateUser(email:string,password:string){
        const authUser=await this.userService.findUSerByEmail(email);

        if (!authUser){
           console.log("user was not found in the database");
           throw new BadRequestException();//should do a redirect to subscription
        }

        const pswMatch=comparePasswords(password,authUser.password);

        if(!pswMatch){
            console.log("passwords did not match");
            return null;
        }

        console.log("passwords matched");
        return authUser;
    }
}
