import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';
// import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',    
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListUpcomingMovies: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',    
    transform: 'translateZ(0)',
    width: '100%'
    },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

function UpcomingMovies(props ) {
    const { classes } = props;    
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8085/api/v1/movies")
          .then((response) => setData(response.data.movies));
      }, []);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridListUpcomingMovies} cols={6} cellHeight={350} >
        {data.map((tile) => {

           return ( 
          <GridListTile key={tile.img}>
            <img src={tile.poster_url} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
            </GridListTile>
           );
          })}
      </GridList>
    </div>
  );
}

UpcomingMovies.propTypes = {
  classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(UpcomingMovies);