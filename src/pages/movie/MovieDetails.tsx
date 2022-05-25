import { 
    Container,
    Grid,
    Link
  } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { movieSimilarsAdapter } from '../../adapters/movie.adapter';
import { useFetchAndLoad } from '../../hooks';
import { AppStore } from '../../redux/store';
import { movieSimilar } from '../../services/movie.service';
import './style/movie.scss';
import { resetMovieSelectedReduce } from '../../redux/states/movieSelected';
import { Loader } from './../../components/Loader';
import { movieSimilarReduce } from '../../redux/states/movieSimilar';
import { CardComponent } from '../../components/Card';
import { ArrowBackIos } from '@mui/icons-material';
import imageDefault from './../../assets/default-movie.webp';

  export const MovieDetails = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const movieDetailsState = useSelector((store: AppStore) => store.movieDetails);
    const movieSimilarState = useSelector((store: AppStore) => store.movieSimilar);

    const navigate = useNavigate();
  
    useEffect( () => {
      const getSimiliarMovie = async () => {
        const similarMoviesResponse = await callEndpoint(movieSimilar(movieDetailsState.id));
        dispatch(movieSimilarReduce(movieSimilarsAdapter(similarMoviesResponse)));
      }
      
      if(movieDetailsState.id === 0){
        navigate('/movie');
      }
      else{
        getSimiliarMovie();
      }
    }, []);

    const handleDetails = () => {
      dispatch(resetMovieSelectedReduce());
    }
  
    return (
      <>
        {loading ? (
          <div
            className='loader'
          >
            <Loader />
          </div>
        ) : (
          <>
            <Container className="container-movies">
              <Grid container spacing={2}>
                <Grid item xs={12} style={{display: "flex"}}>   
                  <Link
                    component={RouterLink}
                    to="/movie"
                    variant="h6"
                    color="inherit"
                    underline="none"
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                    onClick={() => handleDetails()}
                  >
                    <ArrowBackIos/>
                  </Link>
                  <h2>
                    Movie Details
                  </h2>
                </Grid>
                <Grid item xs={12} style={{ padding: "30px 0px"}} >
                  {
                    movieDetailsState.id !== 0  
                    ? (
                      <CardComponent 
                        id={movieDetailsState.id}
                        title={movieDetailsState.title}
                        description={movieDetailsState.overview}
                        voteCount={movieDetailsState.voteCount}
                        voteAverage={movieDetailsState.voteAverage}
                        image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                        height={"200px"}
                        details={true}
                        component="movie"
                      />
                    )
                    : ( <></> )
                  }
                </Grid>
                
                <Grid item xs={12} style={{display: "flex"}}>   
                  <h2>
                    Similar
                  </h2>
                </Grid>

                <Grid item xs={12} style={{position: "relative", display: "flex"}}>
                  <Grid container spacing={2}>
                    {
                      movieSimilarState.length 
                      ? (
                        <>
                          {
                            movieSimilarState.map( (movie, index) => (
                              <Grid item md={4} key={index} className="content-similar-movie">
                                <CardComponent 
                                  id={movie.id}
                                  title={movie.title}
                                  description={movie.overview}
                                  voteCount={movie.voteCount}
                                  voteAverage={movie.voteAverage}
                                  image={imageDefault}
                                  height={"150px"}
                                  className='title'
                                  style={{
                                    height: "150px",
                                    overflowY: "auto",
                                  }}
                                  details={false}
                                  component="movie"
                                />
                              </Grid>
                            ) )
                          }
                        </>
                      )
                      : ( <></> )
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Container> 
          </>
        )}
      </>
    );
  };
  
  export default MovieDetails;
  
  