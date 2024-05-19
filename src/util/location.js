import { getNearByPlaces } from "../api/location";
import config from "../config";

export async function getCurrentLocation() {
  try {
    const fetchDeviceLocation = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log("getPosition", position);
        if (position) {
          const deviceLocation = {
            lat: position.coords?.latitude,
            lng: position.coords?.longitude,
          };
          resolve(deviceLocation);
        } else {
          resolve(false);
        }
      });
    });
    return await fetchDeviceLocation;
  } catch (err) {
    console.error(err);
  }
}

export async function getAddressByLocation(location) {
  const nearByPlaces = await getNearByPlaces(location);
  console.log("getAddressByLocation", nearByPlaces);
}
