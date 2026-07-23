import {
  mapPostCodeLocation,
  mapLocationMethods,
} from "@/lib/wooDeliveryMapper";

import { DeliveryMethod } from "@/types/delivery";

export async function getLocalShippingZone(): Promise<{ locations: string[]; methods: DeliveryMethod[] }> {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return { locations: [], methods: [] };
  }

  try {
    const locRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/shipping/zones/2/locations?consumer_key=${CK}&consumer_secret=${CS}`,
      { next: { revalidate: 300 } },
    );

    if (!locRes.ok) {
      console.error("Failed to fetch zone 2 locations from WooCommerce");
      return { locations: [], methods: [] };
    }

    const locations = await locRes.json();
    const mappedLocations = mapPostCodeLocation(locations);

    const methodRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/shipping/zones/2/methods?consumer_key=${CK}&consumer_secret=${CS}`,
      { next: { revalidate: 300 } },
    );
    if (!methodRes.ok) {
      return { locations: [], methods: [] };
    }

    const methods = await methodRes.json();
    const mappedMethods = mapLocationMethods(methods);

    return { locations: mappedLocations, methods: mappedMethods };
  } catch (error) {
    console.error("Error fetching zones:", error);
    return { locations: [], methods: [] };
  }
}

//not used yet, but might be useful in the future
export async function getPolandShippingZone() {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return { locations: [], methods: [] };
  }

  try {
    const locRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/shipping/zones/1/locations?consumer_key=${CK}&consumer_secret=${CS}`,
      { next: { revalidate: 300 } },
    );

    if (!locRes.ok) {
      console.error("Failed to fetch zone 1 locations from WooCommerce");
      return { locations: [], methods: [] };
    }

    const locations = await locRes.json();
    const mappedLocations = mapPostCodeLocation(locations);

    const methodRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/shipping/zones/1/methods?consumer_key=${CK}&consumer_secret=${CS}`,
      { next: { revalidate: 300 } },
    );
    if (!methodRes.ok) {
      console.error("Failed to fetch zone 1 methods from WooCommerce");
      return { locations: [], methods: [] };
    }

    const methods = await methodRes.json();
    const mappedMethods = mapLocationMethods(methods);

    return { locations: mappedLocations, methods: mappedMethods };
  } catch (error) {
    console.error("Error fetching zones:", error);
    return { locations: [], methods: [] };
  }
}
