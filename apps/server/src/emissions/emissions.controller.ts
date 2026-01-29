import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogEmissionDto } from './log-emission.dto';
import { EmissionsService } from './emissions.service';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { EmissionLog } from '../generated/prisma/client';

@ApiTags('emissions')
@Controller('emissions')
export class EmissionsController {
  constructor(
    private readonly emissionsService: EmissionsService,
    private readonly blockchainService: BlockchainService,
  ) {}

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
    return await this.emissionsService.logEmission(body);
  }

  @Get('balance/:address')
  @ApiOperation({ summary: 'Get total emission and balance' })
  async getBalance(@Param('address') address: string) {
    return await this.blockchainService.getFactoryData(address);
  }

  @Get('stats/:address')
  @ApiOperation({ summary: 'Get factory statistics' })
  async getStats(@Param('address') address: string) {
    const logs: EmissionLog[] = await this.emissionsService.getLogs(address);

    const totalAmmount = logs.reduce((acc, log) => acc + log.amount, 0);

    return {
      factoryAddress: address,
      totalAmount: totalAmmount,
      totalLogs: logs.length,
      history: logs,
    };
  }

  @Get('pending/:address')
  @ApiOperation({ summary: 'Get pending emissions' })
  async getPendingEmissions(@Param('address') address: string) {
    return await this.emissionsService.getPendingEmissionsByAddress(address);
  }
}
