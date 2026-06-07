export type Address = {
  id: number;

  label: string;

  line1: string;

  line2?: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  defaultAddress: boolean;
};

export type AddAddressPayload =
  Omit<Address, "id">;