import { 
    Container,
    Grid,
    Link
  } from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { tvSimilarsAdapter } from '../../adapters/tv.adapter';
import { useFetchAndLoad } from '../../hooks';
import { AppStore } from '../../redux/store';
import { tvSimilar } from '../../services/tv.service';
import './style/tv.scss';
import { resetTvSelectedReduce } from '../../redux/states/tvSelected';
import { Loader } from './../../components/Loader';
import { tvSimilarReduce } from '../../redux/states/tvSimilar';
import { CardComponent } from '../../components/Card';
import { ArrowBackIos } from '@mui/icons-material';
import imageDefault from './../../assets/default-movie.webp';

  export const TvDetails = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const tvDetailsState = useSelector((store: AppStore) => store.tvDetails);
    const tvSimilarState = useSelector((store: AppStore) => store.tvSimilar);

    const navigate = useNavigate();
  
    useEffect( () => {
      const getSimiliarTv = async () => {
        const similarTvsResponse = await callEndpoint(tvSimilar(tvDetailsState.id));
        dispatch(tvSimilarReduce(tvSimilarsAdapter(similarTvsResponse)));
      }
      if(tvDetailsState.id === 0){
        navigate('/tv');
      }
      else{
        getSimiliarTv();
      }
    }, []);

    const handleDetails = () => {
      dispatch(resetTvSelectedReduce());
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
            <Container className="container-tvs">
              <Grid container spacing={2}>
                <Grid item xs={12} style={{display: "flex"}}>   
                  <Link
                    component={RouterLink}
                    to="/tv"
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
                    Tv Details
                  </h2>
                </Grid>
                <Grid item xs={12} style={{ padding: "30px 0px"}} >
                  {
                    tvDetailsState.id !== 0  
                    ? (
                      <CardComponent 
                        id={tvDetailsState.id}
                        title={tvDetailsState.name}
                        description={tvDetailsState.overview}
                        voteCount={tvDetailsState.voteCount}
                        voteAverage={tvDetailsState.voteAverage}
                        image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                        height={"200px"}
                        details={true}
                        component="tv"
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
                      tvSimilarState.length 
                      ? (
                        <>
                          {
                            tvSimilarState.map( (tv, index) => (
                              <Grid item md={4} key={index} className="content-similar-tv">
                                <CardComponent 
                                  id={tv.id}
                                  title={tv.name}
                                  description={tv.overview}
                                  voteCount={tv.voteCount}
                                  voteAverage={tv.voteAverage}
                                  image={imageDefault}
                                  height={"150px"}
                                  className='title'
                                  style={{
                                    height: "150px",
                                    overflowY: "auto",
                                  }}
                                  details={false}
                                  component="tv"
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
  
  export default TvDetails;
  
  