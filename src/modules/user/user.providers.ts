import { User } from "src/entity/user.entity";
import { DataSource } from "typeorm";

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository(User),
        inject: ['DATA_SOURCE'],
    }
];