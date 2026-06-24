import { Suspense } from "react";
import VerifyContent from "./VerifyContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <VerifyContent />
    </Suspense>
  );
}