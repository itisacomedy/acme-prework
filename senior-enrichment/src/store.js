import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//store.js
import loggerMiddleware from 'redux-logger';

const SET_CAMPUSES = 'SET_CAMPUSES';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

const SET_STUDENTS = 'SET_STUDENTS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';

const campusesReducer = (state = [], action)=> {
    switch(action.type){
        case SET_CAMPUSES:
            state = action.campuses;
            break;
        case UPDATE_CAMPUS:
            state = state.map( campus => campus.id === action.campus.id ? action.campus : campus);
            break;
        case DELETE_CAMPUS:
            state = state.filter( campus => campus.id !== action.campus.id);
            break;
        case CREATE_CAMPUS:
            state = [...state, action.campus];
            break;
    }
    return state;
};

const studentsReducer = (state = [], action)=> {
    switch(action.type){
        case SET_STUDENTS:
            state = action.students;
            break;
        case UPDATE_STUDENT:
            state = state.map( student => student.id === action.student.id ? action.student : student);
            break;
        case DELETE_STUDENT:
            state = state.filter( student => student.id !== action.student.id);
            break;
        case CREATE_STUDENT:
            state = [...state, action.student];
            break;
    }
    return state;
};

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
});

const loadCampuses = ()=> {
    return (dispatch)=> {
        return axios.get('/api/campuses')
            .then(result => result.data)
            .then(campuses => dispatch({
                type: SET_CAMPUSES,
                campuses
            }));
    }
};

const loadStudents = ()=> {
    return (dispatch)=> {
        return axios.get('/api/students')
            .then(result => result.data)
            .then(students => dispatch({
                type: SET_STUDENTS,
                students
            }));
    }
};

const saveCampus = (campus, history)=> {
    if(campus.id){
        return (dispatch)=> {
            return axios.put(`/api/campuses/${campus.id}`, campus)
                .then(result => result.data)
                .then(campus => dispatch({
                    type: UPDATE_CAMPUS,
                    campus
                    })
                )
                .then(()=> {
                    history.push('/campuses');
                });
        }
    }
    return (dispatch)=> {
        return axios.post('/api/campuses/', campus)
            .then(result => result.data)
            .then(campus => dispatch({
                type: CREATE_CAMPUS,
                campus
                })
            )
            .then(()=> {
                history.push('/campuses');
            });
    }
    
};

const saveStudent = (student, history)=> {
    if(student.id){
        return (dispatch)=> {
            return axios.put(`/api/students/${student.id}`, student)
                .then(result => result.data)
                .then(student => dispatch({
                    type: UPDATE_STUDENT,
                    student
                    })
                )
                .then(()=> {
                    history.push('/students');
                });
        }
    }
    return (dispatch)=> {
        return axios.post(`/api/students`, student)
            .then(result => result.data)
            .then(student => dispatch({
                type: CREATE_STUDENT,
                student
                })
            )
            .then(()=> {
                history.push('/students');
            });
    }
    
};

const deleteCampus = (campus, history)=> {
    return (dispatch)=> {
        return axios.delete(`/api/campuses/${campus.id}`)
            .then(() => dispatch({
                type: DELETE_CAMPUS,
                campus
                })
            )
            .then(()=> {
                history.push('/campuses');
            });
    }
};

const deleteStudent = (student, history)=> {
    return (dispatch)=> {
        return axios.delete(`/api/students/${student.id}`)
            .then(() => dispatch({
                type: DELETE_STUDENT,
                student
                })
            )
            .then(()=> {
                history.push('/students');
            });
    }
};

const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

export default store;

export { loadCampuses, loadStudents, saveCampus, saveStudent, deleteCampus, deleteStudent };