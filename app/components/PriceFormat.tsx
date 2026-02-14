import { useCurrencyStore } from "@/hooks/store/useCurrencyStore";

type PriceProps = {
  basePrice: number; // stored in NGN
};

export const Price = ({ basePrice }: PriceProps) => {
  const { rate, symbol } = useCurrencyStore();

  const convertedPrice = basePrice * rate;

  return (
    <p className="mt-2 font-semibold text-base">
      {symbol}
      {convertedPrice.toLocaleString()}
    </p>
  );
};
