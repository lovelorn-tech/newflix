import { sessionService } from "../services/session.js";
import { listService } from "./list.js";
const ROOT_PATH = (await import("../services/environment.js")).ROOT_PATH;

export const footerService = {
  getFooter: async () => {
    const footer = document.createElement("footer");
    footer.classList = "footer";
    const ul = document.createElement("ul");
    const liItems = [
      { href: `${ROOT_PATH}/`, text: "Inicio", icon: "fa-solid fa-house" },
      { href: `${ROOT_PATH}/`, text: "Explorar", icon: "fa-solid fa-compass" },
      {
        href: `${ROOT_PATH}/`,
        text: "Biblioteca",
        icon: "fa-solid fa-layer-group",
      },
      { href: `${ROOT_PATH}/`, text: "Notif.", icon: "fa-solid fa-bell" },
    ];
    liItems.forEach((item) => {
      ul.appendChild(
        listService.createLinkItem(item.href, item.text, item.icon)
      );
    });
    ul.appendChild(await getFooterProfile());
    footer.appendChild(ul);
    return footer;
  },
  addEvents: async () => {},
};

async function getFooterProfile() {
  const profileLi = document.createElement("li");
  const profileAnchor = document.createElement("a");
  profileAnchor.classList = "footer-profile";
  profileLi.appendChild(profileAnchor);
  if ((await import("../services/session.js")).sessionService.isSession()) {
    const session = sessionService.getSession();
    profileAnchor.innerHTML = `<div class="footer-profile-avatar">
      <img src="./mocks/img/avatar.webp" alt="avatar" />
      </div>
      <p>${session?.nickname}</p>`;
    profileAnchor.href = `${ROOT_PATH}/`;
  } else {
    profileAnchor.innerHTML = `
    <i class="fa-solid fa-user"></i>
    <p>Ingresar</p>
  `;
    profileAnchor.href = `${ROOT_PATH}/auth.html`;
  }
  return profileLi;
}
