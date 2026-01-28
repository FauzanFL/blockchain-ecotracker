import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { ConfigModule } from '@nestjs/config';
import { EmissionsController } from './emissions/emissions.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmissionsService } from './emissions/emissions.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
  ],
  controllers: [AppController, EmissionsController],
  providers: [AppService, BlockchainService, PrismaService, EmissionsService],
})
export class AppModule {}
