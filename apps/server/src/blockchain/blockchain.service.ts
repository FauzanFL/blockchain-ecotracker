import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, createWalletClient, http } from 'viem';
import { Account, privateKeyToAccount } from 'viem/accounts';
import { polygonAmoy } from 'viem/chains';
import * as CarbonTrackerABI from '@repo/blockchain/out/CarbonTracker.sol/CarbonTracker.json';

@Injectable()
export class BlockchainService implements OnModuleInit {
  private logger = new Logger(BlockchainService.name);
  private publicClient: any;
  private walletClient: any;
  private account: Account;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const privateKey = this.configService.get<string>(
      'PRIVATE_KEY',
    ) as `0x${string}`;
    const rpcUrl = this.configService.get<string>('RPC_URL');

    if (!privateKey || !rpcUrl) {
      throw new Error('PRIVATE_KEY or BLOCKCHAIN_RPC_URL is missing in .env');
    }

    const formattedKey = privateKey.startsWith('0x')
      ? privateKey
      : `0x${privateKey}`;
    this.account = privateKeyToAccount(formattedKey as `0x${string}`);

    this.publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http(rpcUrl),
    });

    this.walletClient = createWalletClient({
      account: this.account,
      chain: polygonAmoy,
      transport: http(rpcUrl),
    });

    this.logger.log('BlockchainService initialized on Polygon Amoy');
  }

  async recordEmission(factory: string, amount: number) {
    try {
      this.logger.log(
        `Recording emission for ${factory} with amount ${amount} kg CO2`,
      );

      const contractAddress = this.configService.get<string>(
        'CONTRACT_ADDRESS',
      ) as `0x${string}`;

      const { request } = await this.publicClient.simulateContract({
        account: this.account,
        address: contractAddress,
        abi: CarbonTrackerABI.abi,
        functionName: 'recordEmissionAndReward',
        args: [factory as `0x${string}`, BigInt(amount)],
      });

      const hash = await this.walletClient.writeContract(request);
      this.logger.log(`Transaction hash: ${hash}`);

      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash,
      });

      return {
        success: true,
        txHash: hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to record emission: ${errorMessage}`);
      throw error;
    }
  }

  async getFactoryData(address: string) {
    try {
      const contractAddress = this.configService.get<string>(
        'CONTRACT_ADDRESS',
      ) as `0x${string}`;

      const totalEmissions = await this.publicClient.readContract({
        address: contractAddress,
        abi: CarbonTrackerABI.abi,
        functionName: 'totalEmissions',
        args: [address as `0x${string}`],
      });

      const balance = await this.publicClient.readContract({
        address: contractAddress,
        abi: CarbonTrackerABI.abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      });

      return {
        factory: address,
        totalEmissions: totalEmissions.toString(),
        balance: balance.toString(),
        symbol: 'ECTR',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to record emission: ${errorMessage}`);
      throw error;
    }
  }
}
