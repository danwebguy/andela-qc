// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  if (req.user.isadmin === false) return res.status(403).send('Access Denied.');
  next();
};
