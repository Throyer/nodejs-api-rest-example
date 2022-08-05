import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
  @ApiProperty({ example: '404', required: true })
  statusCode: number;

  @ApiProperty({ example: 'resource not found' })
  message: string;

  @ApiProperty({ example: 'Not Found', required: false })
  error: string;
}
