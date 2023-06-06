import { Inject, Controller, Body, Post } from '@midwayjs/core';
import { ChatGPTService } from './chat-gpt.service';
import { CreateCompletionDto } from './chat-gpt.dto';
import { Context } from '@midwayjs/koa';

@Controller('/chat-gpt')
export class ChatGPTController {
    @Inject()
    ctx: Context;

    @Inject()
    chatGPTService: ChatGPTService;

    @Post('/qa')
    async createCompletion(@Body() createCompletionDto: CreateCompletionDto) {
        return this.chatGPTService.createCompletion(createCompletionDto);
    }
}
