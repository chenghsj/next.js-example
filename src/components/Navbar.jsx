import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Navbar() {
  // const styles = {
  //   display: "flex",
  //   background: "gray",
  //   justifyContent: "space-between",
  //   padding: "1rem",
  //   a: {
  //     color: "white",
  //     textDecoration: "none",
  //   },
  // };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about">
            <Button color="inherit">About</Button>
          </Link>
          <Link href="/contact">
            <Button color="inherit">Contact</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
