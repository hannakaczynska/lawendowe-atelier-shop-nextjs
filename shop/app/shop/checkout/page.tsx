import CheckoutForm from "@/components/shop/checkout/CheckoutForm";
import  CheckoutSummary  from "@/components/shop/checkout/CheckoutSummary";
export default function CheckoutPage() {
  return (
    <div>
      <h2>Zamówienie</h2>
      <CheckoutForm />
      <CheckoutSummary />
    </div>
  );
}
