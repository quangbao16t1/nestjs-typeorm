import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Like, Repository } from 'typeorm';
import UserCreateDto from 'src/dto/user/userCreate.dto';
import { UserUpdateDto } from 'src/dto/user/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async getAllUser(queryDto): Promise<any> {
        const { keyword = '', page = 1, limit = 10, filter = '' } = queryDto;
        const take = +limit;
        const skip = (page - 1) * limit;

        let whereCon: any = [];

        let CONDITION = [
            { firstName: 'firstName', tags: 'address' },
            { firstName: 'lastName', tags: 'address' },
        ]
        console.log("=========", Like('%' + `${keyword}` + '%'))
        whereCon = CONDITION.map((item) => ({
            [item.firstName]: Like('%' + `${keyword}` + '%'),
            [item.tags]: Like('%' + filter + '%'),
        }))

        // if (!keyword && !filter) whereCon = {}

        console.log("------------", whereCon);
        // if (keyword) condition = Like('%' + keyword + '%');

        const [result, total] = await this.userRepository.findAndCount({
            where: whereCon,
            take: take,
            skip: skip,
        });

        return {
            page,
            page_size: take,
            total_page: Math.ceil(total / take),
            total_item: total,
            result,
        };
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
