export interface InitialDataState {
  // BILLING
  billingFirstName: string | null;
  billingLastName: string | null;
  billingPhone: string | null;
  billingStreet: string | null;
  billingFlat: string | null;
  billingCity: string | null;
  billingPostcode: string | null;

  // SHIPPING
  shippingFirstName: string | null;
  shippingLastName: string | null;
  shippingPhone: string | null;
  shippingStreet: string | null;
  shippingFlat: string | null;
  shippingCity: string | null;
  shippingPostcode: string | null;

  // META
  shippingSameAsBilling: boolean | null;

  // ACTIONS
  setInitialData: (data: Partial<InitialDataState>) => void;
  clearInitialData: () => void;
}