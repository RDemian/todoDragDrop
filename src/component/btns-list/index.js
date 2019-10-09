import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BtnsList = ({ children }) => {
    return (
        <div className="BtnsList">
            {React.Children.map(children, el => el)}
        </div>
    )
}

BtnsList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
}

BtnsList.defaultProps = {
    children: [],
}

export default BtnsList;
