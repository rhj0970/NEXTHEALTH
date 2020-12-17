import * as React from 'react';

export class Checklist extends React.Component {
    render() {
        return (
            <ul className="checkList">
                {this.props.children}
            </ul>
        )
    }
}