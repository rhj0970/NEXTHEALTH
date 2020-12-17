import * as React from 'react';

export class Button extends React.Component {
    renderWithLink() {
        return this.renderAnchor();
    }

    renderWithoutLink() {
        return this.props.type === "button" ? this.renderButton() : this.renderAnchor();
    }

    renderAnchor() {
        return (
            <a href={this.props.href} disabled={this.props.disabled} onClick={this.props.onClick} className={`button ${this.props.className} ${this.props.noBackground ? 'noBackground' : ''}`}>
                {this.renderContents()}        
            </a>
        )
    }

    renderButton() {
        return (
            <button href={this.props.href} disabled={this.props.disabled} onClick={this.props.onClick} className={`button ${this.props.className} ${this.props.noBackground ? 'noBackground' : ''}`}>
                {this.renderContents()}     
            </button>
        )
    }

    renderContents() {
        return (
            <React.Fragment>
                {this.props.children}
                <svg className="hoverArrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <g fillRule="evenodd">
                        <path className="linePath" d="M0 5h7"></path>
                        <path className="tipPath" d="M1 1l4 4-4 4"></path>
                    </g>
                </svg> 
            </React.Fragment>
        )
    }

    render() {
        return this.props.noLink ? this.renderWithoutLink() : this.renderWithLink();
    }
}