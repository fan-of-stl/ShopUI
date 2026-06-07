import {
  Dialog,
  DialogContent,
} from "@mui/material";

import AddressForm from
"./AddressForm";

import {
  useUpdateAddress,
} from "../hooks/useUpdateAddress";
import type { Address } from "../types/addressType";



type Props = {
  open: boolean;

  address: Address | null;

  onClose: () => void;
};

const EditAddressDialog =
({
  open,
  address,
  onClose,
}: Props) => {

  const {
    mutate,
  } =
    useUpdateAddress();

  if (!address)
    return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogContent>

        <AddressForm
          defaultValues={
            address
          }
          onSubmit={(
            data
          ) => {

            mutate({
              id:
                address.id,

              payload:
                data,
            });

            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default
EditAddressDialog;