import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Device } from '../models/device';

export class RefreshTokenRequest {
  @ApiProperty({
    required: true,
    example: 'dbb35d77-8dad-457a-92ab-c42cf7e253d9',
  })
  @IsUUID()
  refreshToken: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Device)
  @ApiPropertyOptional({
    type: Device,
  })
  device?: Device;
}
