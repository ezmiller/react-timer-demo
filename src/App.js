import React from 'react';

let mainTimerStyles = {
	'fontSize': '80px'
};

let microTimerStyles = {
	'fontSize': '22px'
};

let buttonStyles = {
	'padding': '10px',
	'fontSize': '16px'
};

export class Timer extends React.Component {

	static props = {
		'color': 'blue'
	};

	state = {
		intervalId: undefined,
		timeArray: [0,0,0,0,0,0]
	};

	start = () => {
		if (this.state.intervalId === undefined) {
			this.setState({intervalId: setInterval(this.tick, 10)});
		}
	}

	stop = () => {
		clearInterval(this.state.intervalId);
		this.setState({intervalId: undefined});
	}

	tick = () => {
		let timeArray = this.state.timeArray.slice(0); // clone
		this.setState({timeArray:this.advance(timeArray,0)});
	}

	advance = (timeArray, i) => {
    if ((i === 3 || i === 5) && (timeArray[i]+1) % 6 === 0) {
      timeArray[i] = 0;
      return this.advance(timeArray, i+1);
    } else if ((timeArray[i]+1) % 10 === 0) {
    	timeArray[i] = 0;
    	return this.advance(timeArray, i+1);
  	} else {
      timeArray[i] += 1;
      return timeArray;
    }
  }

	render() {
		let arr = this.state.timeArray;

		let clockStyles = {
			'fontSize': '50px',
			'color': this.props.color
		};

		return (
			<div className="timer">
				<span className="clock" style={clockStyles}>
					<span style={mainTimerStyles}>{arr[5]}{arr[4]}:{arr[3]}{arr[2]}</span>
					<span style={microTimerStyles}>{arr[1]}{arr[0]}</span>
				</span>
				<br/>
				<button onClick={this.start} style={buttonStyles}>Start</button>
				<button onClick={this.stop} style={buttonStyles}>Stop</button>
			</div>
		);
	}

}

export default class App extends React.Component {

	render() {
		return (
			<div style={{'margin': '30px'}} className="app">
				<Timer color="blue"/>
			</div>
		);
	}

}