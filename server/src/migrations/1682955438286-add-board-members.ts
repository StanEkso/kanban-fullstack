import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBoardMembers1682955438286 implements MigrationInterface {
    name = 'AddBoardMembers1682955438286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards_members_users" ("boardsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_0507fc3e846418446e99fd03e9f" PRIMARY KEY ("boardsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa52b653d5ca1d5504de6c55b2" ON "boards_members_users" ("boardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8921936884278e82d0b84354f6" ON "boards_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "boards_members_users" ADD CONSTRAINT "FK_fa52b653d5ca1d5504de6c55b21" FOREIGN KEY ("boardsId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "boards_members_users" ADD CONSTRAINT "FK_8921936884278e82d0b84354f6c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards_members_users" DROP CONSTRAINT "FK_8921936884278e82d0b84354f6c"`);
        await queryRunner.query(`ALTER TABLE "boards_members_users" DROP CONSTRAINT "FK_fa52b653d5ca1d5504de6c55b21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8921936884278e82d0b84354f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa52b653d5ca1d5504de6c55b2"`);
        await queryRunner.query(`DROP TABLE "boards_members_users"`);
    }

}
