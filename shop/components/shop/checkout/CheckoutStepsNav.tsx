import type { Step } from "./CheckoutWrapper";

export function CheckoutStepsNav({
  step,
  setStep,
}: {
  step: Step;
  setStep: (step: Step) => void;
}) {
  return (
    <div className="flex justify-between mb-8 text-sm font-medium">
      <button
        className={`pb-2 border-b-2 ${
          step === 1 ? "border-[var(--primary-color)]" : "border-transparent"
        }`}
        onClick={() => setStep(1)}
      >
        Dane zamawiającego
      </button>

      <button
        className={`pb-2 border-b-2 ${
          step === 2 ? "border-[var(--primary-color)]" : "border-transparent"
        }`}
        onClick={() => setStep(2)}
      >
        Adres i dostawa
      </button>

      <button
        className={`pb-2 border-b-2 ${
          step === 3 ? "border-[var(--primary-color)]" : "border-transparent"
        }`}
        onClick={() => setStep(3)}
      >
        Płatność
      </button>
    </div>
  );
}
