import { 
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
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
      const movieDetailsResponse = await callEndpoint(movieDetails(movieSelectedState.id));
      const movieSimilarResponse  = await callEndpoint(movieSimilar(movieSelectedState.id));
      dispatch(createMovieDetails(movieDetailsAdapter(movieDetailsResponse)));
      dispatch(createMovieSimilar(movieSimilarsAdapter(movieSimilarResponse)));
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

            <Grid item xs={6} sm={8} style={{ padding: "30px"}}>
              { (movieSelectedState.id !== 0 && movieDetailsState.title.length) && (
                  <Grid item xs={12} style={{ padding: "30px"}}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200px"
                          image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {movieDetailsState.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {movieDetailsState.overview}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions 
                        disableSpacing
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography>
                          vote count: {movieDetailsState.voteCount}
                        </Typography>

                        <Typography>
                          vote average: {movieDetailsState.voteAverage}
                        </Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }

              <Grid container spacing={2} className="content-similar-movie">
                {
                  (movieSelectedState.id !== 0 && movieSimilarState.length) && (<>
                    {
                      movieSimilarState.map((movie, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="150px"
                                image={imageDefault}
                                alt="green iguana"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className='title' title={movie.title}>
                                  {movie.title}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  style={{
                                    height: "120px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {movie.overview}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions 
                              disableSpacing
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <Typography>
                                vote count: {movie.voteCount}
                              </Typography>

                              <Typography>
                                vote average: {movie.voteAverage}
                              </Typography>
                            </CardActions>
                          </Card>
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

