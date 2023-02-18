import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { LoginDto } from 'src/auth/dtos/Login.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const login = new LoginDto();
    const errors = [];

    Object.keys(body).forEach((key) => {
      login[key] = body[key];
    });

    try {
      await validateOrReject(login);
    } catch (errs) {
      errs.forEach((err) => {
        Object.values(err.constraints).forEach((constraint) =>
          errors.push(constraint),
        );
      });
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
