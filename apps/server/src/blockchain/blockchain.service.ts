import { Injectable } from '@nestjs/common';
import { privateKeyToAccount } from 'viem/accounts';

@Injectable()
export class BlockchainService {
  private publicClient;
  private walletClient;
  private account;
  private contractAddress =
    '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`;
}
