import { Controller, Get, Post, Inject, ClassSerializerInterceptor, UseInterceptors, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserSerialized } from 'src/users/serializers/UserSerialized';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    //@Inject('USER_SERVICETOKEN')

    constructor(private readonly userService:UsersService){}


    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers(){
    const users= await this.userService.findAllUSers();

    if(users) return users.map(user=>new UserSerialized(user))
    
    else return {message:"no users were found in the database"};
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() userData:CreateUserDto){
        return this.userService.newUSer(userData)
    }

}
