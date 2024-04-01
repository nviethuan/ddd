import { Injectable } from '@nestjs/common';
import { User } from 'modules/user/domain/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class MongoService<T> {
  constructor(public model: Model<T>) {}
}
