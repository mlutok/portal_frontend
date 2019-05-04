import {inject, observer} from "mobx-react";
import React, {Fragment} from "react";
import Spinner from "../common/LoadingDiv";
import Games from "./Games";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import Link from "react-router-dom/es/Link";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";


const styles = (theme) => ({
  root: {
    padding: '10px 24px',
  },
  header: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 24,
  },
  info: {
    marginBottom: 12,
  },
  infoParagraph: {
  },
  listFilters: {
  },
});

@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class FutureGamesList extends React.Component {

  state = {
    loading: true,
    games: null,
    displayEmptyGames: false,
    displayFullGames: false,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetchFuture().then((games) => {
      this.setState({
        games: games,
        loading: false,
        displayEmptyGames: this.props.portalStore.currentUser.isDM,
      })
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <div className={classes.root}>
          <Typography variant='h5' className={classes.header}>
            Incoming game sessions
          </Typography>
          <Typography variant='body1' className={classes.info}>
            Below you can see a list of the game slots for sessions that will be played in the near future. As a player you can pick any available slot with a DM and Adventure to sign up for a game. As a DM you can pick Empty Game Slots and book your game session there.
          </Typography>
          <FormGroup row className={classes.listFilters}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.displayEmptyGames}
                  onChange={this.handleChange('displayEmptyGames')}
                  value="displayEmptyGames"
                  color='secondary'
                />
              }
              label="Display empty game slots"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.displayFullGames}
                  onChange={this.handleChange('displayFullGames')}
                  value="displayFullGames"
                  color='secondary'
                />
              }
              label="Display full game slots"
            />
          </FormGroup>
          <Games list={this.state.games}
                 displayEmpty={this.state.displayEmptyGames}
                 displayFull={this.state.displayFullGames}
          />
        </div>
      )
  }
}


@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class PastGamesList extends React.Component {

  state = {
    loading: true,
    games: null,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetchPast().then((games) => {
      this.setState({
        games: games,
        loading: false,
      })
    })
  }

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <div className={classes.root}>
          <Typography variant='h5' className={classes.header}>
            Games archive
          </Typography>
          <Typography variant='body1'>
            All ended games are listed here. We do not list empty, unused slots. Also remember that you cannot sign out
            of the ended game as a player or cancel booking on the slot that you already run as a Dungeon Master.
          </Typography>
          <Games list={this.state.games} />
        </div>
      )
  }
}



@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class GamesList extends React.Component {

  state = {
    loading: true,
    games: null,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetch().then((games) => {
      this.setState({
        games: games,
        loading: false,
      })
    })
  }

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <Fragment>
          <Typography variant='h5' className={classes.header}>
            All game sessions
          </Typography>
          <Games list={this.state.games} />
        </Fragment>
      )
  }
}


@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class CurrentUserGamesList extends React.Component {

  state = {
    loading: true,
    games: null,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetchFutureForCurrentUser().then((games) => {
      this.setState({
        games: games,
        loading: false,
      })
    })
  }

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <Fragment>
          <Typography variant='h4' component="h1" className={classes.header}>
            Your next games
          </Typography>
          {this.state.games.length ? (
            <Fragment>
              <Typography variant='body1'>
                Below we have listed the next game sessions your have signed up for.
              </Typography>
              <Games list={this.state.games} />
            </Fragment>
          ) : (
            <Typography className={classes.infoParagraph} variant='body1'>
              You are not playing any game soon. <Link to='/games'>Check incoming games</Link> to join one.<br/>
            </Typography>
          )}

        </Fragment>
      )
  }
}


@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class CurrentDMGamesList extends React.Component {

  state = {
    loading: true,
    games: null,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetchFutureForCurrentDM().then((games) => {
      this.setState({
        games: games,
        loading: false,
      })
    })
  }

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <Fragment>
          <Typography variant='h4' component="h1" className={classes.header}>
            The next games you run
          </Typography>
          {this.state.games.length ? (
            <Fragment>
              <Typography variant='body1'>
                Below we have listed next games you have booked to run as a Dungeon Master.
              </Typography>
              <Games list={this.state.games} />
            </Fragment>
          ) : (
            <Typography variant='body1' className={classes.infoParagraph}>
              As a DM you are not running any game yet. <Link to='/games'>Check available slots</Link> to run one.
            </Typography>
          )}

        </Fragment>
      )
  }
}


@withStyles(styles, {withTheme: true})
@inject('portalStore') @observer
export class DMNotReportedGamesList extends React.Component {

  state = {
    loading: true,
    games: null,
  };

  componentDidMount(){
    this.setState({
      loading: true,
    });
    this.props.portalStore.games.fetchNotReportedForCurrentDM().then((games) => {
      this.setState({
        games: games,
        loading: false,
      })
    })
  }

  render(){
    const {classes} = this.props;
    if(this.state.loading)
      return (
          <Spinner loading={this.state.loading} />
        );
    else
      return (
        <Fragment>
          <Typography variant='h4' component="h1" className={classes.header}>
            Games awaiting your report
          </Typography>
          <Typography variant="body1" className={classes.info}>
            After each game you run as a Dungeon Master, you are obligated to fill out the report on the players that
            were attending your game session. Below you will find games that you haven't reported yet.
          </Typography>
          {this.state.games.length ? (
            <Games list={this.state.games} />
          ) : (
            <Typography variant='body1' className={classes.infoParagraph}>
              <strong>All good.</strong> No game to report.
            </Typography>
          )}

        </Fragment>
      )
  }
}