import { MongodbModule } from '@app/mongodb';
import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';

export interface User {
  usn: string;
}

@Module({
  imports: [
    MongodbModule.forRoot('mongodb://localhost:27017/', {
      dbName: 'abc',
    }),
    AuthModule,
  ],
})
export class AppModule {}
