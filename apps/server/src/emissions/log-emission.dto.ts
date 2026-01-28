import { ApiProperty } from '@nestjs/swagger';

export class LogEmissionDto {
  @ApiProperty({
    example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    description: 'Factory wallet address',
  })
  factoryAddress: string;

  @ApiProperty({
    example: 150,
    description: 'Emission amount per kg',
  })
  amount: number;
}
