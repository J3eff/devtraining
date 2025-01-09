import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1736435393976 } from 'src/migrations/1736435393976-CreateCoursesTable';
import { CreateTagsTable1736436491141 } from 'src/migrations/1736436491141-CreateTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1736435393976, CreateTagsTable1736436491141],
});
