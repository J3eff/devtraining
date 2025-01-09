import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1736435393976 } from 'src/migrations/1736435393976-CreateCoursesTable';
import { CreateTagsTable1736436491141 } from 'src/migrations/1736436491141-CreateTagsTable';
import { CreateCoursesTagsTable1736438125394 } from 'src/migrations/1736438125394-CreateCoursesTagsTable';
import { AddCouresesIdToCoursesTagsTable1736438792803 } from 'src/migrations/1736438792803-AddCouresesIdToCoursesTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1736435393976,
    CreateTagsTable1736436491141,
    CreateCoursesTagsTable1736438125394,
    AddCouresesIdToCoursesTagsTable1736438792803,
  ],
});
