import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) { }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(user: User) {
        const newUser = await this.userRepository.findOne({ where: { email: user.email } })
        if (newUser) {
            throw `Email ${user.email} is allready taken!`;
        }
        const userCreate = new User();

        Object.assign(userCreate, user);

        if (user.password) {
            userCreate.password = await bcrypt.hashSync(user.password, 8);
        }

        await this.userRepository.create(userCreate);
    }
}
