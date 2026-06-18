import type {AccountFormData, ShippingFields} from "@/types/account";
import { shippingFields, allFields, FieldName } from "@/config/accountFields";
import { billingToShippingMap } from "@/config/accountFields";

export function createDefaultValues(): AccountFormData {
  const defaults: Record<FieldName, any> = {} as Record<FieldName, any>;

  allFields.forEach((f) => {
    defaults[f] = f === "shippingSameAsBilling" ? false : "";
  });

  return defaults as AccountFormData;
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

