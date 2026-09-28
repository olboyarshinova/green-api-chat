export type MessageStatus = 'sending' | 'sent' | 'failed';

export interface Message {
    id: string;
    chatId: string;
    text: string;
    direction: 'outgoing' | 'incoming';
    status?: MessageStatus;
    timestamp: number;
}
