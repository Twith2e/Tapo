import api from "../../utils/api";

export async function getUser() {
  try {
    const response = await api.get("/users/fetch-user");
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}
