import api from ".";

export async function getNotifications() {
  try {
    const response = await api.get("/notification");
    if (response.status) return response.data;
    else throw new Error("Could not get notifications");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getNotificationById(id) {
  try {
    const response = await api.get(`/notification/${id}`);
    if (response.status) return response.data;
    else throw new Error("Could not get notification");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function markAsRead(id) {
  try {
    const response = await api.patch("/notification/" + id + "/read");
    if (response.status) return response.data;
    else throw new Error("Could not create notification");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}