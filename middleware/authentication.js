/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { return res.status(403).join({ message: '権限がありません。' }); }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) { return res.status(403).join({ message: '権限がありません。' }); }
    req.userId = decoded.id;
    next();
  });
};

// FIXME: なにが違う？
// module.exports = authentication;
export default authentication;
