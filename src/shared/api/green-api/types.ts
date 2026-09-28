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
