import {
  useState,
} from "react";

type LocationLookupResult = {
  city: string;

  state: string;

  country: string;
};

type UseLocationLookupReturn =
  {
    loading: boolean;

    error: string | null;

    lookupByPostalCode: (
      postalCode: string
    ) => Promise<LocationLookupResult | null>;
  };

const GEOAPIFY_API_KEY =
  import.meta.env
    .VITE_GEOAPIFY_API_KEY;

export const useLocationLookup =
  (): UseLocationLookupReturn => {

    // =========================
    // STATE
    // =========================

    const [
      loading,
      setLoading,
    ] = useState(false);

    const [
      error,
      setError,
    ] = useState<
      string | null
    >(null);


    // =========================
    // LOOKUP
    // =========================

    const lookupByPostalCode =
      async (
        postalCode: string
      ): Promise<LocationLookupResult | null> => {

        try {

          setLoading(true);

          setError(null);


          // =========================
          // VALIDATION
          // =========================

          const isValidPostalCode =
            /^\d{6}$/.test(
              postalCode
            );

          if (
            !isValidPostalCode
          ) {

            return null;
          }


          // =========================
          // API CALL
          // =========================

          const response =
            await fetch(
              `https://api.geoapify.com/v1/geocode/search?postcode=${postalCode}&filter=countrycode:in&format=json&apiKey=${GEOAPIFY_API_KEY}`
            );


          // =========================
          // HTTP ERROR
          // =========================

          if (!response.ok) {

            throw new Error(
              "Failed to fetch location details"
            );
          }


          // =========================
          // PARSE RESPONSE
          // =========================

          const data =
            await response.json();


          // =========================
          // EMPTY RESULT
          // =========================

          const location =
            data?.results?.[0];

          if (!location) {

            throw new Error(
              "Location not found"
            );
          }


          // =========================
          // SUCCESS
          // =========================

          return {

            city:
              location.city ||
              location.county ||
              "",

            state:
              location.state ||
              "",

            country:
              location.country ||
              "India",
          };

        } catch (err) {

          console.error(err);

          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch location"
          );

          return null;

        } finally {

          setLoading(false);
        }
      };


    return {

      loading,

      error,

      lookupByPostalCode,
    };
};