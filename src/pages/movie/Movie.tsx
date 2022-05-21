import { 
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography 
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetailsAdapter, moviesAdapter, movieSimilarsAdapter } from '../../adapters/movie.adapter';
import { useFetchAndLoad } from '../../hooks';
import { createMovies } from '../../redux/states/movie';
import { AppStore } from '../../redux/store';
import { movieChanges, movieDetails, movieSimilar } from '../../services/movie.service';
import ImageIcon from '@mui/icons-material/Image';
import { IMovie } from '../../models/movie.model';
import './style/movie.scss';
import { selectedMovie } from '../../redux/states/movieSelected';
import { Loader } from './../../components/Loader';
import { createMovieDetails } from '../../redux/states/movieDetails';
import { createMovieSimilar } from '../../redux/states/movieSimilar';
import imageDefault from './../../assets/default-movie.webp';
import { CardComponent } from '../../components/Card';

export const Movie = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const moviesState = useSelector((store: AppStore) => store.movies);
  const movieSelectedState = useSelector((store: AppStore) => store.movieSelected);
  const movieDetailsState = useSelector((store: AppStore) => store.movieDetails);
  const movieSimilarState = useSelector((store: AppStore) => store.movieSimilar);
  
  useEffect( () => {
    const getMovie = async () => {
      const movies = await callEndpoint(movieChanges());
      dispatch(createMovies(moviesAdapter(movies)));
    }
    getMovie();
  }, []);

  useEffect( () => {
    const getMovieDetails = async () => {
      const responsePromise = await Promise.all([
        callEndpoint(movieDetails(movieSelectedState.id)),
        callEndpoint(movieSimilar(movieSelectedState.id))
      ])
      await dispatch(createMovieDetails(movieDetailsAdapter(responsePromise[0])));
      await dispatch(createMovieSimilar(movieSimilarsAdapter(responsePromise[1])));
    }
    getMovieDetails(); 
  }, [movieSelectedState])

  const handleSelectedMovie = (movie: IMovie) => {
    dispatch(selectedMovie(movie));
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}>
              <div className='content-list-movie'>
                <List 
                  sx={{ width: '100%' }}
                  subheader={<ListSubheader>Movie</ListSubheader>}
                >
                  {
                    moviesState.map( (movie: IMovie) => (
                      <div key={movie.id} onClick={ () => handleSelectedMovie(movie) }>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={movie.id} secondary={!movie.adult ? "All public" : "Adult"} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ) )
                  }
                </List>
              </div>
            </Grid>

            <Grid item xs={6} sm={8}>
              { (movieSelectedState.id !== 0 && movieDetailsState.title.length) && (
                <Grid item style={{ padding: "30px 0px"}}>
                  <CardComponent 
                    title={movieDetailsState.title}
                    description={movieDetailsState.overview}
                    voteCount={movieDetailsState.voteCount}
                    voteAverage={movieDetailsState.voteAverage}
                    image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                    height={"200px"}
                  />
                  </Grid>
              )}

              <Grid container spacing={2} className="content-similar-movie">
                {
                  (movieSelectedState.id !== 0 && movieSimilarState.length) && (<>
                    {
                      movieSimilarState.map((movie, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                          <CardComponent 
                            title={movie.title}
                            description={movie.overview}
                            voteCount={movie.voteCount}
                            voteAverage={movie.voteAverage}
                            image={imageDefault}
                            height={"150px"}
                            className='title'
                            style={{
                              height: "120px",
                              overflowY: "auto",
                            }}
                          />
                        </Grid>
                      ))
                    }
                  </>)
                }
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Movie;

