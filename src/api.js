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

  // async requestToApiByAdmin(params) {},
};

export default api;
