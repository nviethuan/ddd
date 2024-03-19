import { CommonService } from '@lib/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private readonly commonService: CommonService) {}

  getHello(): string {
    console.log(this.commonService.helloLib());
    return 'Hello World!';
  }
}
