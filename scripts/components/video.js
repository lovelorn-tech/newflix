export const videoService = {
  getVideoListHTML: (movies) => {
    let html = "";
    movies.forEach((movie) => {
      html += videoService.getVideoHTML(movie);
    });
    return html;
  },
  getVideoHTML: (movie) => {
    return `<div class="video-post">
    <img src=${movie.thumbnail} alt="thumbnail" />
    <div class="video-info">
        <h2>${movie.title}</h2>
        <div class="video-details">
            <span class="views"><i class="fa fa-eye"></i>
                <p>${movie.views}</p>
            </span>
            <span class="views"><i class="fa-solid fa-hourglass-start"></i>
                <p>${movie.duration} minutos</p>
            </span>
        </div>
    </div>
  </div>`;
  },
};
