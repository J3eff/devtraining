import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagsIdToCoursesTagTable1736439870525
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags_tags',
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags_tags',
      new TableForeignKey({
        name: 'courses_tags_tags',
        columnNames: ['tagsId'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Quando um cursos for apagado a relação onde tem o valor do 'coursesId' vai ser NULL
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a relação
    await queryRunner.dropForeignKey('courses_tags_tags', 'courses_tags_tags');
    // Remove a coluna
    await queryRunner.dropColumn('courses_tags_tags', 'tagsId');
  }
}
