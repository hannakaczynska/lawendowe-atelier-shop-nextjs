import { DeliveryLocationWoo, DeliveryMethodWoo , DeliveryMethod } from "@/types/delivery";

export function mapPostCodeLocation(locationArray: DeliveryLocationWoo[]): string[] {
  let location: string[] = [];
  locationArray.forEach((el) => {
    if (el.type === "postcode") {
      location.push(el.code);
    }
  });
  return location;
}

export function mapLocationMethods(methodsArray: DeliveryMethodWoo[]): DeliveryMethod[] {
let methods: DeliveryMethod[] = [];
    methodsArray.forEach((el) => {
        methods.push({
            id: el.id,
            method_id: el.method_id,
            title: el.title,
            cost: el.settings?.cost?.value || "0",
        });
    })
    return methods;
}
