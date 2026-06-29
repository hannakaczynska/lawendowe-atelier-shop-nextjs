export const personalFields = [
  "firstName",
  "lastName",
  "email",
] as const;

export const billingFields = [
  "billingFirstName",
  "billingLastName",
  "billingPhone",
  "billingStreet",
  "billingFlat",
  "billingCity",
  "billingPostcode",
] as const;

export const shippingFields = [
  "shippingFirstName",
  "shippingLastName",
  "shippingPhone",
  "shippingStreet",
  "shippingFlat",
  "shippingCity",
  "shippingPostcode",
] as const;

export const billingToShippingMap = {
  billingFirstName: "shippingFirstName",
  billingLastName: "shippingLastName",
  billingPhone: "shippingPhone",
  billingStreet: "shippingStreet",
  billingFlat: "shippingFlat",
  billingCity: "shippingCity",
  billingPostcode: "shippingPostcode",
} as const;


export const allFields = [
  ...personalFields,
  ...billingFields,
  "shippingSameAsBilling",
  ...shippingFields,
] as const;

export type FieldName = typeof allFields[number];

export const wooFields = [
  "first_name",
  "last_name",
  "phone",
  "address_1",
  "address_2",
  "city",
  "postcode",
] as const;
