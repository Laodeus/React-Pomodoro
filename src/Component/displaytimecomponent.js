import React, {Component} from "react";

export default class Displaytimecomponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className={`divtimer`}>
                {this.props.text}
                <br />
                {`${this.props.format(this.props.time)}`}
            </div>
        );
    }
}
