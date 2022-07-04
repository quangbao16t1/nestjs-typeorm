import { Inject, Injectable } from '@nestjs/common';
import UserCreateDto from 'src/dto/user/userCreate.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/auth/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(user: User): Promise<User> {
        const newUser = await this.authRepository.findOne({ where: { email: user.email } });

        if (newUser) throw new Error();
        if (user.password) user.password = bcrypt.hashSync(user.password, 10);

        return await this.authRepository.create(user);
    }

    async validateEmailPass(email, password): Promise<any> {
        const user = await this.authRepository.findOne({ where: { email: email } });

        if (!user) throw new Error(`Email ${email} does not exists!!!`);

        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) throw new Error(`Password or Email isn't correct!!!`);

        return user;
    }

    async login(email) {
        const user = await this.authRepository.findOne({ where: { email: email } });
        const access_token = this.jwtService.sign({ user });
        return access_token;
    }


}
