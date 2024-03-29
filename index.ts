const cleanArch = {
  application: {
    commands: {},
    queries: {},
  },
  presentation: {
    controllers: {},
    guards: {},
    decorators: {},
  },
  infrastructure: {
    adapters: {
      primaries: {
        db: {
          migrations: {},
          models: {},
        },
      },
      secondaries: {
        push_notificattion: {},
        queue: {},
        http_request: {},
      },
    },
    ports: {},
  },
  domain: {
    entities: {},
    objectValues: {},
    exceptions: {},
    events: {},
  },
};

const structure = {
  apps: {
    api: {},
    cli: {},
  },
  modules: {
    auth: cleanArch,
    user: cleanArch,
  },
  utils: {},
  libs: {
    schedule: {},
    mongodb: {},
    kafka: {},
    logger: {},
  },
};
