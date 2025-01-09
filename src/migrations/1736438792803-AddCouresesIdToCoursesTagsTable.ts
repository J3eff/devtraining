import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCouresesIdToCoursesTagsTable1736438792803
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Quando um cursos for apagado a relação onde tem o valor do 'coursesId' vai ser NULL
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a relação
    await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');
    // Remove a coluna
    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }
}
