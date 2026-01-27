import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { ConfigModule } from '@nestjs/config';
import { EmissionsController } from './emissions/emissions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, EmissionsController],
  providers: [AppService, BlockchainService],
})
export class AppModule {}
