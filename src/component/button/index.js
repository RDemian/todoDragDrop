import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ name, onClick }) => {
    return (
        <button className="Button" onClick={onClick}>
            { name }
        </button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

Button.defaultProps = {
    onClick: () => {}
}

export default Button;
