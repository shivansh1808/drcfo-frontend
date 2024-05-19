import api from ".";

export async function AddPersonalDetails(details) {
  try {
    console.log("AddPersonalDetails", details);
    const response = await api.patch("/wg/personal", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function AddTreatmentDetails(details) {
  try {
    // console.log("details", details);
    const response = await api.patch("/wg/treatment", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function AddTestimonialDetails(details) {
  try {
    const response = await api.patch("/wg/testimonial", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function AddFAQDetails(details) {
  try {
    const response = await api.patch("/wg/qna", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function AddArticleDetails(details) {
  try {
    const response = await api.patch("/wg/blog/add", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
} // Update Article State
export async function UpdateArticleState(id) {
  try {
    const response = await api.patch(`/wg/blog/toggle?blogId=${id}`);
    if (response) return response;
    else throw new Error("Could not update article state");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function UpdateArticleDetails(id, details) {
  try {
    const response = await api.patch(`/wg/blog/update?blogId=${id}`, details);
    if (response) return response;
    else throw new Error("Could not update article");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
// get specific Article Details
export async function getArticleDetails(id) {
  try {
    const response = await api.get(
      `/wg/blog/${id}?doctorId=${
        JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
      }`
    );
    if (response) return response;
    else throw new Error("Could not update article");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
// Get all Articles
export async function getArticle() {
  try {
    const response = await api.get(
      `/wg/?doctorId=${
        JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
      }`
    );
    if (response.status === 200) return response.data.data;
    else throw new Error("Could not fetch articles");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function AddContactdetails(details) {
  try {
    const response = await api.patch("/wg/contact", details);
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function webgenAddClinics(clinics) {
  try {
    const response = await api.patch("/wg/clinic", { clinics });
    if (response) return response;
    else throw new Error("Could not save data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
// Get Doctor Dashboard
export async function getWebgenDashboard() {
  try {
    const response = await api.get(
      `/wg/?doctorId=${
        JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
      }`
    );
    if (response.status === 200) return response.data;
    else throw new Error("Could not fetch articles");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
