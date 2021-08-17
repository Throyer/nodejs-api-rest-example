import { ValueTransformer } from 'typeorm';
import { isNullOrUndefined } from '@utils/object/null-or-undefined-checker';

export class DecimalTransformer implements ValueTransformer {
  private static instance: DecimalTransformer;

  from(data?: string | null): number | null {
    if (!isNullOrUndefined(data)) {
      const res = parseFloat(data);
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

  public static getInstance(): DecimalTransformer {
    if (!DecimalTransformer.instance) {
      DecimalTransformer.instance = new DecimalTransformer();
    }
    return DecimalTransformer.instance;
  }
}
