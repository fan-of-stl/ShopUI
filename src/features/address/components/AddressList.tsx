import {
  Stack,
} from "@mui/material";

import AddressCard from
"./AddressCard";
import type { Address } from "../types/addressType";



type Props = {
  addresses: Address[];

  onEdit: (
    address: Address
  ) => void;

  onDelete: (
    address: Address
  ) => void;
};

const AddressList = ({
  addresses,
  onEdit,
  onDelete,
}: Props) => {

  return (
    <Stack spacing={2}>

      {addresses.map(
        (address) => (

          <AddressCard
            key={address.id}
            address={
              address
            }
            onEdit={
              onEdit
            }
            onDelete={
              onDelete
            }
          />
        )
      )}
    </Stack>
  );
};

export default AddressList;