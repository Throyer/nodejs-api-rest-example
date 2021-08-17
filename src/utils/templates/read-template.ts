import fs from 'fs';
import path from 'path';

export const readTemplate = (templateName: string): string => {
  try {
    return fs
      .readFileSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'templates',
          `${templateName}.html`,
        ),
      )
      .toString('utf8');
  } catch (error) {
    throw new Error(`Não foi possível carregar o template '${templateName}'`);
  }
};
