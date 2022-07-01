import { User } from "src/entity/user.entity";
import { DataSource } from "typeorm";

export const authProviders = [
    {
        provide: 'AUTH_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository(User),
        inject: ['DATA_SOURCE'],
    }
];