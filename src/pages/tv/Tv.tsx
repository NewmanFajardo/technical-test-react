import { 
  Container,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tvDetailsAdapter, tvAdapter } from '../../adapters/tv.adapter';
import { useFetchAndLoad } from '../../hooks';
import { tvReduce } from '../../redux/states/tv';
import { AppStore } from '../../redux/store';
import { tvChanges, tvDetails } from '../../services/tv.service';
import { ITv, ITvDetails } from '../../models/tv.model';
import './style/tv.scss';
import { selectedTvReduce } from '../../redux/states/tvSelected';
import { Loader } from './../../components/Loader';
import imageDefault from './../../assets/default-movie.webp';
import { CardComponent } from '../../components/Card';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { LIMIT } from '../../constants/constants.contant';
import { tvShowReduce } from '../../redux/states/tvShow';

export const Tv = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const tvState = useSelector((store: AppStore) => store.tv);
  const tvShowState = useSelector((store: AppStore) => store.tvShow);
  const tvSelectedState = useSelector((store: AppStore) => store.tvSelected);

  const [page, setPage] = useState(1); 
  const [limit] = useState(LIMIT); 


  useEffect( () => {
    const getTv = async () => {
      const tv = await callEndpoint(tvChanges());
      const tvAdapterData: ITv[] = await tvAdapter(tv);
      dispatch(tvReduce(tvAdapterData));
      const tvShowData = await getTvShow(tvAdapterData);
      dispatch(tvShowReduce(tvShowData));
      if(tvShowData.length){
        dispatch(selectedTvReduce(tvShowData[0]));
      }
    }
    getTv();
  }, []);

  useEffect( () => {
    const changeMoveShow = async () => {
      const tvShowData = await getTvShow(tvState);
      dispatch(tvShowReduce(tvShowData));
    }
    changeMoveShow()
  }, [page]);

  const getTvShow = async (tvAdapterData: ITv[]) => {
    if( !tvAdapterData.length ) return [];
    const start = (limit * (page - 1));
    const end = (limit * (page - 1)) + limit;
    let j = 0;
    let tvShow: ITvDetails[] = [];

    for( let i = start; i < end; i++ ){
      const tvShowResponse = await callEndpoint(tvDetails(tvAdapterData[i].id));
      const tvDetailsAdapterData = tvDetailsAdapter(tvShowResponse);
      tvShow = [...tvShow, tvDetailsAdapterData];
    }
    return tvShow;
  }

  const handleSelectedTv = (tv: ITvDetails) => {
    dispatch(selectedTvReduce(tv));
  }

  const handleBack = () => {
    if(page > 1){
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    const totalPage = Math.ceil(tvState.length / limit);
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

          <Container className="container-tv">
            <Grid container spacing={2}>
              <Grid item xs={12}>   
                <h2>
                  Tv
                </h2>
              </Grid>
              <Grid item xs={12} style={{ padding: "30px 0px"}} >
                {
                  tvShowState.length 
                  ? (
                    <CardComponent 
                      id={tvSelectedState.id}
                      title={tvSelectedState.name}
                      description={tvSelectedState.overview}
                      voteCount={tvSelectedState.voteCount}
                      voteAverage={tvSelectedState.voteAverage}
                      image="https://i.blogs.es/270d91/personajes-de-stan-lee/1366_2000.jpg"
                      height={"200px"}
                      to="/tv/details"
                      details={false}
                      component="tv"
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
                    tvShowState.length 
                    ? (
                      <>
                        {
                          tvShowState.map( (tv, index) => (
                            <Grid item md={4} key={index} className="content-similar-tv"
                              onClick={ () => handleSelectedTv(tv)}
                            >
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
                                to="/tv/details"
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

export default Tv;

