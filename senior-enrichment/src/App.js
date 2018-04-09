//Set up smart component

import React, { Component } from 'react';
import Nav from './Nav';
import { loadCampuses, loadStudents } from './store';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Campuses from './Campuses';
import Students from './Students';
import Campus from './Campus';
import CampusCreate from './CampusCreate';
import Student from './Student';
import StudentCreate from './StudentCreate';

class App extends Component{
    componentDidMount(){
        this.props.loadCampuses();
        this.props.loadStudents();
    }
    render(){
        return (
            <Router>
            <div>
                <Nav />
                <Route path='/' exact component={ Home } />
                <Route path='/campuses' exact component={ Campuses } />
                <div>
                    <Switch>
                        <Route path='/campuses/create' exact render={({ history })=> <CampusCreate history={ history }/> } />
                        <Route path='/campuses/:id' exact render={({ match, history })=> <Campus id={ match.params.id*1 } history={ history }/> }/>
                    </Switch>
                </div>
                <Route path='/students' exact component={ Students } />
                <div>
                    <Switch>
                        <Route path='/students/create' exact render={({ history })=> <StudentCreate history={ history }/> } />
                        <Route path='/students/:id' exact render={({ match, history })=> <Student id={ match.params.id*1 } history={ history }/> } />
                    </Switch>
                </div>
            </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        loadCampuses: ()=> dispatch(loadCampuses()),
        loadStudents: ()=> dispatch(loadStudents())
    };
};

export default connect(null, mapDispatchToProps)(App);
