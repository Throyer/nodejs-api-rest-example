import { between } from './between';

function group(size: number) {
  return new Array(size)
    .fill(0)
    .map(() => `${between(0, 9)}`)
    .join('');
}

const cpf = (): string => `${group(3)}.${group(3)}.${group(3)}-${group(2)}`;

const cnpj = (): string =>
  `${group(2)}.${group(3)}.${group(3)}/0001-${group(2)}`;

const cep = (): string => `${group(5)}-${group(3)}`;

export { cpf, cnpj, cep };
