import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class images1602629658845 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'fosterhome_id',
          type: 'integer'
        },
      ],
      foreignKeys: [
        {
          name: "ImageFosterHomes",
          columnNames: ['fosterhome_id'],
          referencedTableName: 'fosterhomes',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
