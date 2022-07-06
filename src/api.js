const api = {
  BASE_URL: import.meta.env.VITE_APP_URL_API,

  async requestToApi(type, url, body) {
    return await fetch(`${this.BASE_URL}${url}`, {
      method: type,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  async requestToApiByAdmin(type, url, token, body) {
    return await fetch(`${this.BASE_URL}${url}`, {
      method: type,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  },
};

export default api;
