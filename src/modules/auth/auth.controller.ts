import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { resultData } from 'src/common/resultData';
import { LoginDto } from 'src/dto/auth/signin.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local-auth.strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() response) {
        try {

            console.log('user', req.body);

            const access_token = await this.authService.login(req.body.email);

            if (access_token) response.json(resultData(HttpStatus.OK, access_token, "login success", []));

        } catch (error) {
            response.json(resultData(HttpStatus.BAD_REQUEST, [], "login failed", error.message))
        }
    }
}
