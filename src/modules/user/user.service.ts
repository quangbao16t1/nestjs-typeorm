import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import UserCreateDto from 'src/dto/user/userCreate.dto';
import { UserUpdateDto } from 'src/dto/user/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                role: true
            }
        });
    }

    async createUser(user: UserCreateDto): Promise<User> {
        const newUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (newUser) throw new Error(`Email ${user.email} already exists!!!`);

        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
        }

        return await this.userRepository.save(user);
    }

    async getUserById(id): Promise<User> {
        return await this.userRepository.findOne({ where: { id: id } });
    }

    async updateUser(user: UserUpdateDto, id: number): Promise<User> {
        const userUpdate = await this.userRepository.findOne({ where: { id: id } });

        if (!userUpdate) throw new Error(`Not found`);

        Object.assign(userUpdate, user);

        return await this.userRepository.save(userUpdate);
    }

    async deleteUser(id) {
        const userDelete = await this.userRepository.findOne({ where: { id: id } });

        if (!userDelete) throw new Error(`Not found`);

        return await this.userRepository.delete(userDelete);
    }
}
