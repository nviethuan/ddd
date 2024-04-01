import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { User } from 'modules/user/domain/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(private readonly model: Model<User>) {}

  async getHello() {
    const res = await this.model.create({
      usn: 'abx2332',
    });

    return res.toJSON();
  }
}
