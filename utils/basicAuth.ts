export function basicAuth({ user, password }: { user: string; password: string }) {
  return function (req, res, next) {
    if (!req.get('Authorization')) {
      res.status(401).set('WWW-Authenticate', 'Basic');
      return res.send();
    } else {
      const [username, pwd] = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':');

      if (!(username === user && pwd === password)) {
        res.status(401).set('WWW-Authenticate', 'Basic');
        return res.send();
      }
      res.status(200);
      // Continue the execution
      next();
    }
  };
}
