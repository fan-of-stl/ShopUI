import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import EditIcon from
"@mui/icons-material/Edit";

import DeleteIcon from
"@mui/icons-material/Delete";



import {
  formatAddress,
} from "../utils/formatAddress";
import type { Address } from "../types/addressType";

type Props = {
  address: Address;

  onEdit?: (
    address: Address
  ) => void;

  onDelete?: (
    address: Address
  ) => void;
};

const AddressCard = ({
  address,
  onEdit,
  onDelete,
}: Props) => {

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>

        <Stack

        sx={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "start"
        }}
        >

          <div>
            <Typography
            sx={{
              fontWeight: 700
            }}
            >
              {address.label}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {
                formatAddress(
                  address
                )
              }
            </Typography>
          </div>

          <Stack
            direction="row"
          >

            <IconButton
              onClick={() =>
                onEdit?.(
                  address
                )
              }
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              onClick={() =>
                onDelete?.(
                  address
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressCard;