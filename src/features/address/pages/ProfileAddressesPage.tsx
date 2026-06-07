import {
  Container,
  Stack,
} from "@mui/material";

import {
  useState,
} from "react";

import AddressList from
"../components/AddressList";

import CreateAddressPanel from
"../components/CreateAddressPanel";

import EditAddressDialog from
"../components/EditAddressDialog";
import { useAddresses } from "../hooks/useAddAdresses";
import type { Address } from "../types/addressType";



const ProfileAddressesPage =
  () => {

    const {
      data,
    } =
      useAddresses();

    const addresses =
      data?.data || [];

    const [
      selected,
      setSelected,
    ] = useState<Address | null>(
      null
    );

    return (
      <Container
        maxWidth="md"
      >

        <Stack spacing={3}>

          <CreateAddressPanel />

          <AddressList
            addresses={
              addresses
            }
            onEdit={
              setSelected
            }
            onDelete={(
              address
            ) =>
              console.log(
                address
              )
            }
          />

          <EditAddressDialog
            open={
              !!selected
            }
            address={
              selected
            }
            onClose={() =>
              setSelected(
                null
              )
            }
          />
        </Stack>
      </Container>
    );
};

export default
ProfileAddressesPage;