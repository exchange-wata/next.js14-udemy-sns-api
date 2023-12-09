// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import jwt from 'jsonwebtoken';

const token = (userId) => jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1d' });

export default token;
