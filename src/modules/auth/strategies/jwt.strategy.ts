import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'TU_CLAVE_SECRETA_SUPER_SEGURA', // Debe coincidir con auth.module
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.email, rol: payload.rol };
    }
}