import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import "./ReleasedMovies.css";
import axios from 'axios';

const styles = theme => ({
  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
  },
  gridListReleaseMovies: {
      display: 'flex',
      justifyContent: 'center',
      transform: 'translateZ(0)',
      cursor: 'pointer'
  },
  title: {
      color: theme.palette.primary.light,
  }
});


function ReleasedMovies( props ) {

  const { classes } = props;    
  const [data, setData] = useState([]);

  useEffect(() => {
      axios
        .get("http://localhost:8085/api/v1/movies")
        .then((response) => setData(response.data.movies));
    }, []);
  
  return (
    <div className={classes.root}>
      <GridList className="gridListReleaseMovies" cols={4} cellHeight={350}>
        {data.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();
          return (
            <GridListTile className="GridListReleaseMoviesTile" key={tile.img}>
              <Link to={"/movie-details/" + tile.id}>
                <img src={tile.poster_url}
                  alt={tile.title}
                  classes={{
                    root: classes.root,
                    title: classes.title,
                  }}
                />
                <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`}
                    className="icon" /> }      />
              </Link>              
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );  
}

ReleasedMovies.propTypes = {
  classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(ReleasedMovies);