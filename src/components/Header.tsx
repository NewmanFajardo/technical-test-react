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
          to="/"
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

      </Toolbar>
    </AppBar>
  );
}
