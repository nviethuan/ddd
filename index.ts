const cleanArch = {
  application: {
    commands: {},
    queries: {},
  },
  infrastructure: {
    primaries: {
      db: {
        migrations: {},
        models: {},
      },
    },
    secondaries: {},
  },
  domain: {
    entities: {},
    objectValues: {},
    exceptions: {},
  },
};

const structure = {
  apps: {
    api: {},
    cli: {},
  },
  modules: {
    auth: {},
    user: {},
  },
  utils: {},
  libs: {
    schedule: {},
    mongodb: {},
    kafka: {},
  },
};
