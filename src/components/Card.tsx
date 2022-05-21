import { 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography 
} from "@mui/material";

interface Props {
    title: string
    description: string
    voteCount: number
    voteAverage: number
    height: string
    image: string
    style?: React.CSSProperties
    className?: string
}

export function CardComponent( props: Props) {
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
      </Card>
    </Grid>
  );
}
