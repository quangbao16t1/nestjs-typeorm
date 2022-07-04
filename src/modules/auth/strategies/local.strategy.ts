
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }
    async validate(email: string, password: string): Promise<any> {

        console.log({ email })
        const user = await this.authService.validateEmailPass(email, password);
        ;
        if (!user) throw new UnauthorizedException('signin failed');

        return user;
    }
}