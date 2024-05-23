import { sessionService } from "../services/session.js";
import { listService } from "./list.js";

const ROOT_PATH = (await import("../services/environment.js")).ROOT_PATH;
const displayService = (await import("../services/display.js")).displayService;
const authService = (await import("../services/auth.js")).authService;

export const headerService = {
  getHeader: async () => {
    const header = document.createElement("header");
    header.classList = "header";
    header.id = "header";

    header.appendChild(await getAnchor());
    header.appendChild(await getHeaderLists());
    header.appendChild(await getHeaderProfile());

    return header;
  },
  addEvents: async () => {
    const displayService = (await import("../services/display.js"))
      .displayService;

    document
      .getElementById("profile-dropdown")
      ?.addEventListener("blur", (e) => {
        displayService.hideOnBlurElement(e, "profile-dropdown");
      });

    document
      .getElementById("btn-header-profile")
      ?.addEventListener("click", () => {
        displayService.displayElement("profile-dropdown");
      });
  },
};

async function getAnchor() {
  const headerAnchor = document.createElement("a");
  headerAnchor.href = `${ROOT_PATH}/`;
  headerAnchor.innerText = "NEWFLIX";
  return headerAnchor;
}

async function getHeaderLists() {
  const displayService = (await import("../services/display.js"))
    .displayService;

  const headerList = document.createElement("ul");

  // First element
  const liOne = document.createElement("li");

  const liOneAnchor = document.createElement("a");
  liOneAnchor.href = `${ROOT_PATH}/`;
  liOneAnchor.innerText = "Inicio";

  liOne.appendChild(liOneAnchor);

  // Second element
  const liSubItemOne = document.createElement("li");
  liSubItemOne.classList = "header-subitem-1";
  liSubItemOne.id = "header-subitem-1";

  const subUlItemOne = document.createElement("ul");
  subUlItemOne.classList = "header-subitems";
  subUlItemOne.id = "header-subitems-1";
  const subLiItemsOne = [
    { href: `${ROOT_PATH}/`, text: "Series y películas" },
    { href: `${ROOT_PATH}/`, text: "Programas TV" },
    { href: `${ROOT_PATH}/`, text: "Anime" },
    { href: `${ROOT_PATH}/`, text: "Reparto" },
  ];
  subLiItemsOne.forEach((item) => {
    subUlItemOne.appendChild(listService.createLinkItem(item.href, item.text));
  });

  liSubItemOne.appendChild(
    listService.createSpanItem("Explorar", "fa-solid fa-caret-down")
  );
  liSubItemOne.appendChild(subUlItemOne);

  // Third element
  const liSubItemTwo = document.createElement("li");
  liSubItemTwo.classList = "header-subitem-2";
  liSubItemTwo.id = "header-subitem-2";

  const subUlItemTwo = document.createElement("ul");
  subUlItemTwo.classList = "header-subitems";
  subUlItemTwo.id = "header-subitems-2";
  const subLiItemsTwo = [
    { href: `${ROOT_PATH}/`, text: "Planes y precios" },
    { href: `${ROOT_PATH}/`, text: "Mi plan actual" },
    { href: `${ROOT_PATH}/`, text: "Preguntas frecuentes (FAQ)" },
  ];
  subLiItemsTwo.forEach((item) => {
    subUlItemTwo.appendChild(listService.createLinkItem(item.href, item.text));
  });

  liSubItemTwo.appendChild(
    listService.createSpanItem("Suscripción", "fa-solid fa-caret-down")
  );
  liSubItemTwo.appendChild(subUlItemTwo);

  // Fourth element
  const liSubItemThree = document.createElement("li");
  liSubItemThree.classList = "header-subitem-3";
  liSubItemThree.id = "header-subitem-3";

  const subUlItemThree = document.createElement("ul");
  subUlItemThree.classList = "header-subitems";
  subUlItemThree.id = "header-subitems-3";
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

  liSubItemThree.appendChild(
    listService.createSpanItem("Contacto", "fa-solid fa-caret-down")
  );
  liSubItemThree.appendChild(subUlItemThree);

  // Set events
  liSubItemOne.addEventListener("mouseenter", (e) => {
    displayService.displayOnHoverElement("header-subitems-1");
  });
  liSubItemOne.addEventListener("mouseleave", (e) => {
    displayService.hideOnBlurElement(e, "header-subitems-1");
  });

  liSubItemTwo.addEventListener("mouseenter", (e) => {
    displayService.displayOnHoverElement("header-subitems-2");
  });
  liSubItemTwo.addEventListener("mouseleave", (e) => {
    displayService.hideOnBlurElement(e, "header-subitems-2");
  });

  liSubItemThree.addEventListener("mouseenter", (e) => {
    displayService.displayOnHoverElement("header-subitems-3");
  });
  liSubItemThree.addEventListener("mouseleave", (e) => {
    displayService.hideOnBlurElement(e, "header-subitems-3");
  });

  // Append children to header
  headerList.appendChild(liOne);
  headerList.appendChild(liSubItemOne);
  headerList.appendChild(liSubItemTwo);
  headerList.appendChild(liSubItemThree);

  return headerList;
}

