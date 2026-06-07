import type { Address } from "../types/addressType";


export const formatAddress = (
  address: Address
) => {

  return `
    ${address.line1}
    ${address.line2 || ""}
    ${address.city},
    ${address.state},
    ${address.country}
    - ${address.postalCode}
  `;
};