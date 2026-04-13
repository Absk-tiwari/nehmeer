// get mobile from anywhere (signup / forgot / login)
export const getUserMobile = () => {
  return (
    localStorage.getItem("signupMobile") ||
    localStorage.getItem("resetMobile") ||
    localStorage.getItem("userMobile") ||
    ""
  );
};

// mask mobile number
export const maskMobile = (num) => {
  if (!num) return "**********";
  return num.replace(/\d(?=\d{4})/g, "*");
};