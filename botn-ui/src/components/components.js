import React from 'react';
import { IconContext } from 'react-icons';

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
                <div className="text-input-label">
                    <label htmlFor={id}>{title}</label>
                </div>
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

export const SecondaryButton = ({text, onClick, disabled, ...props}) => {
    return (
        <div className="secondary-button-container">
            <button className="secondary-button" onClick={onClick} disabled={disabled} {...props}>
                {text}
            </button>
        </div>
    )
}

export const BigIconWithMessage = ({title, subtitle, icon}) => {
    return (
        <div className="big-icon-with-message">
            <IconContext.Provider value={{className: "big-icon"}}>
                {icon}
            </IconContext.Provider>
            <div className="title">
                {title}
            </div>
            <div className="subtitle">
                {subtitle}
            </div>
        </div>
    )
}