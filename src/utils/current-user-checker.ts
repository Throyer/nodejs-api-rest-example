import { Action } from "routing-controllers";
import { verify } from "jsonwebtoken";

import { HttpStatus } from "../shared/HttpStatus";

import HttpStatusError from "../errors/HttpStatusError";
import Session from "../shared/Session";
import Token from "../shared/Token";
import { TOKEN_SECRET } from "../config";

export const CurrentUserChecker = async (action: Action): Promise<Session> => {
    
    const header = action.request.headers.authorization;

    if (!header) {
        throw new HttpStatusError(
            'JWT não esta presente no header.',
            HttpStatus.UNAUTHORIZED
        );
    }

    const [, token] = header.split(' ');

    try {

        const { sub: id, roles } = verify(token, TOKEN_SECRET) as Token;

        return {
            id: Number(id),
            roles
        }
        
    } catch {
        throw new HttpStatusError(
            'Token expirado ou invalido.',
            HttpStatus.UNAUTHORIZED
        );
    }    
}