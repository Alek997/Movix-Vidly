import http from "./httpService";
import { apiUrl } from "../config.json";
import Logout from "../components/logout";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
