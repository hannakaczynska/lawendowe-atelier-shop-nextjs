import type {AccountFormData, BillingFields, ShippingFields} from "@/types/account";
import { shippingFields, allFields, FieldName } from "@/config/accountFields";
import { billingToShippingMap } from "@/config/accountFields";


export function createDefaultValues(): AccountFormData {
  const defaults: Record<FieldName, any> = {} as Record<FieldName, any>;

  allFields.forEach((f) => {
    defaults[f] = f === "shippingSameAsBilling" ? false : "";
  });

  return defaults as AccountFormData;
}

export function mapWooToForm(data): AccountFormData {
  return {
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "" as string,
    email: data.email ?? "" as string,

    billingFirstName: data.billing?.first_name ?? "",
    billingLastName: data.billing?.last_name ?? "",
    billingPhone: data.billing?.phone ?? "",
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

export function copyBillingToShipping(
  values: AccountFormData,
  setValue: (field: keyof ShippingFields, value: string) => void
): void {
  (Object.keys(billingToShippingMap) as Array<keyof typeof billingToShippingMap>)
    .forEach((billingField) => {
      const shippingField = billingToShippingMap[billingField];
      setValue(shippingField, values[billingField] ?? "");
    });
}

export function clearShipping(setValue: (field: keyof ShippingFields, value: string) => void): void {
  shippingFields.forEach((field) => setValue(field, ""));
}
