let documentReady = false;

async function importJSFiles() {
  const moviesResponse = fetch("./mocks/videos.json");
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

    const movieFeedElement = document.getElementById('movie-list-feed');
    movieFeedElement.innerHTML = videoService.getVideoListHTML(movies);

    const header = document.getElementById("header");
    header.parentNode.replaceChild(await headerService.getHeader(), header);

    const nav = document.getElementById("nav");
    nav.parentNode.replaceChild(await navService.getNav(), nav);

    const footer = document.getElementById("footer");
    footer.parentNode.replaceChild(await footerService.getFooter(), footer);
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
