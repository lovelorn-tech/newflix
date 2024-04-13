import { sessionService } from "../services/session.js";

export const footerService = {
  getFooterProfile: async () => {
    let element = null;
    if ((await import("../services/session.js")).sessionService.isSession()) {
      const session = sessionService.getSession();
      element = `<div class="footer-profile-avatar">
        <img src="./mocks/img/avatar.webp" alt="avatar" />
        </div>
        <p>${session?.nickname}</p>`;
    } else {
      element = `
      <i class="fa-solid fa-user"></i>
      <p>Ingresar</p>
    `;
      document.getElementById("footer-profile").href = "/newflix/auth.html";
    }
    return element;
  },
  addEvents: async () => {},
};
