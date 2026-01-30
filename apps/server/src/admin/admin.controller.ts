import { Controller, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

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
    return await this.blockchainService.settlePendingEmissions(address);
  }
}
