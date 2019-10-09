import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BtnsList = ({ children }) => {
    return (
        <div className="BtnsList">
            {children.map(el => el)}
        </div>
    )
}

BtnsList.propTypes = {
    children: PropTypes.array,
}

BtnsList.defaultProps = {
    children: [],
}

export default BtnsList;
