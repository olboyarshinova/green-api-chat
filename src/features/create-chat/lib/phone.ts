export const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '');
};

export const isValidPhone = (phone: string): boolean => {
    const normalizedPhone = normalizePhone(phone);

    return normalizedPhone.length >= 10 && normalizedPhone.length <= 15;
};
