"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Delivery, LocalDelivery } from "@/types/delivery";

const DeliveryContext = createContext<{ delivery: Delivery | null }>({
  delivery: null,
});

export function DeliveryProvider({
  children,
  local,
}: {
  children: React.ReactNode;
  local: LocalDelivery | null;
}) {
  const [delivery, setDelivery] = useState<Delivery>({
    local: null,
    pickup: null,
  });

  useEffect(() => {
    const pickup = {
      method_id: "local_pickup",
      title: "Odbiór osobisty",
      cost: "0",
    };
    setDelivery({ local, pickup });
  }, [local]);

  return (
    <DeliveryContext.Provider value={{ delivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  return useContext(DeliveryContext);
}
