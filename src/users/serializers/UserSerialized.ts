import { Exclude } from 'class-transformer';

export class UserSerialized{
  
    @Exclude()
    id: number;
    
    firstName: string;
    lastName: string;

    @Exclude()
    password:string;  
    constructor(partial: Partial<UserSerialized>) {
        Object.assign(this, partial);}
}