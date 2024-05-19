import api from ".";

export async function getPatientById(id) {
  try {
    const response = await api.get(`/doctor/patient/${id}`);
    console.log("getPatientById", response);
    if (response.status === 200) return response.data;
    else throw new Error("Could not get patient by id:", id);
  } catch (err) {
    console.log(err);
  }
}
