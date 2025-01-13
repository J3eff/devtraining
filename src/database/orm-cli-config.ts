import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1736435393976 } from 'src/migrations/1736435393976-CreateCoursesTable';
import { CreateTagsTable1736436491141 } from 'src/migrations/1736436491141-CreateTagsTable';
import { CreateCoursesTagsTable1736438125394 } from 'src/migrations/1736438125394-CreateCoursesTagsTable';
import { AddCouresesIdToCoursesTagsTable1736438792803 } from 'src/migrations/1736438792803-AddCouresesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagTable1736439870525 } from 'src/migrations/1736439870525-AddTagsIdToCoursesTagTable';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false, //true: Quando entidade definidas, ele cria as tabelas automaticamente.
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1736435393976,
    CreateTagsTable1736436491141,
    CreateCoursesTagsTable1736438125394,
    AddCouresesIdToCoursesTagsTable1736438792803,
    AddTagsIdToCoursesTagTable1736439870525,
  ],
});
