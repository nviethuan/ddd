const express = {
  basicAuth({ user, password }: { user: string; password: string }) {
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
        // Continue the execution
        next();
      }
    };
  },
};

const fastify = {
  basicAuth({ user, password }: { user: string; password: string }) {
    return function (req, res, next) {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.end();
      } else {
        const [username, pwd] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

        if (!(username === user && pwd === password)) {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic');
          return res.end();
        }
        // Continue the execution
        next();
      }
    };
  },
};

export default { express, fastify };
