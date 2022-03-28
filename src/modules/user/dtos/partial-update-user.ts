import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class PartialUpdateUser {
  @IsString()
  @MaxLength(180)
  @IsOptional()
  @ApiPropertyOptional({ example: 'Jubileu da silva' })
  name?: string;
}
