import { z } from 'zod';

// Validation Schema
export const SMSOptionsSchema = z.object({
    mask: z.string().min(1, "Mask (Sender ID) is required"),
    message: z.string().min(1, "Message content is required"),
    phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only digits"),
});

export const BulkSMSOptionsSchema = z.object({
    mask: z.string().min(1, "Mask is required"),
    message: z.string().min(1, "Message content is required"),
    phoneNumbers: z.array(z.string().regex(/^\d+$/)).min(1, "At least one phone number is required"),
});

// Types derived from schemas
export type SendSMSOptions = z.infer<typeof SMSOptionsSchema>;
export type SendBulkSMSOptions = z.infer<typeof BulkSMSOptionsSchema>;

export interface SMSResponse {
    id: string;
    text: string;
    senderId: string;
    to: string;
    type: 'TRANSACTIONAL' | 'CAMPAIGN';
    deliveryStatus: string;
}

export interface StatsResponse {
    remainingCredits: number;
    masks: string[];
}