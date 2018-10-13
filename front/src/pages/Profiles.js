import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {inject, observer} from "mobx-react/index";
import List from "@material-ui/core/List/List";
import {ClipLoader} from 'react-spinners';
import LoadingDiv from "../common/LoadingDiv";
import Typography from "@material-ui/core/Typography/Typography";
import {WideContent} from "../common/Content";
import ProfileListItem from "../common/ProfileListItem";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  paperContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  submitRow: {
    textAlign: 'right',
  },
});


@withStyles(styles, { withTheme: true })
@inject('portalStore') @observer
class Profiles extends React.Component {

  state = {
    profiles: [],
    loading: true,
  };

  componentDidMount(){
    this.setStateFromStore();
  }

  setStateFromStore = () => {
    this.props.portalStore.fetchProfiles().then(
      (data) => {
        this.setState({
          profiles: data,
          loading: false,
        });
      },
      () => {
        this.setState({
          profiles: [],
          loading: false,
        })

      }
    );
  };

  profiles_list() {
    if(this.state.profiles){
      return this.state.profiles.map(profile => <ProfileListItem profile={profile} history={this.props.history}/>)
    }
  }

  render() {

    const {classes} = this.props;

    return (
      <WideContent>
        <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="title">
                  League players
                </Typography>
                {this.state.loading ? (
                  <LoadingDiv>
                    <ClipLoader color={'#FFDE00'} loading={this.state.loading}  />
                  </LoadingDiv>
                )
                : (
                  <List>
                    { this.profiles_list() }
                  </List>
                )}
              </Grid>
            </Grid>
        </form>
      </WideContent>
    );
  }
}

export default Profiles;
