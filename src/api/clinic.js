import api from ".";

export async function createClinic(clinic) {
  try {
    const response = await api.post("/doctor/clinic", clinic);
    // console.log("createClinic", response);
    if (response) return response;
    else throw new Error("Could not create clinic", clinic);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getClinic(id) {
  try {
    const response = await api.post(`/doctor/clinic/${id}`);
    // console.log("createClinic", response);
    if (response.status === 200) return response.data;
    else throw new Error("Could not get clinic");
  } catch (err) {
    console.log(err);
  }
}

export async function deleteClinic(id) {
  try {
    const response = await api.delete(`/doctor/clinic/${id}`);
    console.log("deleteClinic", response);
    if (response) return response;
    else throw new Error("Could not delete clinic");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function updateClinic(id, clinic) {
  try {
    const response = await api.patch(`/doctor/clinic/${id}`, clinic);
    // console.log("createClinic", response);
    if (response.status === 200) return response;
    else throw new Error("Could not get clinic");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getClinics() {
  try {
    const response = await api.get("/doctor/clinic/");
    // console.log("getClinics", response);
    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
