import { Request as ExpressRequest } from 'express';
import { Authorized } from './authorized';

export type Request = {
  authorized?: Authorized;
} & ExpressRequest;
