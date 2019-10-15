import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ name, onClick, disabled }) => {
    return (
        <button className="Button" onClick={onClick} disabled={disabled}>
            { name }
        </button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    onClick: () => {},
    disabled: false,
}

export default Button;
