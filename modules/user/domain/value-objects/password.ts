import * as bcrypt from 'bcrypt';

export class Password extends String {
  constructor(value: string) {
    super(value);
  }

  hash() {
    return bcrypt.hashSync(this.valueOf(), bcrypt.genSaltSync(12));
  }

  compare(hash: string) {
    return bcrypt.compareSync(this.valueOf(), hash);
  }
}
