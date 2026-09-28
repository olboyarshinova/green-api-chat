import {normalizePhone} from "@/features/create-chat/lib/phone.ts";

export const createChatId = (phone: string): string => {
    return `${normalizePhone(phone)}@c.us`;
};
