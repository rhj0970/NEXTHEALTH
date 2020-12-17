import * as React from 'react';

export class ChecklistItem extends React.Component {
    render() {
        return (
            <li className="checkListItem">
                <div className="iconContainer">
                    <svg className="checkListIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 9"><polyline fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="10.199 7 3.187 13.987 0 10.811" transform="translate(1 -6)"></polyline></svg>
                </div>
                <p className="checkListText">{this.props.text}</p>
            </li>
        )
    }
}