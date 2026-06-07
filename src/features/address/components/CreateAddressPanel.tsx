import {
  Button,
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";

import AddressForm from "./AddressForm";

import { useAddAddress } from "../hooks/useAddAdress";

import type {
  AddressFormData,
} from "../schemas/addressSchema";

const CreateAddressPanel = () => {

  // =========================
  // LOCAL STATE
  // =========================

  const [isAdding, setIsAdding] =
    useState(false);


  // =========================
  // MUTATION
  // =========================

  const {
    mutate: addAddress,
    isPending,
  } = useAddAddress();


  // =========================
  // OPEN FORM
  // =========================

  const handleOpenForm = () => {
    setIsAdding(true);
  };


  // =========================
  // CLOSE FORM
  // =========================

  const handleCloseForm = () => {
    setIsAdding(false);
  };


  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = (
    data: AddressFormData
  ) => {

    addAddress(data, {

      onSuccess: () => {

        handleCloseForm();
      },
    });
  };


  return (
    <Stack spacing={2}>

      {/* ========================= */}
      {/* ADD ADDRESS BUTTON */}
      {/* ========================= */}

      {!isAdding && (

        <Button
          variant="contained"
          startIcon={
            <AddRoundedIcon />
          }
          onClick={handleOpenForm}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Address
        </Button>
      )}


      {/* ========================= */}
      {/* FORM SECTION */}
      {/* ========================= */}

      <Collapse in={isAdding}>

        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            border:
              "1px solid #e5e7eb",
          }}
        >

          <CardContent
            sx={{
              p: 3,
            }}
          >

            <Stack spacing={3}>

              {/* TITLE */}

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Add New Address
              </Typography>


              {/* FORM */}

              <AddressForm
                onSubmit={
                  handleSubmit
                }
                onCancel={
                  handleCloseForm
                }
                isLoading={
                  isPending
                }
              />
            </Stack>
          </CardContent>
        </Card>
      </Collapse>
    </Stack>
  );
};

export default CreateAddressPanel;