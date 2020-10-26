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
            HttpStatus.UNAUTHORIZED,
            'JWT não esta presente no header.',
        );
    }

    const [, token] = header.split(' ');

    let roles: string[] = [];

    try {

        const jwt = verify(token, TOKEN_SECRET) as Token;

        roles = jwt.roles;
        
    } catch {
        throw new HttpStatusError(
            HttpStatus.UNAUTHORIZED,
            'Token expirado ou invalido.',
        );
    }

    if (requirements.length &&
        roles.every(
            role => requirements.every(
                required => required !== role))) {
        throw new HttpStatusError(
            HttpStatus.FORBIDDEN,
            'Permissão invalida para este recurso.',
        );
    }

    return true;
}