import { UserCliService } from 'apps/cli/src/application/services/user/user.service';
import { QuestionName } from 'apps/cli/src/utils/question-name';
import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: QuestionName.FORCE_CHANGE_PASSWORD })
export class ForceChangePasswordQuestions {
  constructor(private readonly userCliService: UserCliService) {}
  @Question({
    message: 'What is the username?',
    name: 'username',
  })
  async parseUsername(val: string) {
    const user = await this.userCliService.findUserByUsername(val);

    if (!user) {
      throw new Error('User not found');
    }

    console.log('\n\n', user.toJSON(), '\n');

    return val;
  }

  @Question({
    message: 'What is the new password?',
    name: 'newPassword',
    type: 'password',
  })
  parseNewPassword(val: string) {
    return val;
  }
}
