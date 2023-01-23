import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateClientsTable1674417060143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'document',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'birth_date',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'password',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
