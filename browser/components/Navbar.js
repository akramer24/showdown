import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, fetchUserBatters, fetchUserPitchers } from '../reducers';

class Navbar extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    togglePlayersShow() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    toggleTeamsShow() {
        document.getElementById("teamDropdown").classList.toggle("show");
    }

    switchTeams(id) {
        document.getElementById("teamDropdown").classList.toggle("show");
        this.props.loadUser(id);
        this.props.loadUserBatters(id);
        this.props.loadUserPitchers(id);
    }

    render() {
        return (
            <div className="navbar">
                <NavLink to='/' id='nav-home' className='NavLink'>Home</NavLink>
                <div className="dropdown">
                    <button className="dropbtn" onClick={this.togglePlayersShow.bind(this)}>Players
                <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content" id="myDropdown">
                        <NavLink to='/players' className='NavLink' onClick={this.togglePlayersShow.bind(this)}>All</NavLink>
                        <NavLink to='/players/batters' className='NavLink' onClick={this.togglePlayersShow.bind(this)}>Batters</NavLink>
                        <NavLink to='/players/pitchers' className='NavLink' onClick={this.togglePlayersShow.bind(this)}>Pitchers</NavLink>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={this.toggleTeamsShow.bind(this)}>Teams
                <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content" id="teamDropdown">
                    {
                        this.props.users.map(user => {
                            return (
                               <NavLink key={user.id} to={`/team/${user.id}`} className='NavLink' onClick={this.switchTeams.bind(this, user.id)}>{user.teamName}</NavLink>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers() {
            dispatch(fetchUsers());
        },
        loadUser(id) {
            dispatch(fetchUser(id));
        },
        loadUserBatters(id) {
            dispatch(fetchUserBatters(id));
        },
        loadUserPitchers(id) {
            dispatch(fetchUserPitchers(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));