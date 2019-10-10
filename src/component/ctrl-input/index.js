import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CtrlInput = ({ currentValue, onChange }) => {
    return <input type="text" className="CtrlInput" value={currentValue} onChange={onChange}/>
}

CtrlInput.propTypes = {
    currentValue: PropTypes.string,
}

CtrlInput.defaultProps = {
    currentValue: '',
}

export default CtrlInput;
