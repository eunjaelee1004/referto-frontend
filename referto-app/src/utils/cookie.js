import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};
