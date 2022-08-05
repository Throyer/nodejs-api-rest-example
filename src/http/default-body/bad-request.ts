import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ example: '400', required: true })
  statusCode: number;

  @ApiProperty({
    example: [
      'field must be a valid ISO 8601 date string',
      'field must be an object',
    ],
    required: true,
    description: 'Errors list',
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request', required: false })
  error: string;

  constructor({ error, message, statusCode }: Partial<BadRequest>) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}
