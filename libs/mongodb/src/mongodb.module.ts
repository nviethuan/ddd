import { DynamicModule, Module, Provider } from '@nestjs/common';
import { connect, ConnectOptions, model, Mongoose } from 'mongoose';
import { schemaProviders } from './schemaProviders';

@Module({})
export class MongodbModule {
  static forRoot(uri: string, options: ConnectOptions): DynamicModule {
    const connProviders: Provider[] = [
      {
        provide: Mongoose,
        useFactory: () => connect(uri, options),
      },
    ];

    const models: Provider[] = schemaProviders.map(({ type, schema }) => ({
      provide: type,
      useFactory: () => model(type.name, schema),
    }));

    const providers = connProviders.concat(models);

    return {
      module: MongodbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
