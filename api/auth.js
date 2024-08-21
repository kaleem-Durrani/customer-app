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

const requestNewOtp = () => client.get("/auth/customer/requestNewOtp", {});

const verifyOtp = (otp) => client.post("auth/customer/verify-otp", { otp });

const requestPasswordReset = (email) =>
  client.post("auth/customer/requestPasswordReset", { email });

const verifyOtpForgetPassword = (otp, email) =>
  client.post("auth/customer/verifyOtpForgetPassword", { otp, email });

const resetPassword = (email, newPassword, otp) =>
  client.post("auth/customer/resetPassword", { email, newPassword, otp });

export default {
  login,
  signup,
  requestNewOtp,
  verifyOtp,
  requestPasswordReset,
  verifyOtpForgetPassword,
  resetPassword,
};
