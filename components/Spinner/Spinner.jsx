import * as React from 'react';

export class Spinner extends React.Component {
    render() {
        return (
            <svg viewBox="0 0 24 24" className={`spinner ${this.props.className}`}>
                <g transform="translate(1 1)" fillRule="nonzero" fill="none">
                    <circle cx="11" cy="11" r="11"></circle>
                    <path d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z" fill="currentColor"></path>
                </g>
            </svg>
        )
    }
}