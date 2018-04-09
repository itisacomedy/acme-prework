import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent, deleteStudent, saveCampus } from './store';

class StudentCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            campusId: 1
        };
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.setCampus = this.setCampus.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    onSave(ev){
        ev.preventDefault();
        const student = { firstName: this.state.firstName, lastName: this.state.lastName, campusId: this.state.campusId };
        this.props.saveStudent(student);
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
    render(){
        const { campuses } = this.props;
        const { firstName, lastName, campusId } = this.state;
        const { onChangeFirstName, onChangeLastName, setCampus, onSave } = this;
        return (
            <div>
                <h1>Create A New Student</h1>
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
                    <button>Create</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ campuses })=> {
    return {
        campuses
    };
};

const mapDispatchToProps = (dispatch, { history })=> {
    return {
        saveStudent: (student)=> dispatch(saveStudent(student, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);