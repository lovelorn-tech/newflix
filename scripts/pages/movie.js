let documentReady = false;

async function importJSFiles() {
  const mainResponse = import("../services/main.js");
  const movieResponse = import("../services/movie.js");
  const environmentResponse = import("../services/environment.js");
  onLoad = (await mainResponse).onLoad;
  ROOT_PATH = (await environmentResponse).ROOT_PATH;
  movieService = (await movieResponse).movieService;
}

function onPageLoad() {
  const loadData = async () => {
    await importJSFiles();
    onLoad();
    const response = await movieService.getMovie(window.location.href.split("id=").reverse()[0]);
    if (response.status === 200 && response.data) {
      const movieInfo = getVideoDetailsHTML(response.data);
      document.getElementById("movie-page").appendChild(movieInfo);
    }
  };
  if (!documentReady) loadData();
  documentReady = true;
}

let onLoad = null;
let movieService = null;
let ROOT_PATH = null;

onPageLoad();

function getVideoDetailsHTML(movie) {
  const movieInfo = document.createElement("div");
  movieInfo.classList = "movie-info";

  // Background image
  const backgroundImg = document.createElement("img");
  backgroundImg.alt = "background movie";
  backgroundImg.src = movie.imageSet.horizontalBackdrop?.w360 ?? movie.imageSet.verticalPoster.w360;

  // Movie data
  const movieData = document.createElement("div");
  movieData.classList = "movie-data";

  // -- Movie poster
  const moviePosterContainer = document.createElement("div");
  moviePosterContainer.classList = "movie-poster-container";

  const moviePoster = document.createElement("div");
  moviePoster.classList = "movie-poster";

  const moviePosterImg = document.createElement("img");
  moviePosterImg.src = movie.imageSet.verticalPoster.w240;
  moviePosterImg.alt = "movie poster";

  moviePoster.appendChild(moviePosterImg);
  moviePosterContainer.appendChild(moviePoster);

  // -- Movie details
  const movieDetails = document.createElement("div");
  movieDetails.classList = "movie-details";

  const movieTitle = document.createElement("h1");
  movieTitle.classList = "movie-title";
  movieTitle.innerText = movie.title;

  const movieDescription = document.createElement("p");
  movieDescription.classList = "movie-description";
  movieDescription.innerText = movie.overview;

  movieDetails.appendChild(movieTitle);
  movieDetails.appendChild(movieDescription);

  // -- -- Movie actions
  const movieActions = document.createElement("div");
  movieActions.classList = "movie-actions";

  const actionWn = document.createElement("a");
  actionWn.classList = "action-wn";
  actionWn.innerText = "Ver ahora";
  actionWn.href = `${ROOT_PATH}/`;
  actionWn.target = "_self";

  const actionOp = document.createElement("a");
  actionOp.classList = "action-op";
  actionOp.innerText = "Opiniones";
  actionOp.href = `${ROOT_PATH}/`;
  actionOp.target = "_self";

  movieActions.appendChild(actionWn);
  movieActions.appendChild(actionOp);

  movieDetails.appendChild(movieActions);

  movieData.appendChild(moviePosterContainer);
  movieData.appendChild(movieDetails);

  // Append children to movieInfo
  movieInfo.appendChild(backgroundImg);
  movieInfo.appendChild(movieData);
  return movieInfo;
}
