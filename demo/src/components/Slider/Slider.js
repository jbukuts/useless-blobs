import React from 'react';
import './Slider.css';

const Slider = (props) => {
    const {max, min, setter, value, title, step, prefix, suffix } = props;

    return (<div>
        <p><b>{title}</b>: {prefix}{value}{suffix}</p>
        <input
        className='slider'
        title={title}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setter(e.target.valueAsNumber)}
        {...(step && { step })}
        />
    </div>);
};

export default Slider;