import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ name }) => {
    return (
        <button className="Button">
            { name }
        </button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Button;
