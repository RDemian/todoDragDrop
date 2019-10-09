import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BtnsList = ({ children, classes }) => {
    return (
        <div className={`BtnsList ${classes.wrap && classes.wrap}`}>
            {React.Children.map(children, el => el)}
        </div>
    )
}

BtnsList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    classes: PropTypes.object,
}

BtnsList.defaultProps = {
    children: [],
    classes: {}
}

export default BtnsList;
