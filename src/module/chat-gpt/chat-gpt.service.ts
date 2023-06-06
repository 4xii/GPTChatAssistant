import { Provide } from '@midwayjs/core';
import { CreateCompletionDto } from './chat-gpt.dto';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Provide()
export class ChatGPTService {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private readonly proxyUrl: string;
    constructor() {
        // Insert your key pengpeng ,plz
        this.apiKey = 'xxxx';
        this.baseUrl =
            'https://api.openai.com/v1/chat/completions';
        this.proxyUrl = 'http://127.0.0.1:7890'
    }

    async createCompletion({
        question,
        model,
        temperature,
    }: CreateCompletionDto) {
        const params = {
            messages: [{ "role": "user", "content": question }],
            model: model || 'gpt-3.5-turbo',
            temperature: temperature || 0.9,
        };

        const agent = new HttpsProxyAgent(this.proxyUrl);

        const axiosInstance = axios.create({
            httpsAgent: agent,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
        });

        try {
            const response = await axiosInstance.post(this.baseUrl, params);
            console.log('response.data :>> ', response.data);
            const aws = response.data.choices[0].message
            console.log('aws :>> ', aws);
            return response.data;
        } catch (error) {
            console.error('Error while calling createCompletion:', error);
            throw error;
        }
    }
}
