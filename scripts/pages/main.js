let documentReady = false;

async function importJSFiles() {
  const moviesResponse = fetch("./newflix/mocks/videos.json");
  const videoServiceResponse = import("../components/video.js");
  const headerServiceResponse = import("../components/header.js");
  const navServiceResponse = import("../components/nav.js");
  const footerServiceResponse = import("../components/footer.js");
  movies = await (await moviesResponse).json();
  videoService = (await videoServiceResponse).videoService;
  headerService = (await headerServiceResponse).headerService;
  navService = (await navServiceResponse).navService;
  footerService = (await footerServiceResponse).footerService;
}

function onLoad() {
  const loadData = async () => {
    await importJSFiles();
    const movieListElement = document.querySelectorAll(".movie-list");
    movieListElement.forEach((element) => {
      element.innerHTML = videoService.getVideoListHTML(movies);
    });
    const headerRightElement = document.getElementById("header-right");
    headerRightElement.appendChild(await headerService.getHeaderProfile());
    await headerService.addEvents();

    const navProfile = document.getElementById("nav-profile");
    navProfile.innerHTML = await navService.getNavProfile();

    const footerProfile = document.getElementById("footer-profile");
    footerProfile.innerHTML = await footerService.getFooterProfile();
  };
  if (!documentReady) loadData();
  documentReady = true;
}

let movies = null;
let videoService = null;
let headerService = null;
let navService = null;
let footerService = null;

onLoad();
