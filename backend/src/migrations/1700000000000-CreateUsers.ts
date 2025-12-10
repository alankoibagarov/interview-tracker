import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcryptjs';

export class CreateUsers1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" character varying NOT NULL,
        "passwordHash" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "themeDarkMode" boolean NOT NULL DEFAULT true,
        "email" character varying
      )
    `);

    const passwordHash = bcrypt.hashSync('password', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("username","passwordHash","email") VALUES ($1,$2,$3)`,
      ['admin', passwordHash, 'admin@example.com'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
