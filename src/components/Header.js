import {
    AppBar,
    Badge,
    Grid,
    IconButton,
    InputBase,
    makeStyles,
    Toolbar,
  } from "@material-ui/core";
  import React from "react";
  import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
  import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
  import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
  import SearchIcon from "@material-ui/icons/Search";
  
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#fff",
      transform:'translateZ(0)'
    },
    searchInput: {
      opacity: "0.6",
      padding: `0px ${theme.spacing(1)}px`,
      fontSize: "0.8rem",
      //Text search
      "&:hover": {
        backgroundColor: theme.spacing(1),
      },
      //Icon search
      "& .MuiSvgIcon-root": {
        marginRight: "8px",
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
  //   btnRoot: {
  //     backgroundColor: "green",
  //   },
  //   btnLabel: {
  //     backgroundColor: "red",
  //   },
  }));
  
  export default function Header() {
    const classes = useStyles();
  
    return (
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item>
                <InputBase
                  placeholder="Search topics"
                  className={classes.searchInput}
                  startAdornment={<SearchIcon fontSize="small"></SearchIcon>}
                ></InputBase>
              </Grid>
              <Grid item sm></Grid>
              <Grid item>
                {/* <IconButton classes={{root:classes.btnRoot, label:classes.btnLabel}}> */}
                <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsNoneIcon fontSize="small"></NotificationsNoneIcon>
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge badgeContent={3} color="primary">
                    <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge>
                    <PowerSettingsNewIcon></PowerSettingsNewIcon>
                  </Badge>
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  