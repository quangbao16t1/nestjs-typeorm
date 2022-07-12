import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './constant.config';

const config: any = {
  type: 'mysql',
  host: database_config.HOST,
  port: database_config.PORT,
  username: database_config.USERNAME,
  database: database_config.DATABASE,
  password: database_config.PASSWORD,
  entities: [`src/entity/*.entity.{js,ts}`],
  migrations: [`src/database/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `src/database/migrations,`
  },
  extra: { charset: 'utf8mb4_unicode_ci' },
  synchronize: false,
  logging: true,
}

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => config
}

export const typeOrmConfig: TypeOrmModuleOptions = config;
