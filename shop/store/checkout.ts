import { create } from "zustand";
import { persist } from "zustand/middleware";
import {InitialDataState} from "@/types/checkout";

export const useAccountInitialData = create<InitialDataState>()(
  persist(
    (set) => ({
      // BILLING
      billingFirstName: null,
      billingLastName: null,
      billingPhone: null,
      billingStreet: null,
      billingFlat: null,
      billingCity: null,
      billingPostcode: null,

      // SHIPPING
      shippingFirstName: null,
      shippingLastName: null,
      shippingPhone: null,
      shippingStreet: null,
      shippingFlat: null,
      shippingCity: null,
      shippingPostcode: null,

      // META
      shippingSameAsBilling: null,

      // SETTER
      setInitialData: (data) => set((state) => ({ ...state, ...data })),

      // CLEAR
      clearInitialData: () =>
        set({
          billingFirstName: null,
          billingLastName: null,
          billingPhone: null,
          billingStreet: null,
          billingFlat: null,
          billingCity: null,
          billingPostcode: null,

          shippingFirstName: null,
          shippingLastName: null,
          shippingPhone: null,
          shippingStreet: null,
          shippingFlat: null,
          shippingCity: null,
          shippingPostcode: null,

          shippingSameAsBilling: null,
        }),
    }),
    {
      name: "account-initial-data",
    }
  )
);
