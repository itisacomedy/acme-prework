import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ campuses, students })=> {
    return (
        <ul>
            <li>
                <Link to='/'>
                    Home
                </Link>
            </li>
            
            <li>
                <Link to='/campuses'>
                    Campuses ({ campuses.length } campuses)
                </Link>
            </li>

            <li>
                <Link to='/students'>
                    Students ({ students.length } students)
                </Link>
            </li>


        </ul>
    );
};

const mapStateToProps = ({ campuses, students })=> {
    return {
        campuses,
        students
    };
};

export default connect(mapStateToProps)(Nav);