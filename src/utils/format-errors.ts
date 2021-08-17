import { ValidationError } from 'class-validator';

interface CustomError {
  property: string;
  errors: string[];
}

export const formatErrors = (errors: ValidationError[]): CustomError[] => {
  const result =
    errors && errors.length
      ? errors.map(({ property, constraints, children }) => ({
          property,
          errors: constraints ? Object.values(constraints) : undefined,
          children:
            children && children.length ? formatErrors(children) : undefined,
        }))
      : [];
  return result;
};
