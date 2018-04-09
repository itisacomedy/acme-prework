import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus, deleteCampus } from './store';

class CampusCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: ''
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    onSave(ev){
        ev.preventDefault();
        const campus = { name: this.state.name };
        this.props.saveCampus(campus)
    }
    onChangeName(ev){
        this.setState({ name: ev.target.value });
    }
    onChangeDescription(ev){
        this.setState({ description: ev.target.value });
    }
    render(){
        const { name } = this.state;
        const { onChangeName, onChangeDescription, onSave } = this;
        return (
            <div>
                <h1>Create A New Campus</h1>
                <form onSubmit={ onSave }>
                    <input placeholder = 'Enter a Campus Name' value={ name } onChange={ onChangeName }/>
                    <input placeholder = 'Enter Description' value={ name } onChange={ onChangeDescription }/>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, { history })=> {
    return {
        saveCampus: (campus)=> dispatch(saveCampus(campus, history))
    };
};

export default connect(null, mapDispatchToProps)(CampusCreate);