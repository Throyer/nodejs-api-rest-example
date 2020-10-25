import { Action } from 'routing-controllers';
import { verify } from "jsonwebtoken";

import { HttpStatus } from '../shared/HttpStatus';
import { TOKEN_SECRET } from '../config';

import HttpStatusError from '../errors/HttpStatusError';
import Token from '../shared/Token';

export const AuthorizationChecker = async (action: Action, requirements: string[]): Promise<boolean> => {
    
    const header = action.request.headers.authorization;

    if (!header) {
        throw new HttpStatusError(
            'JWT não esta presente no header.',
            HttpStatus.UNAUTHORIZED
        );
    }

    const [, token] = header.split(' ');

    let roles: string[] = [];

    try {

        const jwt = verify(token, TOKEN_SECRET) as Token;

        roles = jwt.roles;
        
    } catch {
        throw new HttpStatusError(
            'Token expirado ou invalido.',
            HttpStatus.UNAUTHORIZED
        );
    }

    if (requirements.length &&
        roles.every(
            role => requirements.every(
                required => required !== role))) {
        throw new HttpStatusError(
            'Permissão invalida para este recurso.',
            HttpStatus.FORBIDDEN
        );
    }

    return true;
}