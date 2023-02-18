import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entitiesSchema from './typeorm/indexEntities';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'42mer44yas88?02!01',
    database:'my_nest_db',
    entities: entitiesSchema,
    synchronize:true,//only in dev, disabled in production (dataloss)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
