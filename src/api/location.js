import api, { oldBackend } from ".";

export async function getAddressByPincode(pincode) {
  try {
    const response = await api.get(`/get/locationMap?pincode=${pincode}`);
    console.log("getDoctor", response);
    if (response.status === 200) return response.data;
    else throw new Error("Could not get address by pincode: " + pincode);
  } catch (err) {
    console.log(err);
  }
}

export async function getNearByPlaces(location) {
  try {
    const response = await oldBackend.get(
      `/nearByLocation?location=${location?.lat}%2C${location?.lng}`
    );
    // console.log("getPlaces", response.data);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
}
