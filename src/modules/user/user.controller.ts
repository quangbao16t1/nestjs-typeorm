import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { resultData } from 'src/common/resultData';
import { QueryDto } from 'src/dto/user/query.dto';
import UserCreateDto from 'src/dto/user/userCreate.dto';
import { UserUpdateDto } from 'src/dto/user/userUpdate.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.strategy';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userSevice: UserService) { }

    @Get()
    async getAllUsers(@Res() response, @Query() queryDto: QueryDto) {
        const listUser = await this.userSevice.getAllUser(queryDto);
        return response.status(HttpStatus.OK).json({
            listUser,
            message: "Successfully!!!"
        })
    }

    @Post()
    async createUser(@Res() response, @Body() body: UserCreateDto) {
        try {
            const result = await this.userSevice.createUser(body);
            if (result) response.json(resultData(HttpStatus.CREATED, result, "created success", []))
        } catch (error) {
            response.json(resultData(HttpStatus.INTERNAL_SERVER_ERROR, [], "create failed", error.message))
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Res() response, @Param('id') id: number) {
        try {
            const result = await this.userSevice.getUserById(id);

            if (result) response.json(resultData(HttpStatus.OK, result, "success", []));
        } catch (error) {
            response.json(resultData(HttpStatus.INTERNAL_SERVER_ERROR, [], "not found", error.message))
        }
    }

    @Put(':id')
    async updateUser(
        @Res() response,
        @Body() body: UserUpdateDto,
        @Param('id') id: number,
    ) {
        try {
            const result = await this.userSevice.updateUser(body, id);
            
            if (result) response.json(resultData(HttpStatus.OK, result, "updated success", []));
        } catch (error) {
            response.json(resultData(HttpStatus.INTERNAL_SERVER_ERROR, [], "not found", error.message))
        }
    }
}
