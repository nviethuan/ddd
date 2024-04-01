import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { ConnectOptions, Model, Schema, connect, model } from 'mongoose';

@Module({})
export class MongoModule {
  static forRoot(uri: string, options: ConnectOptions): DynamicModule {
    const providers = [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => connect(uri, options),
      },
    ];

    return {
      module: MongoModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static register<T>(name: string, schema: Schema): DynamicModule {
    const providers: Provider[] = [
      {
        provide: Model<T>,
        useFactory: () => model(name, schema, name),
        inject: ['DATABASE_CONNECTION'],
      },
    ];
    return {
      module: this,
      providers,
      exports: providers,
    };
  }
}
