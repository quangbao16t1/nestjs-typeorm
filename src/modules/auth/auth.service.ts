import { Inject, Injectable } from '@nestjs/common';
import UserCreateDto from 'src/dto/user/userCreate.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private authRepository: Repository<User>
    ) { }

    async register(user: User): Promise<User> {
        const newUser = await this.authRepository.findOne({ where: { email: user.email } });
        if(newUser) throw new Error();

        if(user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
        }

        return await this.authRepository.create(user);
    }
}
