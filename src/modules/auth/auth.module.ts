import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/config/database.module';
import { authProviders } from './auth.providers';

@Module({
  providers: [AuthService, ...authProviders],
  controllers: [AuthController],
  imports: [DatabaseModule]
})
export class AuthModule {}
