import jwt_decode from "jwt-decode";

export async function isValidToken(token) {
  if (token?.length) {
    const decodedToken = await jwt_decode(token);
    const valid = decodedToken?.exp > Math.floor(new Date().getTime() / 1000);
    console.log(
      "isValidToken",
      Number(decodedToken?.exp) < Math.floor(new Date().getTime() / 1000),
      decodedToken?.exp,
      "<",
      Math.floor(new Date().getTime() / 1000)
    );
    return valid;
  }
  // console.log("Token length 0");
  return false;
}

export function getUniueArray(arr) {
  return Array.from(new Set([...arr]));
}

export function getInitials(fullName) {
  if (!fullName) return;
  return fullName
    ?.split(" ")
    ?.map((name) => name?.charAt(0))
    ?.join("");
}

export function calculateAge(date, precise = false) {
  if (!date) return;
  const today = new Date();
  const birthday = new Date(date);
  const yearDifference = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();
  const age = yearDifference - Math.abs(monthDifference / 12);
  // console.log("calculateAge", age, Math.abs(monthDifference / 12));
  if (precise) return age;
  return Math.floor(age);
}

export function makeAddressString(address) {
  if (typeof address !== "object") return;
  return `${address?.area}, ${address?.street}, ${address?.city}, ${address?.state}, India-${address?.pincode}.`;
}

export async function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function getBase64String(blob) {
  const base64 = await blobToBase64(blob);
  const dataString = base64?.split("base64,")[1];
  return dataString;
}
