import type { AccountFormData } from "@/types/account";
import { WooAccountDetails } from "@/types/woo";

export function mapWooToForm(data: WooAccountDetails): AccountFormData {
  return {
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? ("" as string),
    email: data.email ?? ("" as string),

    billingFirstName: data.billing?.first_name ?? "",
    billingLastName: data.billing?.last_name ?? "",
    billingPhone: data.billing?.phone ?? "",
    billingEmail: data.billing?.email ?? "",
    billingStreet: data.billing?.address_1 ?? "",
    billingFlat: data.billing?.address_2 ?? "",
    billingCity: data.billing?.city ?? "",
    billingPostcode: data.billing?.postcode ?? "",

    shippingSameAsBilling: data.shippingSameAsBilling ?? true,

    shippingFirstName: data.shipping?.first_name ?? "",
    shippingLastName: data.shipping?.last_name ?? "",
    shippingPhone: data.shipping?.phone ?? "",
    shippingStreet: data.shipping?.address_1 ?? "",
    shippingFlat: data.shipping?.address_2 ?? "",
    shippingCity: data.shipping?.city ?? "",
    shippingPostcode: data.shipping?.postcode ?? "",
  };
}

export function mapFormToWoo(data: AccountFormData) {
  return {
    first_name: data.firstName,
    last_name: data.lastName,

    billing: {
      first_name: data.billingFirstName,
      last_name: data.billingLastName,
      phone: data.billingPhone,
      email: data.billingEmail,
      address_1: data.billingStreet,
      address_2: data.billingFlat,
      city: data.billingCity,
      postcode: data.billingPostcode,
    },
    shipping: {
      first_name: data.shippingFirstName,
      last_name: data.shippingLastName,
      phone: data.shippingPhone,
      address_1: data.shippingStreet,
      address_2: data.shippingFlat,
      city: data.shippingCity,
      postcode: data.shippingPostcode,
    },
  };
}

export function mapFields(prefix: "billing" | "shipping", form: AccountFormData) {
  return {
    first_name: form[`${prefix}FirstName`],
    last_name: form[`${prefix}LastName`],
    phone: form[`${prefix}Phone`],
    address_1: form[`${prefix}Street`],
    address_2: form[`${prefix}Flat`],
    city: form[`${prefix}City`],
    postcode: form[`${prefix}Postcode`],
  };
}
