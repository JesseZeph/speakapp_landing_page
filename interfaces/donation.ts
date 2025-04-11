interface PaymentDetails {
    [key: string]: any;
}

interface DonationResponse {
    id: number;
    amount: number;
    message: string;
    isAnonymous: boolean;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    reference: string;
    donorEmail: string;
    donorName: string;
    campaign: string;
    paymentDetails: PaymentDetails | null;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface DonationResponseData {
    donation: DonationResponse;
    paymentLink: string;
    reference: string;
}

interface NetworkResponse {
    success: boolean;
    message: string;
    data: DonationResponseData;
}

export type { NetworkResponse, DonationResponse, DonationResponseData, PaymentDetails };