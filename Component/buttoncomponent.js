import React, {Component} from "react";

export default class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const launchButton = this.props.intervalstate ? (
            <button
                type={"button"}
                onClick={() => {
                    this.props.handleLaunch(this.props.time);
                }}>
                {`launch`}
            </button>
        ) : null;
        const resetButton = this.props.intervalstate ? (
            <button type={"button"} onClick={this.props.handleReset}>
                {`reset`}
            </button>
        ) : (
            <button type={"button"} onClick={this.props.handleReset}>
                {`reset`}
            </button>
        );
        const removeButton =
            this.props.intervalstate && this.props.time > 0 ? (
                <button type={"button"} onClick={this.props.handleRemove}>
                    {`remove`}
                </button>
            ) : null;
        const addButton = this.props.intervalstate ? (
            <button type={"button"} onClick={this.props.handleAdd}>
                {`add`}
            </button>
        ) : null;
        return (
            <div>
                {resetButton}
                {launchButton}
                {removeButton}
                {addButton}
            </div>
        );
    }
}
