export const useReverseGeocode =
  () => {

    const reverseGeocode =
      async (
        latitude: number,
        longitude: number
      ) => {

        const res =
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

        return res.json();
      };

    return {
      reverseGeocode,
    };
};