import { Controller,Post, Get,Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/localAuth.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('auth')
export class AuthController {

    @Get()
    simpleMsg(){
        return {msg:"welecome to auth controller"}
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Request() req){
       const user= req.user;//we can access to user cause it was returned by the validate meth in lclStratgy in the obj request
       return  {msg:"user authenticated",...user};
    }
    
}
