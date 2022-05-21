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
import { tvDetailsAdapter, tvAdapter, tvSimilarsAdapter } from '../../adapters/tv.adapter';
import { useFetchAndLoad } from '../../hooks';
import { createTv } from '../../redux/states/tv';
import { AppStore } from '../../redux/store';
import { tvChanges, tvDetails, tvSimilar } from '../../services/tv.service';
import ImageIcon from '@mui/icons-material/Image';
import { ITv } from '../../models/tv.model';
import './style/tv.scss';
import { selectedTv } from '../../redux/states/tvSelected';
import { Loader } from './../../components/Loader';
import { createTvDetails } from '../../redux/states/tvDetails';
import { createTvSimilar } from '../../redux/states/tvSimilar';
import imageDefault from './../../assets/default-movie.webp';

export const Tv = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const tvState = useSelector((store: AppStore) => store.tv);
  const tvSelectedState = useSelector((store: AppStore) => store.tvSelected);
  const tvDetailsState = useSelector((store: AppStore) => store.tvDetails);
  const tvSimilarState = useSelector((store: AppStore) => store.tvSimilar);
  
  useEffect( () => {
    const geTv = async () => {
      const tv = await callEndpoint(tvChanges());
      dispatch(createTv(tvAdapter(tv)));
    }
    geTv();
  }, []);

  useEffect( () => {
    const geTvDetails = async () => {
      const tvDetailsResponse = await callEndpoint(tvDetails(tvSelectedState.id));
      const tvSimilarResponse  = await callEndpoint(tvSimilar(tvSelectedState.id));
      dispatch(createTvDetails(tvDetailsAdapter(tvDetailsResponse)));
      dispatch(createTvSimilar(tvSimilarsAdapter(tvSimilarResponse)));
    }
    geTvDetails(); 
  }, [tvSelectedState])

  const handleSelectedTv = (tv: ITv) => {
    dispatch(selectedTv(tv));
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}>
              <div className='content-list-tv'>
                <List 
                  sx={{ width: '100%' }}
                  subheader={<ListSubheader><h2>Tv</h2></ListSubheader>}
                >
                  {
                    tvState.map( (tv: ITv) => (
                      <div key={tv.id} onClick={ () => handleSelectedTv(tv) }>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={tv.id} secondary={!tv.adult ? "All public" : "Adult"} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ) )
                  }
                </List>
              </div>
            </Grid>

            <Grid item xs={6} sm={8} style={{ padding: "30px"}}>
              { (tvSelectedState.id !== 0 && tvDetailsState.name.length) && (
                  <Grid item xs={12} style={{ padding: "30px 0px"}}>
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
                            {tvDetailsState.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {tvDetailsState.overview}
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
                          vote count: {tvDetailsState.voteCount}
                        </Typography>

                        <Typography>
                          vote average: {tvDetailsState.voteAverage}
                        </Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }

              <Grid container spacing={2} className="content-similar-tv">
                {
                  (tvSelectedState.id !== 0 && tvSimilarState.length) && (<>
                    {
                      tvSimilarState.map((tv, index) => (
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
                                <Typography gutterBottom variant="h5" component="div" className='title' title={tv.name}>
                                  {tv.name}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  style={{
                                    height: "120px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {tv.overview}
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
                                vote count: {tv.voteCount}
                              </Typography>

                              <Typography>
                                vote average: {tv.voteAverage}
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

export default Tv;

