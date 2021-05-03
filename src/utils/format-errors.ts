import { ValidationError } from 'class-validator';

interface CustomError {
  property: string;
  errors: string[];
}

export const formatErrors = (errors: ValidationError[]): CustomError[] =>
  errors && errors.length
    ? errors.map(({ property, constraints }) => ({
        property,
        errors: Object.values(constraints),
      }))
    : [];
