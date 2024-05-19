import api from ".";

export async function createAppointment(appointement) {
  try {
    const response = await api.post("/appointment/doctor", appointement);
    // console.log("createAppointment", response);
    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function createFollowupAppointment(appointmentObj) {
  try {
    const response = await api.post("/appointment/followup", appointmentObj);

    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function createPrescription(
  appointmentId,
  prescription,
  template = false
) {
  try {
    const response = await api.put(
      "/appointment/prescription?appointmentId=" +
        appointmentId +
        "&template=" +
        String(template),
      prescription
    );
    // console.log("createAppointment", response);
    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getPrescriptionTemplates() {
  try {
    const response = await api.get("/appointment/prescription/template");
    // console.log("createAppointment", response);
    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getAppointmentMedicalHistory(patientId) {
  try {
    const response = await api.get(
      "/appointment/medical-history?patientId=" + patientId
    );
    // console.log("createAppointment", response);
    if (response) return response.data;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getAppointmentFollowup(appointmentId) {
  try {
    const response = await api.get(
      "/appointment/followup?appointmentId=" + appointmentId
    );
    // console.log("createAppointment", response);
    if (response) return response.data;
    else throw new Error("Could not get clinics");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function createInvoice(appointmentId, invoiceData) {
  try {
    const response = await api.post(
      "/appointment/invoice?appointmentId=" + appointmentId,
      invoiceData
    );
    // console.log("createAppointment", response);
    if (response) return response.status;
    else throw new Error("Could not get clinics");
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function updateVitals(appointmentId, vitals) {
  try {
    const response = await api.post(
      "/appointment/vitals?appointmentId=" + appointmentId,
      vitals
    );
    // console.log("createAppointment", response);
    if (response) return response;
    else throw new Error("Could not get clinics");
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function searchAppointments(search, status) {
  console.log("searchAppointments", search, status);
  try {
    const response = await api.get(
      "/appointment/search-appointments-by-doctor?" +
        (search ? `search=${search}&` : "") +
        (status ? `status=${status}` : "")
    );
    // console.log("createAppointment", response);
    if (response.status === 200) {
      return response?.data;
    } else throw new Error("Could not get searched appointments");
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function updateHealthCertificate(certificate) {
  try {
    const response = await api.post("/appointment/certificate", certificate);
    // console.log("createAppointment", response);
    if (response) return response.data;
    else throw new Error("Could not get clinics");
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
