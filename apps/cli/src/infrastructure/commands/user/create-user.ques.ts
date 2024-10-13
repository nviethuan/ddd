import { QuestionName } from 'apps/cli/src/utils/question-name';
import { Question, QuestionSet } from 'nest-commander';
import startCase from 'lodash/startCase';

@QuestionSet({ name: QuestionName.CREATE_USER })
export class CreateUserQuestions {
  @Question({
    message: 'What is the username?',
    name: 'username',
  })
  parseUsername(val: string) {
    return val;
  }

  @Question({
    message: 'What is the password?',
    name: 'password',
    type: 'password',
  })
  parsePassword(val: string) {
    return val;
  }

  @Question({
    message: 'What is the first name?',
    name: 'fName',
  })
  parseFName(val: string) {
    return startCase(`${val || ''}`.trim().toLowerCase());
  }

  @Question({
    message: 'What is the last name?',
    name: 'lName',
  })
  parseLName(val: string) {
    return startCase(`${val || ''}`.trim().toLowerCase());
  }

  @Question({
    message: 'What is the phone number?',
    name: 'phone',
  })
  parsePhone(val: string) {
    return val;
  }

  @Question({
    message: 'What is the email?',
    name: 'email',
  })
  parseEmail(val: string) {
    return val;
  }

  @Question({
    message: 'What is the locale?',
    name: 'locale',
    default: 'en',
  })
  parseLocale(val: string) {
    return val;
  }
}
