import React, {Component} from "react";
import Displaytimecomponent from "./Component/displaytimecomponent";
import ButtonComponent from "./Component/buttoncomponent";
import "./css/materialize.css";
import finishedSound from "./sound/travailterminer.mp3";
import Modal from "./Component/modal";

const formatTime = time => {
    let formatedTime = "";
    if (time <= 0) {
        formatedTime = `--:--`;
    } else {
        formatedTime = `${Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
        
        :${(time % 60).toString().padStart(2, "0")}`;
    }
    return formatedTime;
};

export default class app extends Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            text: `pause`,
            show: false,
        };

        this.onLaunch = this.onLaunch.bind(this);
        this.onAddTime = this.onAddTime.bind(this);
        this.onRemoveTime = this.onRemoveTime.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onLaunchBreak = this.onLaunchBreak.bind(this);
        this.onRelaunchTimerWithModalClose = this.onRelaunchTimerWithModalClose.bind(
            this,
        );
        this.audiofinish = new Audio(finishedSound);
    }

    onLaunch() {
        if (!this.timerIntervale || this.timerIntervale == null) {
            if (this.state.time <= 0) {
                this.setState(() => ({
                    time: 25 * 60,
                }));
            }
            this.setState(() => ({
                text: `work`,
            }));

            this.timerIntervale = setInterval(() => {
                if (this.state.time <= 0) {
                    clearInterval(this.timerIntervale);
                    this.timerIntervale = null;
                    this.setState(() => ({
                        time: 0,
                        show: true,
                        text: `pause`,
                    }));
                    this.audiofinish.play();
                } else {
                    this.setState(prevState => ({
                        time: prevState.time - 1,
                    }));
                }
            }, 1000);
        }
    }

    onLaunchBreak() {
        this.onModalClose();
        if (!this.timerIntervale || this.timerIntervale == null) {
            if (this.state.time <= 0) {
                this.setState(() => ({
                    time: 5 * 60,
                    text: `break`,
                }));
            }

            this.timerIntervale = setInterval(() => {
                if (this.state.time <= 0) {
                    clearInterval(this.timerIntervale);
                    this.timerIntervale = null;
                    this.setState(() => ({
                        time: 0,
                        show: true,
                        text: `pause`,
                    }));
                    this.audiofinish.play();
                } else {
                    this.setState(prevState => ({
                        time: prevState.time - 1,
                    }));
                }
            }, 1000);
        }
    }

    onReset() {
        this.setState(() => ({
            time: 0,
            text: "pause",
        }));
    }

    onAddTime() {
        this.setState(prevState => ({
            time: prevState.time + 60,
        }));
    }

    onRemoveTime() {
        if (this.state.time <= 0 || this.timerIntervale === null) {
            clearInterval(this.timerIntervale);
            this.timerIntervale = null;
            this.setState(() => ({
                time: 0,
                text: "pause",
            }));
        } else {
            this.setState(prevState => ({
                time: prevState.time - 60,
            }));
        }
    }

    onStop() {
        if (this.timerIntervale !== null) {
            clearInterval(this.timerIntervale);
            this.timerIntervale = null;
            this.setState(prevState => ({
                time: prevState.time,
                text: "pause",
            }));
        }
    }

    onModalClose() {
        this.setState(() => ({
            show: false,
        }));
    }

    onRelaunchTimerWithModalClose() {
        this.onModalClose();
        this.onLaunch();
    }

    render() {
        return (
            <div>
                <Displaytimecomponent
                    time={this.state.time}
                    format={formatTime}
                    intervalstate={!this.timerIntervale}
                    text={this.state.text}
                />
                <br />
                <ButtonComponent
                    handleLaunch={this.onLaunch}
                    handleAdd={this.onAddTime}
                    handleRemove={this.onRemoveTime}
                    handleReset={this.onReset}
                    handleStop={this.onStop}
                    time={this.state.time}
                    intervalstate={!this.timerIntervale}
                />
                <Modal
                    show={this.state.show}
                    handleClose={this.onModalClose}
                    handleRelaunch={this.onRelaunchTimerWithModalClose}
                    handleLaunchBreak={this.onLaunchBreak}
                />
            </div>
        );
    }
}
