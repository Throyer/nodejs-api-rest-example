import md5 from 'crypto-js/md5';
import fetch from 'node-fetch';

export const gravatar = async (email: string): Promise<string | undefined> => {
  const url = `https://www.gravatar.com/avatar/${md5(email)}`;

  try {
    const response = await fetch(`${url}?default=error`);
    if (response.status !== 200) {
      return undefined;
    }
    return url;
  } catch (error) {
    return undefined;
  }
};
