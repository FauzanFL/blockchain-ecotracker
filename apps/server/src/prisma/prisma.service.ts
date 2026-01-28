import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { parse } from 'pg-connection-string';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const config = parse(process.env.DATABASE_URL);
    super({
      adapter: new PrismaPg({
        host: config.host!,
        port: Number(config.port),
        user: config.user!,
        password: config.password!,
        database: config.database!,
        ssl: config.ssl as any,
      }),
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
