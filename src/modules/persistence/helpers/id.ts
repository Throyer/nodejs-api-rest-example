import { applyDecorators } from '@nestjs/common';
import { Generated, PrimaryColumn } from 'typeorm';
import { IntegerTransformer } from '../transformers/big-integer';

export const Id = () =>
  applyDecorators(
    Generated('increment'),
    PrimaryColumn('bigint', {
      name: 'id',
      transformer: IntegerTransformer.getInstance(),
    }),
  );
