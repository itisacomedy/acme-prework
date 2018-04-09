import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ campuses, students })=> {
    return (
        <div>
            <h2>All Students</h2>
            <ul>
            {
                students.map( student => {
                    return (
                        <li key={ student.id }>
                            <Link to={`/students/${student.id}`}>{ student.firstName } { student.lastName }</Link>
                        </li>
                    );
                })
            }
            </ul>
            <p><Link to={'/students/create'}>Create A New Student</Link></p>
        </div>
    );
};

const mapStateToProps = ({ students })=> {
    return {
        students
    };
};

export default connect(mapStateToProps)(Students);