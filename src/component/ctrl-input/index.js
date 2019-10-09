import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CtrlInput = ({ currentValue }) => {
    return <input type="text" className="CtrlInput" value={currentValue} />
}

CtrlInput.propTypes = {
    currentValue: PropTypes.string,
}

CtrlInput.defaultProps = {
    currentValue: '',
}

export default CtrlInput;
