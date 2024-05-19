import api from ".";

export async function sendMobileOTP(phone) {
  try {
    const response = await api.post("/auth/doctor/request", { phone });
    // console.log("sendMobileOTP", !!response, response.data);
    if (response.status === 200) {
      return response.data;
    } else throw new Error("Could not send mobile OTP");
  } catch (err) {
    console.log(err);
  }
}

export async function verifyMobileOTP(phone, otp) {
  try {
    const response = await api.post("/auth/verify", { phone, otp });
    // console.log("verifyMobileOTP", !!response, response.data);
    if (response.status === 200) {
      return response.data;
    } else throw new Error("Could not verify mobile OTP");
  } catch (err) {
    console.log(err);
  }
}

export async function sendEmailOTP(email) {
  try {
    const response = await api.post("/doctor/email/request", { email });
    // console.log("sendEmailOTP", !!response, response.data);
    if (response.status === 200) {
      return response.data;
    } else throw new Error("Could not send email OTP");
  } catch (err) {
    console.log(err);
  }
}

export async function verifyEmailOTP(otp) {
  try {
    const response = await api.post("/doctor/email/verify", { otp });
    // console.log("verifyEmailOTP", !!response, response.data);
    if (response.status === 200) {
      return response.data;
    } else throw new Error("Could not send email OTP");
  } catch (err) {
    console.log(err);
  }
}
