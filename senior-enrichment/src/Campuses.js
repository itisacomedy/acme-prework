import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ campuses, students, campusCounts })=> {
    if(!campuses){
        return(
            <div>
                <h2>No Campus Exists</h2>
            </div>
        )
    }
    return (
        <div>
            <h2>All Campuses</h2>
            <ul>
            {
                campuses.map( campus => {
                    return (
                        <li key={ campus.id }>
                            <Link to={`/campuses/${campus.id}`}>{ campus.name }({ campusCounts[campus.id] || '0' })</Link>
                        </li>
                    );
                })
            }
            </ul>
            <p><Link to={'/campuses/create'}>Create A New Campus</Link></p>
        </div>
    );
};

const mapStateToProps = ({ campuses, students })=> {
    const campusCounts = students.reduce((memo, student)=> {
        const id = student.campusId;
        if(!memo[id]){
            memo[id]=0;
        }
        memo[id]++;
        return memo;
    }, {});
    return {
        campusCounts,
        campuses
    };
};

export default connect(mapStateToProps)(Campuses);