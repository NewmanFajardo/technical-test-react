import { AppBar, Avatar, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import icon from "./../assets/logo-movie.png";

export function Header() {
  return (
    <AppBar
      position="fixed"
      color="primary"
    >
      <Toolbar>
        <Link
          component={RouterLink}
          to="/movie"
          variant="h6"
          color="inherit"
          noWrap
          underline="none"
          sx={{ mr: "auto" }}
          style={{
            display: "flex"
          }}
        >
          <Avatar alt="Remy Sharp" src={icon} />
          <Typography ml={1} mt={1}>NF</Typography>
        </Link>

        <span 
          style={{
            display: "flex",
          }}
        >
          <Link
            component={RouterLink}
            to="/tv"
            variant="h6"
            color="inherit"
            noWrap
            underline="none"
            sx={{ mr: "auto" }}
            style={{
              display: "flex",
              borderRight: "1px solid #ccc",
              paddingRight: "10px"
            }}
          >
            <Typography ml={1} mt={1}>TV</Typography>
          </Link>

          <Link
            component={RouterLink}
            to="/movie"
            variant="h6"
            color="inherit"
            noWrap
            underline="none"
            sx={{ mr: "auto" }}
            style={{
              display: "flex"
            }}
          >
            <Typography ml={1} mt={1}>MOVIE</Typography>
          </Link>
        </span>

      </Toolbar>
    </AppBar>
  );
}
