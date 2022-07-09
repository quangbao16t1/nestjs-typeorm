// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',
//         password: 'Nqb01011998@',
//         database: 'nesttypeorm',
//         entities: [
//           __dirname + '/../**/*.entity{.ts,.js}',
//         ],
//         synchronize: false,
//         dropSchema: false,
//         migrations: [
//           'src/database/migrations/*{.ts}',
//           'dist/database/migrations/*{.ts, .js}'
//         ],
//         migrationsTableName: 'migrations',
//       });

//       return dataSource.initialize();
//     },
//   },
// ];