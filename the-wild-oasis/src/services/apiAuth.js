const fetchWithAuth = async (url, options) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(url, options);
};

export async function login({ email, password }) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const { data } = await res.json();

  if (!data) {
    throw new Error("guests could not be added");
  }

  localStorage.setItem("jwt", data.token);
  localStorage.setItem("isAuth", data.isAuth);

  return data;
}

export async function getCurrentUser() {
  const res = await fetchWithAuth(`http://127.0.0.1:3000/api/v1/user/protect`, {
    method: "GET",
  });

  const { data } = await res.json();

  if (!data) {
    throw new Error("guests could not be added");
  }

  return data;
}

export async function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("isAuth");
  sessionStorage.clear();

  const res = await fetch(`http://127.0.0.1:3000/api/v1/user/logout`);

  const { message } = await res.json();

  if (message !== "Successfully logged out") {
    throw new Error("Error logging out");
  }
}

export async function signup(newUSer) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUSer),
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("User could not be added");
  }

  return message;
}

export async function updateUser(updateUser) {
  console.log(updateUser);
  const formData = new FormData();

  if (updateUser.password) {
    formData.append("password", updateUser.password);
  } else {
    formData.append("fullName", updateUser.fullName);
    formData.append("avatar", updateUser.avatar);
  }

  const res = await fetchWithAuth(
    `http://127.0.0.1:3000/api/v1/user/updateUser`,
    {
      method: "PUT",
      body: formData,
    }
  );

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("Cabins could not be Add");
  }

  return message;
}
