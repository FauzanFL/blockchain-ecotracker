import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BlockchainService } from 'src/blockchain/blockchain.service';

@Controller('emissions')
export class EmissionsController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('log')
  async logEmission(@Body() body: { factoryAddress: string; amount: number }) {
    if (!body.factoryAddress || !body.amount) {
      throw new BadRequestException('Factory address and amount are required');
    }
    return await this.blockchainService.recordEmission(
      body.factoryAddress,
      body.amount,
    );
  }
}
