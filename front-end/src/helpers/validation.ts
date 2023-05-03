import { MESSAGES } from '@constants';

export type Validate = {
  object: { [key: string]: string | boolean | number };
  regexp?: {
    [key: string]: { regexp: RegExp; message: string };
  };
};

type ValidateResult = {
  fields: {
    [key: string]: string;
  };

  isError: boolean;
};

export const validate = ({ object, regexp }: Validate) => {
  const result: ValidateResult = {
    fields: {},
    isError: false,
  };

  Object.entries(object).forEach(([key, value]) => {
    if (!value) {
      result.fields = {
        ...result.fields,
        [key]: MESSAGES.IS_QUIRE,
      };
      result.isError = true;
    } else if (
      regexp &&
      regexp[key] &&
      typeof value === 'string' &&
      !regexp[key].regexp.test(value)
    ) {
      result.fields = {
        ...result.fields,
        [key]: regexp[key].message,
      };
      result.isError = true;
    }
  });

  return result;
};
