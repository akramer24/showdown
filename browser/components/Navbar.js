import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../reducers';

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
                                <NavLink key={user.id} to={`/team/${user.id}`} className='NavLink' onClick={this.toggleTeamsShow.bind(this)}>{user.teamName}</NavLink>
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
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));