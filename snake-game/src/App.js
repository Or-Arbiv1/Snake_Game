import Snake from "./Snake";
import Food from "./Food";
import React, {Component} from "react";
const getRandomCoordinates = () =>{
    let min = 1;
    let max= 98;
    let x= Math.floor((Math.random()* (max-min+1)+min)/2)*2;
    let y= Math.floor((Math.random()* (max-min+1)+min)/2)*2;
    return [x,y];
}
const initialState ={
    food: getRandomCoordinates(),
    snakeDots: [
        [0, 0],
        [2, 0],
    ],
    direction: 'RIGHT',
    speed: 200,
}

class App extends Component {

    state = initialState;


    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat();
    }
    checkIfEat(){
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length -1];
        let foodIndex = this.state.food;
        if(head[0] === foodIndex[0] && head[1] === foodIndex[1]){
            this.enlargeSnake();
            this.enlargeSpeed();
            this.setState({food: getRandomCoordinates()})
        }

    }
    enlargeSpeed(){
        if(this.state.speed > 10){
            this.setState({
                speed: this.state.speed -10
            })
        }

    }
    enlargeSnake(){
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState(
            {snakeDots: newSnake}
        )
    }
    checkIfCollapsed(){
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length -1];
        dots.pop();
        dots.forEach(dot=>{
            if (head[0] === dot[0] && head[1] === dot[1]){
                this.onGameOver();
            }
        })
    }
    onKeyDown = (e) =>{
        switch (e.keyCode){
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
        }

    }
    checkIfOutOfBorders(){
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length -1];
        if(head[0]>=100 || head[1] >= 100 || head[0]< 0 || head[1]<0){
            this.onGameOver();
        }
    }
    onGameOver() {
        alert(`Game Over! Snake length is ${this.state.snakeDots.length}`);
        this.setState(initialState);
    }

    moveSnake = () =>{
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length -1];

        switch (this.state.direction){
            case "RIGHT":
                head = [head[0]+2, head[1]];
                break;
            case "LEFT":
                head = [head[0]-2, head[1]];
                break;
            case "DOWN":
                head = [head[0], head[1]+2];
                break;
            case "UP":
                head = [head[0], head[1]-2];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({snakeDots:dots})
}

    render() {
        return (
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food dot={this.state.food}/>
            </div>
        );
    };
}

export default App;
