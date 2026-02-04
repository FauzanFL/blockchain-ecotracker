import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      factory: '0x...',
      totalEmissions: '0',
      balance: '0',
      symbol: 'ECTR',
    },
  })
  async getBalance(@Param('address') address: string) {
    const factoryData = await this.blockchainService.getFactoryData(address);
    return { ...factoryData, balance: factoryData.balance / 1e18 };
  }

  @Get('stats/:address')
  @ApiOperation({ summary: 'Get factory statistics' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      factoryAddress: '0x...',
      totalAmount: '0',
      totalLogs: '0',
      history: [
        {
          id: '1',
          factoryAddress: '0x...',
          amount: '0',
          isSettled: false,
          txHash: '0x...',
          createdAt: '2021-01-01T00:00:00.000Z',
        },
      ],
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: [
      {
        id: '1',
        factoryAddress: '0x...',
        amount: '0',
        isSettled: false,
        txHash: '0x...',
        createdAt: '2021-01-01T00:00:00.000Z',
      },
    ],
  })
  async getPendingEmissions(@Param('address') address: string) {
    return await this.emissionsService.getPendingEmissionsByAddress(address);
  }

  @Post('settle/:address')
  @ApiResponse({
    status: 200,
    example: {
      factoryAddress: '0x...',
      totalSettled: 1000,
      txHash: '0x...',
      logCount: 10,
    },
  })
  async settle(@Param('address') address: string) {
    const logs =
      await this.emissionsService.getPendingEmissionsByAddress(address);
    if (logs.length == 0) {
      throw new NotFoundException('No pending emissions to settle');
    }
    return await this.blockchainService.settlePendingEmissions(address);
  }
}
