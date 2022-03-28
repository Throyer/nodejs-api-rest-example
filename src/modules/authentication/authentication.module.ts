import { Module } from '@nestjs/common';
import { AuthorizeRequestService } from './services/authorize-request.service';
import { CreateRefreshTokenService } from './services/create-refresh-token.service';
import { CreateTokenService } from './services/create-token.service';
import { RoleExtractorService } from './services/role-extractor.service';

@Module({
  imports: [],
  providers: [
    AuthorizeRequestService,
    CreateTokenService,
    CreateRefreshTokenService,
    RoleExtractorService,
  ],
  exports: [AuthorizeRequestService, RoleExtractorService],
  controllers: [],
})
export class AuthenticationModule {}
