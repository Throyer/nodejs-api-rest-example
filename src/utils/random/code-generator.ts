import { between } from './between';

export const generateCode = (): string =>
  `${between(0, 9)}${between(0, 9)}${between(0, 9)}${between(0, 9)}`;
