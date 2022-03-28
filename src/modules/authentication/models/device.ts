import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Device {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'a36ff274-1206-4ee9-8cc4-186b1a55dc54',
    default: 'default',
  })
  code?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apple' })
  brand?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apple' })
  manufacturer?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'iPhone 11' })
  modelName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'iOS' })
  osName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '15.0' })
  osVersion: string;
}