async function getHeaderProfile() {
  const headerRight = document.createElement("div");
  headerRight.classList = "header-right";
  headerRight.id = "header-right";

  const btnFormOpener = document.createElement("button");
  btnFormOpener.id = "btn-form-opener";
  btnFormOpener.classList = "btn-form-search-opener";
  btnFormOpener.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  btnFormOpener.addEventListener("click", (e) => {
    displayService.displayElement("form-search");
  });

  const btnFormCloser = document.createElement("button");
  btnFormCloser.id = "btn-form-closer";
  btnFormCloser.type = "button";
  btnFormCloser.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  btnFormCloser.addEventListener("click", (e) => {
    displayService.displayElement("form-search");
  });

  const btnNavOpener = document.createElement("button");
  btnNavOpener.id = "btn-nav-opener";
  btnNavOpener.classList = "btn-nav-opener show-mobile";
  btnNavOpener.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  btnNavOpener.addEventListener("click", (e) => {
    displayService.displayElement("nav");
  });

  headerRight.appendChild(btnFormOpener);

  const formSearch = document.createElement("form");
  formSearch.id = "form-search";
  formSearch.classList = "form-search";

  const formInput = document.createElement("input");
  formInput.type = "text";
  formInput.placeholder = "Buscar...";

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  formSearch.appendChild(formInput);
  formSearch.appendChild(btnSubmit);
  formSearch.appendChild(btnFormCloser);

  const formSearchContainer = document.createElement("div");
  formSearchContainer.classList = "form-search-container";

  formSearchContainer.appendChild(formSearch);

  headerRight.appendChild(formSearchContainer);

  headerRight.appendChild(btnNavOpener);

  if ((await import("../services/session.js")).sessionService.isSession()) {
    const session = sessionService.getSession();
    element = document.createElement("div");
    element.className = "btn-header-profile";

    const btnProfile = document.createElement("button");
    btnProfile.classList = "header-profile-avatar";
    btnProfile.id = "btn-header-profile";
    btnProfile.innerHTML = `<img src="${ROOT_PATH}/assets/img/avatar.webp" alt="avatar" />`;

    element.appendChild(btnProfile);
    const profileMenu = document.createElement("ul");
    profileMenu.classList = "profile-menu";
    profileMenu.id = "profile-dropdown";
    profileMenu.tabIndex = -1;

    const profileMenuItemOne = document.createElement("li");
    profileMenuItemOne.innerHTML = `
      <div class="header-profile-info">
        <div class="header-profile-info-avatar">
          <img src="./mocks/img/avatar.webp" alt="avatar" />
        </div>
        <p>${session?.nickname}</p>
      </div>
    `;

    const profileMenuItemLast = document.createElement("li");

    const profileLogOutBtn = document.createElement("button");
    profileLogOutBtn.id = "btn-logout";
    profileLogOutBtn.classList = "btn-logout";
    profileLogOutBtn.innerHTML = `<p>Cerrar sesión</p>`;
    profileLogOutBtn.addEventListener("click", async (e) => {
      await authService.logout();
      window.open("/newflix", "_self");
    });

    const items = [
      { href: `${ROOT_PATH}/`, text: "Mi cuenta" },
      { href: `${ROOT_PATH}/`, text: "Biblioteca" },
      { href: `${ROOT_PATH}/`, text: "Mi suscripción" },
      { href: `${ROOT_PATH}/`, text: "Configuración" },
    ];

    profileMenu.appendChild(profileMenuItemOne);
    items.forEach((item) => {
      profileMenu.appendChild(listService.createLinkItem(item.href, item.text));
    });
    profileMenu.appendChild(profileMenuItemLast);
  } else {
    const loginAnchor = document.createElement("a");
    loginAnchor.classList = "anchor-auth";
    loginAnchor.href = `${ROOT_PATH}/auth.html`;
    const loginIcon = document.createElement("i");
    loginIcon.classList = "fa-solid fa-user";
    loginAnchor.appendChild(loginIcon);
    headerRight.appendChild(loginAnchor);
  }
  return headerRight;
}
