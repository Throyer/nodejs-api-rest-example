import {
    Post,
    JsonController,
    Body
} from 'routing-controllers';

import AuthenticateUserService,
    { AuthenticationRequest }
from '../services/AuthenticateUserService';

@JsonController('/sessions')
export class SessionsController {

    service = new AuthenticateUserService();

    @Post()
    async authenticate(@Body() auth: AuthenticationRequest) {

        return this.service.authenticate(auth);
    }
}