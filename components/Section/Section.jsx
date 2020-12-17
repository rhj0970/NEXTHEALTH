import * as React from 'react';
import Fade from 'react-reveal/Fade';

export class Section extends React.Component {
    render() {
        return (
            <section className={this.props.className} id={this.props.id}>
                <div className="sectionBackgroundMask">
                    <div className="sectionBackground"></div>
                </div>
                <div className={`sectionContainer grid ${this.props.gridClassName}`}>
                    <Fade bottom>
                        {this.props.children}
                    </Fade>
                </div>
            </section>
        )
    }
}