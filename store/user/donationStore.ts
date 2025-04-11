import { create } from "zustand";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import axios from "axios";
import { DonationResponseData } from "@/interfaces/donation";


interface DonationRequest {
    amount: number;
    email: string;
    name: string;
    message: string; 
}

interface DonationStore {
    donations: DonationRequest[];
    makeDonation: (data: DonationRequest) => Promise<DonationResponseData | null>;
    confirmDonationPayment: (reference: string) => Promise<boolean>;
}

export const useDonationStore = create<DonationStore>((set) => ({
    donations: [],
    makeDonation: async (data: DonationRequest) => {
        try {
            console.log('Making donation request with data:', data);
            const response = await api.post('/donation', data);
            console.log('Donation API response:', response);
            
            if (!response.data?.data?.paymentLink) {
                throw new Error('No payment link in response');
            }
            
            return response.data.data;
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Donation API error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                    config: error.config
                });
                toast.error(
                    error.response?.data?.message || 'Unable to make donation. Please try again'
                );
            } else {
                console.error('Unexpected donation error:', error);
                toast.error('An unexpected error occurred');
            }
            return null;
        }
    },
    confirmDonationPayment: async (reference: string) => {
        try {
            const response = await api.post('donation/verify', {
                reference: reference,
            });
            if (response.status === 200) {
                toast.success('Payment confirmed successfully')
                return true
            }
        } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Unable to confirm the order payment. Please try again."
        );
      } else {
        toast.error(
          "An unexpected error occurred while confirming order payment."
        );
      }
      console.error("Failed to confirm order payment:", error);
      return false;
        }
        return false
    }
}))

