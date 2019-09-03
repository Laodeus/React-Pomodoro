import React, {Component} from "react";
import Displaytimecomponent from "./Component/displaytimecomponent";
import ButtonComponent from "./Component/buttoncomponent";
import "./css/materialize.css";
import finishedSound from "./sound/travailterminer.mp3";

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
        };

        this.onLaunch = this.onLaunch.bind(this);
        this.onAddTime = this.onAddTime.bind(this);
        this.onRemoveTime = this.onRemoveTime.bind(this);
        this.onReset = this.onReset.bind(this);
        this.audiofinish = new Audio(finishedSound);
    }

    onLaunch() {
        if (!this.timerIntervale || this.timerIntervale == null) {
            if (this.state.time <= 0) {
                this.setState(() => ({
                    time: 25 * 60,
                }));
            }

            this.timerIntervale = setInterval(() => {
                if (this.state.time <= 0) {
                    clearInterval(this.timerIntervale);
                    this.timerIntervale = null;
                    this.setState(() => ({
                        time: 0,
                    }));

                    this.audiofinish.play();
                } else {
                    this.setState(prevState => ({
                        time: prevState.time - 1,
                    }));
                }
            }, 10);
        }
    }

    onReset() {
        this.setState(() => ({
            time: 0,
        }));
    }

    onAddTime() {
        this.setState(prevState => ({
            time: prevState.time + 60,
        }));
    }

    onRemoveTime() {
        if (this.state.time <= 0 || this.timerIntervale === null) {
            if (this.timerIntervale) {
                this.audiofinish.play();
            }
            clearInterval(this.timerIntervale);
            this.timerIntervale = null;
            this.setState(() => ({
                time: 0,
            }));
        } else {
            this.setState(prevState => ({
                time: prevState.time - 60,
            }));
        }
    }

    render() {
        return (
            <div>
                <Displaytimecomponent
                    time={this.state.time}
                    format={formatTime}
                    intervalstate={!this.timerIntervale}
                />
                <br />
                <ButtonComponent
                    handleLaunch={this.onLaunch}
                    handleAdd={this.onAddTime}
                    handleRemove={this.onRemoveTime}
                    handleReset={this.onReset}
                    time={this.state.time}
                    intervalstate={!this.timerIntervale}
                />
            </div>
        );
    }
}
