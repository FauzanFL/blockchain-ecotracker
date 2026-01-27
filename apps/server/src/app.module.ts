import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainService } from './blockchain/blockchain.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BlockchainService],
})
export class AppModule {}
