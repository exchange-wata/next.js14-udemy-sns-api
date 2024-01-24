/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
import hash from 'crypto';
import Identicon from 'identicon.js';

const createIdenticon = (input, size = 64) => {
  const hashedInput = hash.createHash('md5').update(input).digest('hex');
  const data = new Identicon(hashedInput, size).toString();

  return `data:image/png;base64,${data}`;
};

export default createIdenticon;
