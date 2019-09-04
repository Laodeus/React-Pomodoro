import React from "react";
import ReactDOM from "react-dom";

const Modol = props => {
    if (props.show) {
        return (
            <div className={"blankScreen"}>
                <div className={"ModalDiv"}>
                    <div className={"ModalDivText"}>{`take a break.`}</div>
                    <div className={"ModalDivButton"}>
                        <button type={`button`} onClick={props.handleClose}>
                            {`close`}
                        </button>
                        <button type={`button`} onClick={props.handleRelaunch}>
                            {`new timer`}
                        </button>
                        <button
                            type={`button`}
                            onClick={props.handleLaunchBreak}>
                            {`5 minutes break`}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

function Modal(props) {
    return ReactDOM.createPortal(Modol(props), document.querySelector("body"));
}

export default Modal;
