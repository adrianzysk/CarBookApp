const KEY = "stamp";

export function saveToken(token) {
  localStorage.setItem(KEY, JSON.stringify(token));
}

export function getToken() {
  return JSON.parse(localStorage.getItem(KEY));
}

export function deleteToken() {
  localStorage.removeItem(KEY);
}