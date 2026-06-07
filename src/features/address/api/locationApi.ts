export const reverseGeocode =
  async (
    latitude: number,
    longitude: number
  ) => {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch location"
      );
    }

    return res.json();
  };