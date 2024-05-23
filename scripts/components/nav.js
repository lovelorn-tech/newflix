import { ROOT_PATH } from "../services/environment.js";
import { sessionService } from "../services/session.js";
import { listService } from "./list.js";
const displayService = (await import("../services/display.js")).displayService;

export const navService = {
  getNav: async () => {
    const nav = document.createElement("nav");
    nav.classList = "nav";
    nav.id = "nav";

    const navProfile = await getNavProfile();
    if (navProfile !== null) {
      nav.appendChild(navProfile);
    }

    // First button
    const ul = document.createElement("ul");
    const firstLi = listService.createLinkItem(
      `${ROOT_PATH}/`,
      "Inicio",
      "fa-solid fa-house"
    );
    ul.appendChild(firstLi);

    // Second button
    const liItemOne = document.createElement("li");

    const buttonLiOne = listService.createButtonItem(
      "Explorar",
      "fa-solid fa-compass"
    );
    buttonLiOne.classList = "btn-nav-subitems-1";

    const subUlItemOne = document.createElement("ul");
    subUlItemOne.classList = "nav-subitems";
    subUlItemOne.id = "nav-subitems-1";

    const subLiItemsOne = [
      { href: `${ROOT_PATH}/`, text: "Series y películas" },
      { href: `${ROOT_PATH}/`, text: "Programas TV" },
      { href: `${ROOT_PATH}/`, text: "Anime" },
      { href: `${ROOT_PATH}/`, text: "Reparto" },
    ];
    subLiItemsOne.forEach((item) => {
      subUlItemOne.appendChild(
        listService.createLinkItem(item.href, item.text)
      );
    });
    liItemOne.appendChild(buttonLiOne);
    liItemOne.appendChild(subUlItemOne);
    ul.appendChild(liItemOne);

    // Third button
    const liItemTwo = document.createElement("li");

    const buttonLiTwo = listService.createButtonItem(
      "Suscripción",
      "fa-regular fa-credit-card"
    );
    buttonLiTwo.classList = "btn-nav-subitems-2";

    const subUlItemTwo = document.createElement("ul");
    subUlItemTwo.classList = "nav-subitems";
    subUlItemTwo.id = "nav-subitems-2";

    const subLiItemsTwo = [
      { href: `${ROOT_PATH}/`, text: "Planes y precios" },
      { href: `${ROOT_PATH}/`, text: "Mi plan actual" },
      { href: `${ROOT_PATH}/`, text: "Preguntas frecuentes (FAQ)" },
    ];
    subLiItemsTwo.forEach((item) => {
      subUlItemTwo.appendChild(
        listService.createLinkItem(item.href, item.text)
      );
    });
    liItemTwo.appendChild(buttonLiTwo);
    liItemTwo.appendChild(subUlItemTwo);
    ul.appendChild(liItemTwo);

    // Fourth button
    const liItemThree = document.createElement("li");

    const buttonLiThree = listService.createButtonItem(
      "Contacto",
      "fa-solid fa-headset"
    );
    buttonLiThree.classList = "btn-nav-subitems-3";

    const subUlItemThree = document.createElement("ul");
    subUlItemThree.classList = "nav-subitems";
    subUlItemThree.id = "nav-subitems-3";

    const subLiItemsThree = [
      { href: `${ROOT_PATH}/`, text: "Sobre nosotros" },
      { href: `${ROOT_PATH}/`, text: "Soporte" },
      { href: `${ROOT_PATH}/`, text: "Política de privacidad" },
      { href: `${ROOT_PATH}/`, text: "Términos y condiciones" },
      { href: `${ROOT_PATH}/`, text: "Preguntas frecuentes (FAQ)" },
    ];
    subLiItemsThree.forEach((item) => {
      subUlItemThree.appendChild(
        listService.createLinkItem(item.href, item.text)
      );
    });

    liItemThree.appendChild(buttonLiThree);
    liItemThree.appendChild(subUlItemThree);
    ul.appendChild(liItemThree);

    // Add events
    buttonLiOne.addEventListener("click", (e) => {
      displayService.displayElement("nav-subitems-1");
    });

    buttonLiTwo.addEventListener("click", (e) => {
      displayService.displayElement("nav-subitems-2");
    });

    buttonLiThree.addEventListener("click", (e) => {
      displayService.displayElement("nav-subitems-3");
    });

    nav.appendChild(ul);
    return nav;
  },
  addEvents: async () => {},
};

async function getNavProfile() {
  let navProfile = null;
  if ((await import("../services/session.js")).sessionService.isSession()) {
    const session = sessionService.getSession();
    navProfile = document.createElement("div");
    navProfile.classList = "nav-profile";
    navProfile.innerHTML = `<div class="nav-profile-avatar">
      <img src="${ROOT_PATH}/assets/img/avatar.webp" />
      </div>
      <p>${session?.nickname}</p>`;
  }
  return navProfile;
}
