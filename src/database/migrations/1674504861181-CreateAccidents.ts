import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateAccidents1674504861181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accidents',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'vehicle_plate',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'vehicle_model',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'vehicle_color',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
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
      'accidents',
      new TableForeignKey({
        name: 'clientIdAccidents',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('accidents', 'clientIdAccidents');
    await queryRunner.dropTable('accidents');
  }
}
