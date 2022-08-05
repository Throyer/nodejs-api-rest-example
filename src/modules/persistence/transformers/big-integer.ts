import { isNullOrUndefined } from 'src/utils/null-or-undefined-checker';
import { ValueTransformer } from 'typeorm';

export class IntegerTransformer implements ValueTransformer {
  private static instance: IntegerTransformer;

  from(data?: string | null): number | null {
    if (!isNullOrUndefined(data)) {
      const res = parseInt(data, 10);
      if (Number.isNaN(res)) {
        return null;
      }
      return res;
    }
    return null;
  }

  to(data?: number | null): number | null {
    if (!isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  private constructor() {
    // this class is singleton
  }

  public static getInstance(): IntegerTransformer {
    if (!IntegerTransformer.instance) {
      IntegerTransformer.instance = new IntegerTransformer();
    }
    return IntegerTransformer.instance;
  }
}
