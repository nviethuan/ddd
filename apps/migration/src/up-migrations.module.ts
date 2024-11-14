import { Global, Module } from '@nestjs/common';
import * as migrations from './migrations';

const migrationsProviders = Object.values(migrations).map((migration) => ({
  provide: migration,
  useClass: migration,
}));

@Global()
@Module({
  providers: migrationsProviders,
  exports: migrationsProviders,
})
export class UpMigrationsModule {}
