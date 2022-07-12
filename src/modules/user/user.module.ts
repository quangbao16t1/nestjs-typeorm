import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from 'src/config/database.module';
import { User } from 'src/entity/user.entity';
import { UserController } from './user.controller';
// import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // ...userProviders
  ]
})
export class UserModule { }
