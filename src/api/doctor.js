import api from ".";

export async function getDoctor() {
  try {
    const response = await api.get("/doctor/personal");
    // console.log("getDoctor", response);
    if (response.status === 200) return response.data;
    else throw new Error("Could not get doctor details");
  } catch (err) {
    console.log(err);
  }
}

export async function updateDoctor(details) {
  try {
    const response = await api.post("/doctor/personal", details);
    if (response.status === 200) return response.data;
    else throw new Error(response?.data?.message);
  } catch (err) {
    console.log(err);
  }
}

export async function updateRegistrationNumber(registrationNumber) {
  try {
    const response = await api.post("/doctor/registration-number", {
      registrationNumber,
    });
    if (response.status === 200) return response.data;
    else
      throw new Error("Could not update doctor details: ", registrationNumber);
  } catch (error) {
    console.log(error);
  }
}

export async function createAvailability(details) {
  try {
    // console.log("createAvailability", details);
    const response = await api.post("/doctor/clinic/availability", details);
    if (response) return response;
    else throw new Error("Could not create availability: ", details);
  } catch (err) {
    console.log(err);
    return err?.response;
  }
}

export async function updateAvailability(details) {
  try {
    // console.log("createAvailability", details);
    const response = await api.put("/doctor/clinic/availability", details);
    if (response) return response;
    else throw new Error("Could not create availability: ", details);
  } catch (err) {
    console.log(err);
    return err?.response;
  }
}

export async function getAppointments(filter, search) {
  try {
    const response = await api.get(
      "/appointment/doctor?" +
        (filter ? `filter=${filter}&` : "") +
        (search ? `search=${search}` : "")
    );
    // console.log("createAvailability", response);
    if (response?.status === 200) return response.data;
    else throw new Error("Could not get appoitments");
  } catch (err) {
    console.log(err);
  }
}

export async function getAppointment(appointmentId) {
  try {
    const response = await api.get(
      `/appointment/?appointmentId=${appointmentId}`
    );
    if (response?.status === 200) return response.data;
    else throw new Error("Could not get appoitments");
  } catch (error) {
    console.log(error);
  }
}

export async function changeAppointmentStatus(appointmentId, status) {
  if (!appointmentId || !status) return;
  try {
    const response = await api.patch("/appointment/status", {
      appointmentId,
      status,
    });
    // console.log("createAvailability", response);
    if (response?.status === 200) return response.data;
    else throw new Error("Could not get appoitments");
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAvailability(clinicId, availabilityId) {
  try {
    if (!clinicId || !availabilityId)
      throw new Error("Clinic ID or Availability ID not found");
    const response = await api.delete(
      `/doctor/clinic/${clinicId}/availability/${availabilityId}`
    );
    // console.log("createAvailability", response);
    if (response) return response;
    else throw new Error("Could not delete availability");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getdetailedClinicsOfDoctor() {
  try {
    const response = await api.get(`/doctor/clinic`);
    if (response?.status === 200) return response.data;
    else throw new Error("Could not get detailed clinics of doctor");
  } catch (error) {
    console.log(error);
  }
}

export async function getDoctorStatistics() {
  try {
    const response = await api.get("/doctor/statistics");
    if (response?.status === 200) return response.data;
    else throw new Error("Could not get doctor statistics");
  } catch (error) {
    console.log(error);
  }
}
