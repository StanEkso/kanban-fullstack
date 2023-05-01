import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnOrder1682962413054 implements MigrationInterface {
    name = 'AddColumnOrder1682962413054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "order"`);
    }

}
