import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthValidationMiddleware } from './middlewares/auth-validation/auth-validation.middleware';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/LocalStrategy';

@Module({
  imports:[UsersModule,PassportModule],//i think if u use provide token this isnt needed
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController],
  exports:[]
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthValidationMiddleware)
  //     .forRoutes({ path: '/auth/login', method: RequestMethod.POST });
  // }
}
