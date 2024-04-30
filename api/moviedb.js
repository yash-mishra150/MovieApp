import axios from "axios";
const apikey = '00efd0bde0ef5068185ec99800d6d549';
const apiBaseUrl = 'https://api.themoviedb.org/3';

export const Images500 = (path) => path? `https://image.tmdb.org/t/p/w500${path}`: 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';
export const Images342 = (path) => path? `https://image.tmdb.org/t/p/w342${path}`: 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';
export const Images185 = (path) => path? `https://image.tmdb.org/t/p/w185${path}`: 'https://global.discourse-cdn.com/turtlehead/original/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace.png';


// endpoint
const trendingMovieEndpoint =  `${apiBaseUrl}/trending/movie/day?api_key=${apikey}`;
const upcomingMovieEndpoint =  `${apiBaseUrl}/movie/upcoming?api_key=${apikey}`;
const topRatedMovieEndpoint =  `${apiBaseUrl}/movie/top_rated?api_key=${apikey}`;



// dynamic endpoint
const movieDetailsEndpoint = id =>  `${apiBaseUrl}/movie/${id}?api_key=${apikey}`;
const movieCreditsEndpoint = (id) =>  `${apiBaseUrl}/movie/${id}/credits?api_key=${apikey}`;
const similarMoviesEndpoint = (id) =>  `${apiBaseUrl}/movie/${id}/similar?api_key=${apikey}`;

const personDetailsMoviesEndpoint = (id) =>  `${apiBaseUrl}/person/${id}?api_key=${apikey}`;
const personMoviesEndpoint = (id) =>  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apikey}`;
const searchMoviesEndpoint =  `${apiBaseUrl}/search/movie?api_key=${apikey}`;


const apiCall = async (endpoint, params) =>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params:{},
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
        return {}
    }
}

export const fetchTrendingMovies = () =>{
    return apiCall(trendingMovieEndpoint);
}
export const fetchUpcomingMovies = () =>{
    return apiCall(upcomingMovieEndpoint);
}
export const fetchTopRatedMovies = () =>{
    return apiCall(topRatedMovieEndpoint);
}
export const fetchSimilarMovies = (id) =>{
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchMoviesDetails = id =>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMoviesCredits = (id) =>{
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchPersonDetails = (id) =>{
    return apiCall(personDetailsMoviesEndpoint(id));
}
export const fetchPersonMovies = (id) =>{
    return apiCall(personMoviesEndpoint(id));
}

export const fetchSearchMovies = (params) =>{
    return apiCall(searchMoviesEndpoint,params);
}