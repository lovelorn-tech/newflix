export const movieService = {
  getMovie: async (id) => {
    const url =
      `https://streaming-availability.p.rapidapi.com/shows/${id}?series_granularity=show&country=br&output_language=es`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0bc5750f7cmshfaefe4990bf4536p130b02jsn346918df85d7",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
      };
    }
  },
  getMovies: async () => {
    const url =
      "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=br&show_type=movie&series_granularity=show&order_by=original_title&output_language=es&order_direction=asc&genres_relation=and";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0bc5750f7cmshfaefe4990bf4536p130b02jsn346918df85d7",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };
    try {
      const reponse = await fetch(url, options);
      const result = await reponse.json();
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
      };
    }
  },
};
