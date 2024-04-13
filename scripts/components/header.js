import { sessionService } from "../services/session.js";

export const headerService = {
  getHeaderProfile: async () => {
    let element = null;
    if ((await import("../services/session.js")).sessionService.isSession()) {
      const session = sessionService.getSession();
      element = document.createElement("div");
      element.className = "btn-header-profile";

      const btnProfile = document.createElement("button");
      btnProfile.classList = "header-profile-avatar";
      btnProfile.id = "btn-header-profile";
      btnProfile.innerHTML = `<img src="./mocks/img/avatar.webp" alt="avatar" />`;

      element.appendChild(btnProfile);
      element.innerHTML += `<ul tabindex="0" id="profile-dropdown">
      <li>
        <div class="header-profile-info">
          <div class="header-profile-info-avatar">
            <img src="./mocks/img/avatar.webp" alt="avatar" />
          </div>
          <p>${session?.nickname}</p>
        </div>
      </li>
      <li><a href="/newflix">Mi cuenta</a></li>
      <li><a href="/newflix">Biblioteca</a></li>
      <li><a href="/newflix">Mi suscripción</a></li>
      <li><a href="/newflix">Configuración</a></li>
      <li>
        <button id="btn-logout" class="btn-logout">
          <p>Cerrar sesión</p>
        </button>
      </li>
    </ul>`;
    } else {
      element = document.createElement("a");
      element.classList = "anchor-auth";
      element.href = "/newflix/auth.html";
      element.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
    return element;
  },
  addEvents: async () => {
    const displayService = (await import("../services/display.js"))
      .displayService;
    const authService = (await import("../services/auth.js")).authService;
    const headerSubitem1 = document.getElementById("header-subitem-1");
    const headerSubitem2 = document.getElementById("header-subitem-2");
    const headerSubitem3 = document.getElementById("header-subitem-3");

    headerSubitem1.addEventListener("mouseenter", () =>
      displayService.displayOnHoverElement("header-subitems-1")
    );
    headerSubitem1.addEventListener("mouseleave", (e) =>
      displayService.hideOnBlurElement(e, "header-subitems-1")
    );

    headerSubitem2.addEventListener("mouseenter", () =>
      displayService.displayOnHoverElement("header-subitems-2")
    );
    headerSubitem2.addEventListener("mouseleave", (e) =>
      displayService.hideOnBlurElement(e, "header-subitems-2")
    );

    headerSubitem3.addEventListener("mouseenter", () =>
      displayService.displayOnHoverElement("header-subitems-3")
    );
    headerSubitem3.addEventListener("mouseleave", (e) =>
      displayService.hideOnBlurElement(e, "header-subitems-3")
    );

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

    document.getElementById("btn-form-opener").addEventListener("click", () => {
      displayService.displayElement("form-search");
    });

    document.getElementById("btn-form-closer").addEventListener("click", () => {
      displayService.displayElement("form-search");
    });

    document.getElementById("btn-nav-opener").addEventListener("click", () => {
      displayService.displayElement("nav");
    });

    document
      .getElementById("btn-nav-subitems-1")
      .addEventListener("click", () => {
        displayService.displayElement("nav-subitems-1");
      });

    document
      .getElementById("btn-nav-subitems-2")
      .addEventListener("click", () => {
        displayService.displayElement("nav-subitems-2");
      });

    document
      .getElementById("btn-nav-subitems-3")
      .addEventListener("click", () => {
        displayService.displayElement("nav-subitems-3");
      });

    document
      .getElementById("btn-logout")
      ?.addEventListener("click", async () => {
        await authService.logout();
        window.open("/", "_self");
      });
  },
};
