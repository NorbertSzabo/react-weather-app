import React from 'react';

const SwithCelsiusFarrenheit = (props) => (
    <div>
        <input
            type="radio"
            name="scale"
            value="C"
            onChange={(e) => props.handleScaleChange(e.target.value)}/>
        &#176;C

        <input
            type="radio"
            name="scale"
            value="F"
            onChange={(e) => props.handleScaleChange(e.target.value)}
        /> &#176;F
    </div>
);

SwithCelsiusFarrenheit.defaultProps = {
    selectedScale: 'C',
    handleScaleChange: () => {
    }
};

export default SwithCelsiusFarrenheit;