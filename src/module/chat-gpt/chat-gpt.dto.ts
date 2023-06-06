import { Rule, RuleType } from '@midwayjs/validate';

export class CreateCompletionDto {
    @Rule(RuleType.string())
    question: string;

    @Rule(RuleType.string())
    model?: string;

    @Rule(RuleType.number())
    temperature?: number;
}
