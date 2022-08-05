import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Device } from '../models/device';

export class TokenRequest {
  @ApiProperty({ example: 'fulano@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Device)
  @ApiPropertyOptional({
    type: Device,
  })
  device?: Device;
}
