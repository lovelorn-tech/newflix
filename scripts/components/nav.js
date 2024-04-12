import { sessionService } from "../services/session.js";

export const navService = {
  getNavProfile: async () => {
    let element = null;
    if ((await import("../services/session.js")).sessionService.isSession()) {
      const session = sessionService.getSession();
      element = `<div class="nav-profile-avatar">
        <img src="./mocks/img/avatar.webp" />
        </div>
        <p>${session?.nickname}</p>`;
    }
    return element;
  },
  addEvents: async () => {},
};
