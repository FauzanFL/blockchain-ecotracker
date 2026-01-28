import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private blockchainService: BlockchainService,
    private prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleAutomatedSettle() {
    this.logger.log('Running automated settle task...');

    const pendingFactories = await this.prisma.emissionLog.groupBy({
      by: ['factoryAddress'],
      where: { isSettled: false },
    });

    if (pendingFactories.length === 0) {
      this.logger.log('No pending emissions to settle.');
      return;
    }

    for (const factory of pendingFactories) {
      try {
        this.logger.log(`Processing factory: ${factory.factoryAddress}`);

        const result = await this.blockchainService.settlePendingEmissions(
          factory.factoryAddress,
        );

        this.logger.log(
          `Successfully settled ${result.totalSettled} kg emissions for ${factory.factoryAddress}. Tx: ${result.txHash}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to settle ${factory.factoryAddress}: ${error}`,
        );
      }
    }
  }
}
