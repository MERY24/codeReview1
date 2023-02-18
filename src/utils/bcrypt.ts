import * as bcrypt from 'bcrypt';

export function encryptPassword(psw:string){
    const SALT=bcrypt.genSaltSync();
    return  bcrypt.hashSync(psw,SALT)
}

export function comparePasswords(psw:string,pswHash:string){
    return bcrypt.compareSync(psw,pswHash)
}