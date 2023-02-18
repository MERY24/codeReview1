import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';


@Entity()

export class UserSchema{
    @PrimaryGeneratedColumn({
        type:'bigint',
    })
    id:number;

    @Column({
        unique:true,
        nullable:false
    })
    email:string;

    @Column({
        nullable:false,
    })
    firstname: string;

    @Column({
        nullable:false,
    })
    lastname: string;

    @Column({
        nullable:false,
    })
    password:string;

}