import React from 'react';
import {TopMenu} from './TopMenu'
import {Board} from './Board'
import {BottomMenu} from './BottomMenu'
import {puzzles} from './puzzles'
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);

        // let arr =[...puzzles[x]];
        this.state= {
            finished: false,
            finishTime: null,
            board: this.getBoard(),
            conflict:false,
            conflicts:[],
            seconds: 0,
            bestTime: localStorage.length===0 ? 0 : localStorage.getItem('bestTime'),
            lastIndex: [],
            highlightedCells: [],
            lastSeekValue: null
        }
    }

    getBoard = ()=>{
        let x = Math.floor(Math.random()*100);
        let arr =[...puzzles[x]];
        return arr
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({
                seconds: this.state.seconds +1
            })
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    handleVeryfication=()=>{
        let correct=true;
        let finished=true;

        let cells = document.querySelectorAll('.cell');
        let values =  [...cells];
        let tmp = [0,0,0,0,0,0,0,0,0];
        let conflicts = [];
        values = values.map((value)=>value.innerText);
        for(let i=0;i<81;i++){
            if(values[i].length<1){
                finished=false;
                break;
            }
        }
        let twoDimensionsArray =[];
        for(let i=0;i<9;i++){
            let removed = values.slice(i*9,i*9+9);
            twoDimensionsArray.push(removed);
        }

        //sprawdzanie wierszy
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                for(let k=j+1; k<9; k++){
                    if(twoDimensionsArray[i][j].length>0&&twoDimensionsArray[i][k].length>0 &&
                        twoDimensionsArray[i][j]===twoDimensionsArray[i][k]){
                        correct=false;
                        if(conflicts.indexOf(i*9+j)===-1) conflicts.push(i*9+j);
                        if(conflicts.indexOf(i*9+k)===-1) conflicts.push(i*9+k);
                    }
                }
            }
        }
        //sprawdzanie kolumn
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                for(let k=j+1; k<9; k++){
                    if(twoDimensionsArray[j][i].length>0&&twoDimensionsArray[k][i].length>0 &&
                        twoDimensionsArray[j][i]===twoDimensionsArray[k][i]){
                        correct=false;
                        if(conflicts.indexOf(j*9+i)===-1) conflicts.push(j*9+i);
                        if(conflicts.indexOf(k*9+i)===-1) conflicts.push(k*9+i);
                        // console.log(conflicts);
                    }

                }
            }
        }
        //sprawdzanie kwadratow
        for(let v=0; v<7; v+=3){
            for(let w=0; w<7; w+=3){
                let i=0,j=v,k=w;

                while(j<v+3){
                    while(i<9){
                        k=w;
                        while(k<w+3){
                            tmp[i]=twoDimensionsArray[j][k];
                            i++;
                            k++;
                        }
                        j++;
                    }
                }
                for(let g=0; g<8; g++){
                    for(let h=g+1; h<9; h++){
                        if(tmp[g].length>0&&tmp[h].length>0&&
                            tmp[g]===tmp[h]){
                            correct=false;
                            let p,r;
                            switch(g){
                                case 0: p=v; r=w; break;
                                case 1: p=v; r=w+1; break;
                                case 2: p=v; r=w+2; break;
                                case 3: p=v+1; r=w; break;
                                case 4: p=v+1; r=w+1; break;
                                case 5: p=v+1; r=w+2; break;
                                case 6: p=v+2; r=w; break;
                                case 7: p=v+2; r=w+1; break;
                                case 8: p=v+2; r=w+2; break;
                            }
                            if(conflicts.indexOf(p*9+r)===-1) conflicts.push(p*9+r);
                            switch(h){
                                case 1: p=v; r=w+1; break;
                                case 2: p=v; r=w+2; break;
                                case 3: p=v+1; r=w; break;
                                case 4: p=v+1; r=w+1; break;
                                case 5: p=v+1; r=w+2; break;
                                case 6: p=v+2; r=w; break;
                                case 7: p=v+2; r=w+1; break;
                                case 8: p=v+2; r=w+2; break;
                            }
                            if(conflicts.indexOf(p*9+r)===-1) conflicts.push(p*9+r);
                        }

                    }
                }
            }
        }
        console.log(conflicts);
        if(!correct){
            this.setState({
                conflict: true,
            })
        }
        //ustawienie czerwonego tła dla konfliktowych
        for(let i=0;i<conflicts.length;i++){
            cells[conflicts[i]].style.backgroundColor = "rgba(255, 26, 26,0.3)";
        }

        //zakończenie
        if(finished && correct){
            clearInterval(this.interval);
            this.setState({
                finishTime: this.state.seconds,
                finished: true
            })
            if(this.state.bestTime===0 || this.state.seconds<this.state.bestTime){
                // console.log("d");
                localStorage.setItem('bestTime',this.state.seconds)
                this.setState({
                    bestTime: localStorage.getItem('bestTime')
                })
            }
        }
    };

    handleSeek = (event)=>{
        //ogarnąć drugie kliknięcie
        let cells = document.querySelectorAll('.cell');
        //let highlight = [...this.state.highlightedCells];
        let values =  [...cells];
        //let bool = false;
        let seekValue = event.target.innerText;
        let valuesFound =[];
        values = values.map((value)=>value.innerText);
        for(let i=0;i<values.length;i++) {
            // cells[i].classList.remove('seek')
            if (cells[i].classList.contains('seek')) {
                cells[i].classList.remove('seek');
                //bool =true;
            } else {
                if (values[i] === seekValue) { //
                    valuesFound.push(i);
                    // console.log(i);
                    cells[i].classList.add('seek')
                }
            }

        }
        // event.target.innerText = bool===true ? this.state.lastSeekValue : ((valuesFound.length)+"/9")
        this.setState({
            highlightedCells: valuesFound,
            lastSeekValue: seekValue
        })
    }

    getLastIndex=(event,id)=>{
        //Problem: jak ktoś poda nie-cyfre to też index wchodzi

        let arr =[...this.state.lastIndex];

        event.target.addEventListener('keyup',(event)=>{
            arr.push(id);
            console.log(arr);
            this.setState({
                lastIndex: arr
            })
        })
    }

    undo = ()=>{

        let cells = document.querySelectorAll('.cell');
        for(let i=0;i<81;i++){
            cells[i].style.backgroundColor="";
        }
        let arr = [...this.state.lastIndex]
        let last = arr[arr.length-1];
        if(this.state.lastIndex.length>0){
            console.log(last);
            cells[last].innerText='';
            arr.splice(arr.length-1,1);
            console.log(arr);
        }
        this.setState({
            lastIndex: arr
        })
    }

    addEvent(event){
        event.target.innerText="";
    }

    erase = (event)=>{
        //ogarnąć zdjęcie eventu
        event.target.innerText = event.target.innerText==="Erase" ? "Play" : "Erase";
        let cells = [...document.querySelectorAll('.cell')];

        if(event.target.innerText==="Play"){
            cells.forEach((cell)=>{
                if(cell.style.fontWeight!=="700")
                    cell.addEventListener('click',this.addEvent, true)
            })
        }
        else if(event.target.innerText==="Erase"){

            cells.forEach((cell)=>{
                cell.removeEventListener('click',this.addEvent,true)

            })
        }

    };

    playAgain=()=>{
        this.setState({
            finished: false,
            finishTime: null,
            board: this.getBoard(),
            conflict:false,
            conflicts:[],
            seconds: 0,
            lastIndex: [],
            highlightedCells: []
        });

        this.interval = setInterval(()=>{
            this.setState({
                seconds: this.state.seconds +1
            })
        },1000)
    }


    render() {
        // const time = this.state.finishTime;

        return (
            <div className="container">
            {/*<div className='win'>Brawo, twój czas to : {(Math.floor(time/3600)+'').padStart(2, '0')}:{(Math.floor((time%3600)/60)+"").padStart(2, '0')}:{(Math.floor(time%60)+'').padStart(2, '0')}</div>*/}
            <TopMenu time={this.state.seconds} bestTime={this.state.bestTime} />
        <Board playAgain={this.playAgain} getLastIndex={this.getLastIndex} board={this.state.board} time={this.state.finishTime} win={this.state.finished}/>
        <BottomMenu erase={this.erase} undo={this.undo} seek={this.handleSeek} doVeryfication={this.handleVeryfication}/>

        </div>
    );
    }
}

export default App;
