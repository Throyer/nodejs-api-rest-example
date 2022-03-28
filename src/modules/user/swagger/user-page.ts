import { ApiProperty } from '@nestjs/swagger';
import { PageSwaggerWithoutContent } from 'src/shared/pagination/page-without-content.swagger';
import { UserInformation } from '../dtos/user-information';

export class UserPage extends PageSwaggerWithoutContent {
  @ApiProperty({ type: [UserInformation] })
  content: UserInformation[];
}
