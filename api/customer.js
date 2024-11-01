import client from "./client";

const getProfile = () => client.get("/customer/profile", {});

const changePassword = (currentPassword, newPassword, confirmPassword) =>
  client.post("/customer/changePassword", {
    currentPassword,
    newPassword,
    confirmPassword,
  });

const getTransactionHistory = () =>
  client.get("/transaction/customerHistory", {});

const getFundsTransferHistory = () =>
  client.get("fundsTransfer/getHistory", {});

const getTopUpHistory = () => client.get("/topUp/history", {});

const findReceiver = (phoneNumber) =>
  client.post("fundsTransfer/findReceiver", { phoneNumber });

const transferFunds = (amount, entityTransfered, receiverId) =>
  client.post("fundsTransfer/transferFunds", {
    amount,
    entityTransfered,
    receiverId,
  });

const topUpAccount = (topUpThrough, amount) =>
  client.post("/topUp/topUpAccount", { topUpThrough, amount });

const getPumpLocations = () => client.get("/pump/pumpLocations", {});

const uploadImage = (image) => client.post("/customer/image", { image });

const updatePushToken = (pushToken) =>
  client.post("/customer/updatePushToken", { pushToken });

const getLoyaltyPoints = () => client.get("/loyalty/points", {});

const redeemLoyaltyPoints = (pumpId) =>
  client.post("/loyalty/redeem", { pumpId });

export default {
  getProfile,
  changePassword,
  getTransactionHistory,
  getFundsTransferHistory,
  getTopUpHistory,
  findReceiver,
  transferFunds,
  topUpAccount,
  getPumpLocations,
  uploadImage,
  updatePushToken,
  getLoyaltyPoints,
  redeemLoyaltyPoints,
};
