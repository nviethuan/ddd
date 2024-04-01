import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from '@app/mongo';
import { Schema } from 'mongoose';

export interface User {
  usn: string;
}

@Module({
  imports: [
    MongoModule.forRoot('mongodb://localhost:27017/', {
      dbName: 'abc',
    }),
    MongoModule.register<User>(
      'users',
      new Schema({
        usn: String,
      }),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
