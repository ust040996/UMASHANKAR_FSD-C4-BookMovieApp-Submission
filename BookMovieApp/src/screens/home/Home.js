import React, { useState, Fragment, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import ReleasedMovies from "./ReleasedMovies";
import UpcomingMovies from "./UpcomingMovies";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import axios from 'axios';

import {
    Card,
    CardContent,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Checkbox,
    Button,
  } from "@material-ui/core";


const Home = (props) => {

const [data, setData] = useState([]);

const [genres, setGenres] = useState([]);
const [genreChoice, setGenreChoice] = useState([]);
const [checked, setChecked] = useState(false);
const [artists, setArtists] = useState([]);
const [artistChoice, setArtistChoice] = useState([]);       

const handleChange = (event) => {
    setGenreChoice(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtistChoice(event.target.value);
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setGenreChoice(value);
  };

  const handleChangeArtistMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArtistChoice(value);
  };


useEffect(() => {
  axios
    .get("http://localhost:8085/api/v1/movies")
    .then((response) => setData(response.data.movies));

  axios
    .get("http://localhost:8085/api/v1/genres")
    .then((response) => setGenres(response.data.genres));

  axios
    .get("http://localhost:8085/api/v1/artists")
    .then((response) => setArtists(response.data.artists));
}, []);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

    return (  
        <Fragment>
        <div className="Home">
            <Header />  
          <div className="FirstSection">
            <div className="upcomingMoviesHeading">
              <span>Upcoming Movies</span>
            </div>
            <div className="UpcomingMovies">
              <UpcomingMovies />
            </div>
        </div>    
        <div className="SecondSection">
          <div className="ReleasedMovies">        
              <ReleasedMovies />
          </div>
          <div className="FilterForm">
          <Card>
            <CardContent>
              <InputLabel style={{ color: "#4791db" }}>
                FIND MOVIES BY:
              </InputLabel>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField id="standard-basic" label="Movie Name" />
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel id="demo-mutiple-name-label">Genres</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={genreChoice}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox color="primary" />
                      {genre.genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel id="demo-mutiple-name-label">Artists</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={artistChoice}
                  onChange={handleArtistChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox color="primary" />
                      {artist.first_name + " " + artist.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField
                  name="Release Date Start"
                  id="standard-basic"
                  type="date"
                  label="Release Date Start"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField
                  name="Release Date End"
                  id="standard-basic"
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <div>
                <FormControl style={{ width: "100%", marginTop: "20px" }}>
                  <Button variant="contained" name="Apply" color="primary">
                    Apply
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

      </div>
    </Fragment>      
    )
};

export default Home;
// export default Home;