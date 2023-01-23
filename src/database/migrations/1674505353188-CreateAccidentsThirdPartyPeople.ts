import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateAccidentsThirdPartyPeople1674505353188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accidents_third_party_people',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'accident_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'third_party_person_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'now()',
            isNullable: false,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'now()',
            isNullable: false,
          }),
          new TableColumn({
            name: 'deleted_at',
            type: 'timestamp without time zone',
            isNullable: true,
          }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'accidents_third_party_people',
      new TableForeignKey({
        name: 'AccidentThirdPartyPerson',
        columnNames: ['accident_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accidents',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'accidents_third_party_people',
      new TableForeignKey({
        name: 'ThirdPartyPersonAccident',
        columnNames: ['third_party_person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'third_party_people',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'accidents_third_party_people',
      'ThirdPartyPersonAccident',
    );

    await queryRunner.dropForeignKey(
      'accidents_third_party_people',
      'AccidentThirdPartyPerson',
    );

    await queryRunner.dropTable('accidents_third_party_people');
  }
}
