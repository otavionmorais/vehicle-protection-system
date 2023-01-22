import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSource = new DataSource({
  type: 'postgres',
  entities: [__dirname + '/../**/*.model.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  url: process.env.DATABASE_URL,
});

export async function configureDatabase(): Promise<void> {
  await dataSource.initialize();
  console.info('Database is ready!');
}
