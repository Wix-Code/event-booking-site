import { create } from "zustand";

type Currency = "NGN" | "USD" | "EUR";

type CurrencyState = {
  country: string;
  currency: Currency;
  symbol: string;
  rate: number; // how much 1 NGN = ? target currency
  setCountry: (country: string) => void;
};

const currencyMap = {
  Nigeria: { currency: "NGN", symbol: "₦", rate: 1 },
  USA: { currency: "USD", symbol: "$", rate: 0.00065 },
  UK: { currency: "GBP", symbol: "£", rate: 0.00052 },
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  country: "NIGERIA",
  currency: "NGN",
  symbol: "₦",
  rate: 1,

  setCountry: (country) => {
    const config = currencyMap[country as keyof typeof currencyMap];

    set({
      country,
      currency: config.currency as Currency,
      symbol: config.symbol,
      rate: config.rate,
    });
  },
}));