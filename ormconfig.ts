import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.RDS_ENDPOINT,
  port: parseInt(process.env.RDS_PORT as string) as number,
  username: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: 'pds-database',
  entities: ['src/**/*.model.ts'],
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
  synchronize: false,
};
