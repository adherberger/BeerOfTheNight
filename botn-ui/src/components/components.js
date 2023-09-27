import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import '../styles/modal.css';

export const MainPage = ({
    title,
    children
}) => {
    return (
        <>
            <div className="main-page">
                {
                    title ?
                    <div className="main-page-title">
                        <h2>{title}</h2>
                    </div> :
                    <></>
                }
                {children}
            </div>
        </>
    )
}

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
        <button className="secondary-button" onClick={onClick} disabled={disabled} {...props}>
            {text}
        </button>
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

export const Modal = ({title, show, setShow, children}) => {
    const onWindowClick = (e) => {
        // If anywhere outside the modal is clicked, close the modal!
        if(e.target.className === "modal") {
            setShow(false);
        }
    }

    useEffect(() => {
        if(show) {
            window.addEventListener('click', onWindowClick);
        }
    })

    return (
        <div className="modal" hidden={!show}>
            <div className="modal-content">
                <div className="modal-title-bar">
                    <div className="modal-title">
                        {title}
                    </div>
                    <div className="modal-close">
                        <FaTimes className="close-button" onClick={() => {setShow(false)}}/>
                    </div>
                </div>
                <div className="modal-children">
                    {children}
                </div>
            </div>
        </div>
    )
}

export const BeerCard = ({
    id,
    /* isOwn, */
    onClick = () => {},
    badge = <></>,
    title,
    description,
    tail,
    footer,
    className = "",
}) => {
    return (
        <div
            id={id}
            className="beer-card-wrapper"
        >
            <div
                className={"beer-card" + (onClick ? " cursor-pointer" : "") + (className ? ` ${className}` : "")}
                onClick={onClick}
            >
                <div className="beer-info">
                    <div className="beer-badge">
                        { badge }
                    </div>
                    <div className="beer-text">
                        <div className="beer-title">
                            { title }
                        </div>
                        <div className="beer-description">
                            { description }
                        </div>
                    </div>
                </div>
                <div className="beer-tail">
                    { tail }
                </div>
            </div>
            { footer }
        </div>
    )
}