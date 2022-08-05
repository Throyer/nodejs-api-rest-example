import { ApiProperty } from '@nestjs/swagger';

export class PageSwaggerWithoutContent {
  @ApiProperty({ example: '6' })
  page: number;

  @ApiProperty({ example: '20' })
  size: number;

  @ApiProperty({ example: '464' })
  totalPages: number;

  @ApiProperty({ example: '9278' })
  totalElements: number;
}
