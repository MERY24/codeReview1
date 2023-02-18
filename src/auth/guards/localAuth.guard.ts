import {AuthGuard} from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExecutionContext} from '@nestjs/common/interfaces';
import { HttpException,HttpStatus} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()

export class LocalAuthGuard extends AuthGuard('local'){
   
    constructor(){
        super()
    }
    handleRequest(err:Error, user, info, context, status) {
        const request = context.switchToHttp().getRequest();
        const { email, password } = request.body;
        if (err || !user) {
          if (!email) {
            throw new HttpException({ message: 'email shouldn\'t be empty' }, HttpStatus.OK);
          } else if (!password) {
            throw new HttpException({ message: 'password shouldn\'t be empty' }, HttpStatus.OK);
          } else {
            throw err || new UnauthorizedException("welcome to localGuard");
          }
        }
        return user;
      }
    simpleHello(){
      console.log("hell welcomes u");
      return {msg:"hell welcomes u"}
    }
//     async canActivate(context:ExecutionContext){
//         const result=(await super.canActivate(context))as boolean;
//         const req=context.switchToHttp().getRequest();
//         console.log(req);
//     return req;
// }
}