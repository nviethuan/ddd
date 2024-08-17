import { MongodbModule } from '@app/mongodb';
import { Module } from '@nestjs/common';
import { Schema } from 'mongoose';

export interface User {
  usn: string;
}

@Module({
  imports: [
    MongodbModule.forRoot('mongodb://localhost:27017/', {
      dbName: 'abc',
    }),
  ],
})
export class AppModule {}
