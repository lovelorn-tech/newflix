export const sessionService = {
  isSession: () => (localStorage.getItem("session") ? true : false),
  getSession: () => localStorage.getItem("session") !== null ? JSON.parse(localStorage.getItem("session")) : null,
  removeSession: () => localStorage.removeItem("session"),
  setSession: (session) => localStorage.setItem("session", JSON.stringify(session)),
};
