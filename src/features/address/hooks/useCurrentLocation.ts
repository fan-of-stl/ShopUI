import {
  useState,
} from "react";

export const useCurrentLocation =
  () => {

    const [loading, setLoading] =
      useState(false);

    const getLocation =
      () => {

        return new Promise<{
          latitude: number;

          longitude: number;
        }>((resolve, reject) => {

          setLoading(true);

          navigator.geolocation
            .getCurrentPosition(

              (position) => {

                setLoading(
                  false
                );

                resolve({
                  latitude:
                    position.coords
                      .latitude,

                  longitude:
                    position.coords
                      .longitude,
                });
              },

              (error) => {

                setLoading(
                  false
                );

                reject(error);
              }
            );
        });
      };

    return {
      loading,
      getLocation,
    };
};