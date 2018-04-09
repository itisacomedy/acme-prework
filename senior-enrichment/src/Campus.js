import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus, deleteCampus } from './store';
import { Link } from 'react-router-dom';

class Campus extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.campus ? this.props.campus.name : ''
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(){
        this.props.deleteCampus({ id: this.props.id });
    }
    onSave(ev){
        ev.preventDefault();
        const campus = { id: this.props.id, name: this.state.name };
        this.props.saveCampus(campus)
    }
    onChangeName(ev){
        this.setState({ name: ev.target.value });
    }
    componentWillReceiveProps(nextProps){
        this.setState({ name: nextProps.campus ? nextProps.campus.name : ''})
    }
    render(){
        const { campus, students } = this.props;
        const { name } = this.state;
        const { onChangeName, onSave, onDelete } = this;
        if(!campus){
            return null;
        }
        return (
            <div>
                <h1>{ campus.name }</h1>
                <form onSubmit={ onSave }>
                    <input value={ name } onChange={ onChangeName }/>
                    <button>Update</button>
                </form>
                <button onClick={ onDelete }>Delete</button>
                <ul>
                {
                    students.map( student => {
                        return (
                            <li key={ student.id }>
                                { student.firstName } { student.lastName}
                            </li>
                        );
                    })
                }
                </ul>
                <p><Link to={'/students/create'}>Create A New Student</Link></p>
            </div>
        );
    }
}

const mapStateToProps = ({ campuses, students }, { id })=> {
    const campus = campuses.find( campus => campus.id === id );
    const filtered = students.filter( student => student.campusId === id );
    console.log(campus)
    return {
        campus,
        students: filtered
    };
};

const mapDispatchToProps = (dispatch, { history })=> {
    return {
        saveCampus: (campus)=> dispatch(saveCampus(campus, history)),
        deleteCampus: (campus)=> dispatch(deleteCampus(campus, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);


