import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Conflict {
  @ApiProperty({ example: HttpStatus.CONFLICT.toString(), required: true })
  statusCode: number;

  @ApiProperty({ example: 'Some message about conflict' })
  message: string;

  @ApiProperty({ example: 'Conflict', required: false })
  error: string;

  constructor(message: string) {
    this.error = HttpStatus.CONFLICT.toString();
    this.message = message;
    this.statusCode = HttpStatus.CONFLICT;
  }
}
