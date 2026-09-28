export interface SendMessageRequest {
    chatId: string;
    message: string;
}

export interface SendMessageResponse {
    idMessage: string;
}

export interface GetStateInstanceResponse {
    stateInstance: string;
}

export interface IncomingTextMessageBody {
    typeWebhook: 'incomingMessageReceived';
    idMessage: string;
    timestamp: number;
    senderData: {
        chatId: string;
    };
    messageData: {
        typeMessage: 'textMessage';
        textMessageData: {
            textMessage: string;
        };
    };
}

