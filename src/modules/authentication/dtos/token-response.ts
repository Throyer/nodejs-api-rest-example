import { ApiProperty } from '@nestjs/swagger';
import { UserInformation } from 'src/modules/user/dtos/user-information';

export class TokenResponse {
  @ApiProperty({ type: UserInformation })
  user: UserInformation;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjYiLCJuYW1lIjoibmEgbW9yYWwgcXVlIHR1IHZlaW8gdGVudGFyIGZhemVyIG8gZGVjb2RlIGRvIHRva2VuPyIsImlhdCI6MTUxNjIzOTAyMn0.KESV_pRs5FBVW8vH0dag76KI9WUDmCQUVute2c30liE',
  })
  accessToken: string;

  @ApiProperty({ example: 'd67befed-bfde-4de4-b7a0-72c9a92667e5' })
  refreshToken: string;
}
