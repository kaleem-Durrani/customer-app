import client from "./client";

const login = (email, password) =>
  client.post("/auth/customer/login", { email, password });

const signup = (name, email, password, confirmPassword, phoneNumber) => {
  return client.post("/auth/customer/signup", {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  });
};

export default {
  login,
  signup,
};
