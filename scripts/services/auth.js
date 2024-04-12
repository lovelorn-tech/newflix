export const authService = {
  login: async (login) => {
    try {
      const sessionService = (await import("./session.js")).sessionService;
      let success = false;
      const accounts = JSON.parse(localStorage.getItem("accounts") ?? "[]");
      accounts.some((account) => {
        if (
          account.email === login.email &&
          account.password === login.password
        ) {
          sessionService.setSession(account);
          success = true;
        }
        return success;
      });
      return [success, success ? "" : "Usuario y/o contraseña incorrectos."];
    } catch (ex) {
      return [false, "Algo salió mal."];
    }
  },
  signup: (signup) => {
    try {
      let success = false;
      let emailRegistered = false;
      const accounts = JSON.parse(localStorage.getItem("accounts") ?? "[]");
      accounts.every((account) => {
        if (account.email === signup.email) {
          emailRegistered = true;
          return success;
        }
        return true;
      });
      if (!emailRegistered) {
        accounts.push(signup);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        success = true;
      }
      return [
        success,
        success
          ? "Registro exitoso. Redirigiendo a la página de inicio de sesión."
          : "Correo electrónico ya registrado.",
      ];
    } catch (ex) {
      return [false, "Algo salió mal."];
    }
  },
  logout: async () => {
    try {
      const sessionService = (await import("./session.js")).sessionService;
      sessionService.removeSession();
      return [true, "Sesión cerrada exitosamente."];
    } catch (ex) {
      return [false, "Algo salió mal."];
    }
  },
};
