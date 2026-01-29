import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async settle(@Param('address') address: string) {
    return await this.blockchainService.settlePendingEmissions(address);
  }
}
