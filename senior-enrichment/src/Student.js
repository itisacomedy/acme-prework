import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent, deleteStudent } from './store';
import { Link } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: this.props.student ? this.props.student.firstName : '',
            lastName: this.props.student ? this.props.student.lastName: '',
            campusId: this.props.student ? this.props.student.campusId: 1,
        };
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.setCampus = this.setCampus.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(){
        this.props.deleteStudent({ id: this.props.id });
    }
    onSave(ev){
        ev.preventDefault();
        const student = { id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, campusId: this.state.campusId };
        this.props.saveStudent(student)
    }
    onChangeFirstName(ev){
        this.setState({ firstName: ev.target.value });
    }
    onChangeLastName(ev){
        this.setState({ lastName: ev.target.value });
    }
    setCampus(ev){
        this.setState({ campusId: ev.target.value });
    }
    componentWillReceiveProps(nextProps){
        this.setState({ name: nextProps.student ? nextProps.student.name : '', campusId: nextProps.student ? nextProps.student.campusId : 1})
    }
    render(){
        const { student, campus, campuses } = this.props;
        const { firstName, lastName, campusId } = this.state;
        const { onChangeFirstName, onChangeLastName, setCampus, onSave, onDelete } = this;
        if(!student){
            return null;
        } else {
            if (!campus){
                return (
                    <div>
                        <h1>{ student.name } at Unknown Campus</h1>
                        <form onSubmit={ onSave }>
                            <input placeholder = 'First Name' value={ firstName } onChange={ onChangeFirstName }/>
                            <input placeholder = 'Last Name' value={ lastName } onChange={ onChangeLastName }/>
                            <select value={ campusId } onChange={ setCampus }>
                                {
                                    campuses.map( campus => {
                                        return (
                                            <option value={ campus.id }>{ campus.name }</option>
                                        )
                                    })
                                }
                            </select>
                            <button>Update</button>
                        </form>
                        <button onClick={ onDelete }>Delete</button>
                    </div>
                );
            }
            return (
                <div>
                    <h1>{ student.name } at <Link to={`/campuses/${campus.id}`}>{ campus.name }</Link> campus</h1>
                    <form onSubmit={ onSave }>
                        <input placeholder = 'First Name' value={ firstName } onChange={ onChangeFirstName }/>
                        <input placeholder = 'Last Name' value={ lastName } onChange={ onChangeLastName }/>
                        <select value={ campusId } onChange={ setCampus }>
                            {
                                campuses.map( campus => {
                                    return (
                                        <option value={ campus.id }>{ campus.name }</option>
                                    )
                                })
                            }
                        </select>
                        <button>Update</button>
                    </form>
                    <button onClick={ onDelete }>Delete</button>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ students, campuses }, { id })=> {
    const student = students.find( student => student.id === id );
    const campus = campuses.find( campus => campus.id === student.campusId );
    console.log(student);
    console.log(campus);
    return {
        student,
        campus, 
        campuses
    };
};

const mapDispatchToProps = (dispatch, { history })=> {
    return {
        saveStudent: (student)=> dispatch(saveStudent(student, history)),
        deleteStudent: (student)=> dispatch(deleteStudent(student, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);