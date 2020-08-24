import React, { Component } from 'react';

export default ({ input, label, meta: { error, touched } }) => {

    return (
        <div>
            {/* Put all values of input props inside the input element using ... */}
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
}