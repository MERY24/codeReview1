import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/typeorm/User.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [/*{
    provide:'USER_SERVICETOKEN',
    useClass:UsersService // il accepte pas ça bizzare
  },*/UsersService],
  exports:[UsersService]//we need to export to make it visible from outside
})
export class UsersModule {}
