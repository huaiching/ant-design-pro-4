export declare const switchText: {
    policyNo: (text?: string) => string;
    name: (text?: string) => string;
    englishName: (text?: string) => string;
    IDCard: (text?: string) => string;
    checkNo: (text?: string) => string;
    remitNo: (text?: string) => string;
    creditCardNo: (text?: string) => string;
    email: (text?: string) => string;
    phone: (text?: string) => string;
    charge: (text?: string) => string;
    mCode: (text?: string) => string;
};
export type SwitchType = 'policyNo' | 'name' | 'englishName' | 'IDCard' | 'checkNo' | 'remitNo' | 'creditCardNo' | 'email' | 'phone' | 'charge' | 'mCode';
export declare function switchData(text: string, type: SwitchType): string;
