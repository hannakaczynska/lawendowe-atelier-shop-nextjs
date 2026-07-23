export interface DeliveryLocationWoo {
  code: string;
  type: string;
}

export interface DeliveryMethodWoo {
  id: number;
  method_id: string;
  settings?: {
    cost: {
      value: string;
    };
  };
  title: string;
}

export interface DeliveryMethod {
  id: number;
  method_id: string;
  cost: string;
  title: string;
}

export interface LocalDelivery {
  methods: DeliveryMethod[];
  locations: string[];
}

export interface Delivery {
  local: LocalDelivery | null;
  pickup: Omit<DeliveryMethod, "id"> | null;
}
