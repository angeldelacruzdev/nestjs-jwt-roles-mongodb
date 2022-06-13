import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategiest extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['LOGIN_INFO'];
          if (!data) {
            return null;
          }

          return data;
        },
      ]),
      secretOrKey: 'at-secret',
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
