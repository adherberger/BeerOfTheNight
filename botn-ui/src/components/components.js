import React from 'react';

export const StateInput = ({
    id,
    title,
    stateVar,
    setStateVar,
    ...props
}) => {
    return (
        <div className="botn-input">
            {
                title ?
                    <label htmlFor={id} className="text-input-label">{title}</label>
                    : <></>
            }
            <input
                id={id}
                className="text-input"
                value={stateVar}
                onChange={(e) => { setStateVar(e.target.value) }}
                {...props}
            />
        </div>
    );
}

export const MainButton = ({text, onClick, disabled}) => {
    return (
        <div className="bar bottom-bar">
            <div className="flex-spacer">
                <button className="big-button" disabled={disabled} onClick={() => { onClick(); }}>{text}</button>
            </div>
        </div>
    )
}