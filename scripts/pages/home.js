let documentReady = false;

async function importJSFiles() {
  const mainResponse = import("../services/main.js");
  const moviesResponse = import("../services/movie.js");
  const videoResponse = import("../components/video.js");
  onLoad = (await mainResponse).onLoad;
  movieService = (await moviesResponse).movieService;
  videoService = (await videoResponse).videoService;
}

function onPageLoad() {
  const loadData = async () => {
    await importJSFiles();
    onLoad();

    const response = await movieService.getMovies();
    if (response.status === 200 && response.data) {
      const movies = response.data.shows;

      const movieListElement = document.querySelectorAll(".movie-list");
      movieListElement.forEach((element) => {
        element.innerHTML = videoService.getVideoListHTML(movies);
      });

      const movieFeedElement = document.getElementById("movie-list-feed");
      movieFeedElement.innerHTML = videoService.getVideoListHTML(movies);
    }
  };
  if (!documentReady) loadData();
  documentReady = true;
}

let movieService = null;
let videoService = null;
let onLoad = null;

onPageLoad();
