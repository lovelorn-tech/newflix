const environmentResponse = import("../services/environment.js");
const ROOT_PATH = (await environmentResponse).ROOT_PATH;

export const videoService = {
  getVideoListHTML: (movies) => {
    let html = "";
    movies.forEach((movie) => {
      html += videoService.getVideoHTML(movie);
    });
    return html;
  },
  getVideoHTML: (movie) => {
    return `<a href="${ROOT_PATH}/movie.html?id=${movie.id}" class="video-post">
    <img src=${movie.imageSet.verticalPoster.w240} alt="thumbnail" />
    <div class="video-info">
        <h2>${movie.title}</h2>
        <div class="video-details">
            <span class="views"><i class="fa fa-eye"></i>
                <p>${movie.rating}</p>
            </span>
            <span class="views"><i class="fa-solid fa-hourglass-start"></i>
                <p>Publicado ${movie.releaseYear}</p>
            </span>
        </div>
    </div>
  </a>`;
  },
};
