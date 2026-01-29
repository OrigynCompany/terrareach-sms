import axios, { type AxiosInstance } from 'axios';
import {
    SMSOptionsSchema,
    BulkSMSOptionsSchema,
    type SendSMSOptions,
    type SendBulkSMSOptions,
    type SMSResponse,
    type StatsResponse
} from './types.js';

export class TerraReach {
    private apiKey: string;
    private client: AxiosInstance;

    constructor(apiKey: string) {
        if (!apiKey) throw new Error("TerraReach API Key is required");
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: 'https://api.terrareach.com/api/v1',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    /**
     * Send a single SMS with local validation
     */
    async sendSMS(options: SendSMSOptions): Promise<SMSResponse> {
        // Validate input
        const validated = SMSOptionsSchema.parse(options);

        try {
            const response = await this.client.post<SMSResponse>('/sms', {
                ...validated,
                apiKey: this.apiKey,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Send Bulk SMS
     */
    async sendBulkSMS(options: SendBulkSMSOptions): Promise<SMSResponse[]> {
        const validated = BulkSMSOptionsSchema.parse(options);

        try {
            const response = await this.client.post<SMSResponse[]>('/sms/bulk', {
                ...validated,
                apiKey: this.apiKey,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Get Account Stats
     */
    async getStats(): Promise<StatsResponse> {
        try {
            const response = await this.client.get<StatsResponse>('/sms', {
                params: {
                    apiKey: this.apiKey,
                },
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        const message = error.response?.data?.message || error.message || 'Unknown TerraReach Error';
        throw new Error(`[TerraReach SDK]: ${message}`);
    }
}