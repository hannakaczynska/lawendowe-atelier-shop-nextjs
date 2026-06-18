export type PersonalFields = {
  firstName: string;
  lastName: string;
  email: string;
};

export type BillingFields = {
  billingFirstName: string;
  billingLastName: string;
  billingPhone: string;
  billingStreet: string;
  billingFlat?: string;
  billingCity: string;
  billingPostcode: string;
};

export type ShippingFields = {
  shippingSameAsBilling?: boolean;
  shippingFirstName: string;
  shippingLastName: string;
  shippingPhone: string;
  shippingStreet: string;
  shippingFlat?: string;
  shippingCity: string;
  shippingPostcode: string;
};

export type AccountFormData = PersonalFields & BillingFields & ShippingFields;
