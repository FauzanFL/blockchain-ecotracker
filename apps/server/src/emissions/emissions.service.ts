import { Injectable } from '@nestjs/common';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogEmissionDto } from './log-emission.dto';

@Injectable()
export class EmissionsService {
  constructor(
    private prisma: PrismaService,
    private blockchainService: BlockchainService,
  ) {}

  async logEmission(dto: LogEmissionDto) {
    const log = await this.prisma.emissionLog.create({
      data: {
        factoryAddress: dto.factoryAddress,
        amount: dto.amount,
      },
    });

    try {
      const result = await this.blockchainService.recordEmission(
        dto.factoryAddress,
        dto.amount,
      );

      await this.prisma.emissionLog.update({
        where: {
          id: log.id,
        },
        data: {
          txHash: result.txHash,
        },
      });

      return {
        status: 'success',
        message: 'Emission logged successfully',
        dbId: log.id,
        txHash: result.txHash,
      };
    } catch (error) {
      return {
        status: 'pending',
        message: 'Blockchain delay',
        dbId: log.id,
      };
    }
  }

  async getLogs(address: string) {
    return await this.prisma.emissionLog.findMany({
      where: { factoryAddress: address },
    });
  }
}
