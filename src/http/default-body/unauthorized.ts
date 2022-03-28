import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Unauthorized {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED.toString(), required: true })
  statusCode: number;

  @ApiProperty({ example: 'Some message about unauthorized' })
  message: string;

  @ApiPropertyOptional({ example: 'Unauthorized', required: false })
  error: string;

  constructor(message: string) {
    this.error = HttpStatus.UNAUTHORIZED.toString();
    this.message = message;
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
