import { CheckoutWrapper } from "@/components/shop/checkout/CheckoutWrapper";
export default function CheckoutPage() {
  return (
    <div className="flex max-w-[1500px] mx-auto px-4 py-1 my-6 md:py-8 mt-[100px]">
      <h2>Zamówienie</h2>
      <CheckoutWrapper />
    </div>
  );
}
