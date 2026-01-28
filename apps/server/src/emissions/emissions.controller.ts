import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { LogEmissionDto } from './log-emission.dto';

@ApiTags('emissions')
@Controller('emissions')
export class EmissionsController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('log')
  @ApiOperation({ summary: 'Log new emission data to blockchain' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    example: { success: true, txHash: '0x...', blockNumber: 1 },
  })
  async logEmission(@Body() body: LogEmissionDto) {
    if (!body.factoryAddress || !body.amount) {
      throw new BadRequestException('Factory address and amount are required');
    }
    return await this.blockchainService.recordEmission(
      body.factoryAddress,
      body.amount,
    );
  }
}
