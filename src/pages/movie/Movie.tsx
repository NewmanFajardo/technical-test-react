import { 
  Container,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetailsAdapter, moviesAdapter } from '../../adapters/movie.adapter';
import { useFetchAndLoad } from '../../hooks';
import { moviesReduce } from '../../redux/states/movie';
import { AppStore } from '../../redux/store';
import { movieChanges, movieDetails, movieSimilar } from '../../services/movie.service';
import { IMovie, IMovieDetails } from '../../models/movie.model';
import './style/movie.scss';
import { selectedMovieReduce } from '../../redux/states/movieSelected';
import { Loader } from './../../components/Loader';
import imageDefault from './../../assets/default-movie.webp';
import { CardComponent } from '../../components/Card';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { LIMIT } from '../../constants/constants.contant';
import { moviesShowReduce } from '../../redux/states/moviesShow';

export const Movie = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const moviesState = useSelector((store: AppStore) => store.movies);
  const moviesShowState = useSelector((store: AppStore) => store.moviesShow);
  const movieSelectedState = useSelector((store: AppStore) => store.movieSelected);

  const [page, setPage] = useState(1); 
  const [limit] = useState(LIMIT); 


  useEffect( () => {
    const getMovie = async () => {
      const movies = await callEndpoint(movieChanges());
      const moviesAdapterData: IMovie[] = await moviesAdapter(movies);
      dispatch(moviesReduce(moviesAdapterData));
      const moviesShowData = await getMoviesShow(moviesAdapterData);
      dispatch(moviesShowReduce(moviesShowData));
      if(moviesShowData.length){
        dispatch(selectedMovieReduce(moviesShowData[0]));
      }
    }
    getMovie();
  }, []);

  useEffect( () => {
    const changeMoveShow = async () => {
      const moviesShowData = await getMoviesShow(moviesState);
      dispatch(moviesShowReduce(moviesShowData));
    }
    changeMoveShow()
  }, [page]);

  const getMoviesShow = async (moviesAdapterData: IMovie[]) => {
    if( !moviesAdapterData.length ) return [];
    const start = (limit * (page - 1));
    const end = (limit * (page - 1)) + limit;
    let j = 0;
    let movieShow: IMovieDetails[] = [];

    for( let i = start; i < end; i++ ){
      const movieShowResponse = await callEndpoint(movieDetails(moviesAdapterData[i].id));
      const movieDetailsAdapterData = movieDetailsAdapter(movieShowResponse);
      movieShow = [...movieShow, movieDetailsAdapterData];
    }
    return movieShow;
  }

  const handleSelectedMovie = (movie: IMovieDetails) => {
    dispatch(selectedMovieReduce(movie));
  }

  const handleBack = () => {
    if(page > 1){
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    const totalPage = Math.ceil(moviesState.length / limit);
    if(page < totalPage){
      setPage(page + 1)
    }
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
              <Grid item xs={12}>   
                <h2>
                  Movies
                </h2>
              </Grid>
              <Grid item xs={12} style={{ padding: "30px 0px"}} >
                {
                  moviesShowState.length 
                  ? (
                    <CardComponent 
                      id={movieSelectedState.id}
                      title={movieSelectedState.title}
                      description={movieSelectedState.overview}
                      voteCount={movieSelectedState.voteCount}
                      voteAverage={movieSelectedState.voteAverage}
                      image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                      height={"200px"}
                      to="/movie/details"
                      details={false}
                      component="movie"
                    />
                  )
                  : ( <></> )
                }
              </Grid>
              <Grid item xs={12} style={{position: "relative", display: "flex"}}>
                <span className='arrow-back'
                  onClick={() => {
                    handleBack()
                  }}
                >
                  <ArrowBackIos/>
                </span>
                <Grid container spacing={2}>
                  {
                    moviesShowState.length 
                    ? (
                      <>
                        {
                          moviesShowState.map( (movie, index) => (
                            <Grid item md={4} key={index} className="content-similar-movie"
                              onClick={ () => handleSelectedMovie(movie)}
                            >
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
                                to="/movie/details"
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
                <span className='arrow-next'
                  onClick={() => {
                    handleNext()
                  }}
                >
                  <ArrowForwardIos/>
                </span>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Movie;

