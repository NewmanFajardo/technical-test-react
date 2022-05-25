import { 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Grid, 
  Link, 
  Typography 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { movieDetailsReduce } from "../redux/states/movieDetails";
import { tvDetailsReduce } from "../redux/states/tvDetails";

interface Props {
  id: number
  title: string
  description: string
  voteCount: number
  voteAverage: number
  height: string
  image: string
  style?: React.CSSProperties
  className?: string
  to?: string
  details: boolean
  component: string
}

export function CardComponent( props: Props) {
  const dispatch = useDispatch();

  const handleGoToDetails = () => {
    if(props.component.toLowerCase() === "movie"){
      dispatch(movieDetailsReduce(props));
    }
    
    if(props.component.toLowerCase() === "tv"){
      dispatch(tvDetailsReduce(props));
    }
  }

  return (
    <Grid item xs={12} >
      <Card>
        <CardActionArea>
          <CardMedia
              component="img"
              height={props.height}
              image={props.image}
              alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className={props.className} >
            {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={props.style}>
            {props.description}
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
            vote count: {props.voteCount}
          </Typography>

          <Typography>
            vote average: {props.voteAverage}
          </Typography>
        </CardActions>
        
        {
          !props.details
          ? (
            <CardActions 
              disableSpacing
            >
              <Link
                component={RouterLink}
                to={props.to ?? ""}
                variant="h6"
                color="inherit"
                noWrap
                underline="none"
                sx={{ mr: "auto" }}
                style={{
                  display: "flex"
                }}
                onClick={() => handleGoToDetails()}
              >
                Details
              </Link>
            </CardActions>
          )
          :
          ( <></> )
        }
        
      </Card>
    </Grid>
  );
}
