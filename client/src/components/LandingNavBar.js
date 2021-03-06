import React from 'react';
import '../css/App.css';
import '../css/Generic.css';
import LoginSideBar from './LoginSideBar';
import {storeLocation} from '../_actions/userActions';
import { connect } from "react-redux";

class LandingNavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sideNavbarVisible: false,
      location : ''
    };

    this.loadSideNavBar = this.loadSideNavBar.bind(this);
    this.collapseSidebar = this.collapseSidebar.bind(this);
    this.searchByLocation = this.searchByLocation.bind(this);
  }

  loadSideNavBar() {
    this.setState({sideNavbarVisible: !this.state.sideNavbarVisible})
  }

  collapseSidebar() {
    this.setState({ sideNavbarVisible: false })
  }

  searchByLocation(event){
    if(event.key === 'Enter'){
      localStorage.setItem('location',this.state.location);
      this.props.setLocation(this.state.location);
      if(this.props.changedLocation){
        this.props.changedLocation(this.state.location);
      }
      else{
          window.location.href="/";
      }
    }
  }

  componentDidMount(){
      if(localStorage.getItem('location')){
          this.setState({
              location : localStorage.getItem('location')
          })
      }
  }

  render() {
    return (
      <div className="landing_page">
        <div>
          {this.state.sideNavbarVisible === true ? <LoginSideBar collapseSidebar={this.collapseSidebar} /> : null}
        </div>
        <div className="navbar">
          <span className="hamburger" onClick={this.loadSideNavBar}>&#9776;</span>
          <a href="/">
            <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
          </a>
          <input type="text" placeholder="Enter your Location" value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })} className="location_input" onKeyDown={this.searchByLocation}></input>
          <a href="/userLogin"><button className="button" id="signin_btn" href="/userLogin">Sign In</button></a>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLocation : location => dispatch(storeLocation(location))
    }
}

export default connect(null, mapDispatchToProps)(LandingNavBar);
