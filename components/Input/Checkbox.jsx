import * as React from 'react';

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="checkbox">
                <input defaultChecked={this.props.defaultChecked} required={this.props.required} type="checkbox" id={this.props.id} name={this.props.name} onChange={this.props.onChange} value={this.props.value}/>
                <label>{this.props.label}</label>
            </div>
        )
    }
}