import { DynamicModule, Module, Provider } from '@nestjs/common';
import { connect, ConnectOptions, model, Schema } from 'mongoose';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export type SchemaProvider = {
  name: string;
  schema: Schema;
};

@Module({})
export class MongodbModule {
  static forRoot(uri: string, options: ConnectOptions): DynamicModule {
    const providers = [
      {
        provide: DATABASE_CONNECTION,
        useFactory: () => connect(uri, options),
      },
    ];

    return {
      module: MongodbModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static register(schemas: SchemaProvider[]): DynamicModule {
    const providers: Provider[] = schemas.map((schema) => ({
      provide: schema.name,
      useValue: model(schema.name, schema.schema),
    }));

    return {
      module: this,
      providers,
      exports: providers,
    };
  }
}
