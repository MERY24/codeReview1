import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth/auth.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserSerialized } from "src/users/serializers/UserSerialized";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy){

      constructor(private readonly authService:AuthService){
        super()//can accepts options passed in obj, for local strat,we dont need that
      }

      async validate(email:string,password:string){
        const user= await this.authService.validateUser(email,password);

        if(!user)
        throw new UnauthorizedException('stuck in local strategy');

        console.log(user);
          return user;
       // return new UserSerialized(user);//somehow nest manages mapping this to verfiy fct from passport so no prob
      }
}