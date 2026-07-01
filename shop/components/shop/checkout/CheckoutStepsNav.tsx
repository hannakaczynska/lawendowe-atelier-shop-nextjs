import type { Step } from "./CheckoutWrapper";
import {useIsMobile} from "@/hooks/useIsMobile";

export function CheckoutStepsNav({
  step,
}: {
  step: Step;
}) {

  const isMobile = useIsMobile();
  return (
    <div className="flex justify-between h-8 mb-4 text-sm font-medium">
      <span
        className={`flex-1 text-center pt-[5px] pb-[6px] ${
          step === 1 ? "bg-[var(--secondary-color-light)] font-semibold" : ""
        }`}
      >
       {isMobile ? "1" : "Dane zamawiającego"}
      </span>

      <span
        className={`flex-1 text-center pt-[5px] pb-[6px] ${
          step === 2 ? "bg-[var(--secondary-color-light)] font-semibold" : ""
        }`}
      >
        {isMobile ? "2" : "Adres i dostawa"}
      </span>

      <span
        className={`flex-1 text-center pt-[5px] pb-[6px] ${
          step === 3 ? "bg-[var(--secondary-color-light)] font-semibold" : ""
        }`}
      >
        {isMobile ? "3" : "Wybór płatności"}
      </span>
      <span
        className={`flex-1 text-center pt-[5px] pb-[6px] ${
          step === 4 ? "bg-[var(--secondary-color-light)] font-semibold" : ""
        }`}
      >
        {isMobile ? "4" : "Podsumowanie"}
      </span>
    </div>
  );
}
