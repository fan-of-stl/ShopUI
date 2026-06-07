import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  useEffect,
  useState,
} from "react";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  addressSchema,
  type AddressFormData,
} from "../schemas/addressSchema";

import {
  useCurrentLocation,
} from "../hooks/useCurrentLocation";

import {
  useReverseGeocode,
} from "../hooks/useReverseGeocode";

import {
  useLocationLookup,
} from "../hooks/useLocationLookup";

type Props = {
  defaultValues?: AddressFormData;

  isLoading?: boolean;

  onCancel?: () => void;

  onSubmit: (
    data: AddressFormData
  ) => void;
};

const AddressForm = ({
  defaultValues,
  isLoading,
  onCancel,
  onSubmit,
}: Props) => {

  // =========================
  // LOCAL STATE
  // =========================

  const [
    locationLoading,
    setLocationLoading,
  ] = useState(false);


  // =========================
  // HOOKS
  // =========================

  const {
    getLocation,
  } = useCurrentLocation();

  const {
    reverseGeocode,
  } = useReverseGeocode();

  const {
    lookupByPostalCode,
    loading:
      postalLookupLoading,
  } = useLocationLookup();


  // =========================
  // FORM
  // =========================

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,

    formState: {
      errors,
    },

  } = useForm<AddressFormData>({

    resolver:
      zodResolver(
        addressSchema
      ),

    defaultValues: {
      label: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      defaultAddress: false,
    },
  });


  // =========================
  // WATCHERS
  // =========================

  const postalCode =
    watch("postalCode");


  // =========================
  // RESET FORM
  // =========================

  useEffect(() => {

    if (defaultValues) {

      reset(defaultValues);
    }

  }, [
    defaultValues,
    reset,
  ]);


  // =========================
  // POSTAL LOOKUP
  // =========================

  useEffect(() => {

    if (
      !/^\d{6}$/.test(
        postalCode || ""
      )
    ) {
      return;
    }

    const timer =
      setTimeout(async () => {

        const location =
          await lookupByPostalCode(
            postalCode
          );

        if (!location) {
          return;
        }

        setValue(
          "city",
          location.city
        );

        setValue(
          "state",
          location.state
        );

        setValue(
          "country",
          location.country
        );

      }, 500);

    return () => {
      clearTimeout(timer);
    };

  }, [
    postalCode,
    setValue,
  ]);


  // =========================
  // CURRENT LOCATION
  // =========================

  const handleUseCurrentLocation =
    async () => {

      try {

        setLocationLoading(
          true
        );

        const coords =
          await getLocation();

        const data =
          await reverseGeocode(
            coords.latitude,
            coords.longitude
          );

        const address =
          data.address;


        setValue(
          "line1",
          data.display_name ||
            ""
        );

        setValue(
          "city",
          address.city ||
            address.town ||
            address.village ||
            ""
        );

        setValue(
          "state",
          address.state ||
            ""
        );

        setValue(
          "country",
          address.country ||
            ""
        );

        setValue(
          "postalCode",
          address.postcode ||
            ""
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLocationLoading(
          false
        );
      }
    };


  return (

    <Box
      component="form"
      onSubmit={
        handleSubmit(
          onSubmit
        )
      }
    >

      <Stack spacing={3}>


        {/* ========================= */}
        {/* CURRENT LOCATION */}
        {/* ========================= */}

        <Button
          variant="outlined"
          startIcon={
            locationLoading
              ? (
                <CircularProgress
                  size={18}
                />
              )
              : (
                <MyLocationRoundedIcon />
              )
          }
          onClick={
            handleUseCurrentLocation
          }
          disabled={
            locationLoading
          }
          sx={{
            borderRadius: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {locationLoading
            ? "Detecting Location..."
            : "Use Current Location"}
        </Button>


        {/* ========================= */}
        {/* DIVIDER */}
        {/* ========================= */}

        <Divider>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            OR ENTER MANUALLY
          </Typography>

        </Divider>


        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <Grid
          container
          spacing={2}
        >

          {/* LABEL */}

          <Grid size={{ xs: 12 }}>

            <Controller
              name="label"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="Label"
                  placeholder="Home / Work"
                  error={
                    !!errors.label
                  }
                  helperText={
                    errors.label
                      ?.message
                  }
                />
              )}
            />
          </Grid>


          {/* LINE 1 */}

          <Grid size={{ xs: 12 }}>

            <Controller
              name="line1"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="Address Line 1"
                  error={
                    !!errors.line1
                  }
                  helperText={
                    errors.line1
                      ?.message
                  }
                />
              )}
            />
          </Grid>


          {/* LINE 2 */}

          <Grid size={{ xs: 12 }}>

            <Controller
              name="line2"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="Address Line 2"
                />
              )}
            />
          </Grid>


          {/* POSTAL CODE */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Controller
              name="postalCode"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="Postal Code"
                  error={
                    !!errors.postalCode
                  }
                  helperText={
                    postalLookupLoading
                      ? "Fetching location..."
                      : errors
                          .postalCode
                          ?.message
                  }
                />
              )}
            />
          </Grid>


          {/* CITY */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Controller
              name="city"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={
                    !!errors.city
                  }
                  helperText={
                    errors.city
                      ?.message
                  }
                />
              )}
            />
          </Grid>


          {/* STATE */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Controller
              name="state"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="State"
                  error={
                    !!errors.state
                  }
                  helperText={
                    errors.state
                      ?.message
                  }
                />
              )}
            />
          </Grid>


          {/* COUNTRY */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Controller
              name="country"
              control={control}
              render={({
                field,
              }) => (

                <TextField
                  {...field}
                  fullWidth
                  label="Country"
                  error={
                    !!errors.country
                  }
                  helperText={
                    errors.country
                      ?.message
                  }
                />
              )}
            />
          </Grid>

        </Grid>


        {/* ========================= */}
        {/* ACTIONS */}
        {/* ========================= */}

        <Stack
          
          sx={{
              direction:"row",
              justifyContent:"flex-end"
          }}
          spacing={2}
        >

          {onCancel && (

            <Button
              variant="outlined"
              onClick={
                onCancel
              }
              sx={{
                borderRadius: 3,
                textTransform:
                  "none",
              }}
            >
              Cancel
            </Button>
          )}


          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              borderRadius: 3,
              px: 3,
              textTransform:
                "none",
              fontWeight: 600,
            }}
          >
            {isLoading
              ? "Saving..."
              : "Save Address"}
          </Button>

        </Stack>
      </Stack>
    </Box>
  );
};

export default AddressForm;