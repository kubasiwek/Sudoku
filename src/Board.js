import React from 'react';
//import Cell from './js/Board';

class Board extends React.Component{
    constructor(props){
        super(props)
        this.state={
            win:false,
            lastIndex:null
        }
    }

    getLastIndex=(event,id)=>{
        if(typeof this.props.getLastIndex ==='function'){
            this.props.getLastIndex(event,id)
        }
    }

    newBoard = ()=> {
        let board = [];

        for(let i=0;i<9;i++){
            let rows=[];
            for(let j=0;j<9;j++){
                rows.push(<Cell undo={this.getLastIndex} board={this.props.board} key={i*9+j} id={i*9+j}
                />)
            }
            board.push(<tr key={"row"+i} >{rows}</tr>)
        }
        return board
    }
    playAgain =()=>{
        if(typeof this.props.playAgain ==='function'){
            this.props.playAgain()
        }
    }

    render(){
        const board = this.newBoard();
        const time=this.props.time;
        if(this.props.win){//dać tu coś lepszego
            return <div className='win'>
                Well done! Your time is: <span style={{fontWeight:'700'}}>{(Math.floor(time/3600)+'').padStart(2, '0')}:{(Math.floor((time%3600)/60)+"").padStart(2, '0')}:{(Math.floor(time%60)+'').padStart(2, '0')}</span>
                <button className='again' onClick={this.playAgain}>Jeszcze raz ?</button>
            </div>
        }
        else{
            return <table className='board' style={{borderSpacing: "0"}}>
                <tbody>
                {board}
                </tbody>
            </table>
        }
    }
}

class Cell extends React.Component{
    constructor(props){
        super(props)

        this.state={
            editable: false,
            lastIndex: null
        }
    }

    handleCellChange=(event)=>{
        if(typeof this.props.undo ==='function'){
            this.props.undo(event,this.props.id)
        }
        this.setState({
            editable: true
        });
        event.target.addEventListener('keyup',(event)=>{
            this.setState({
                editable: false,
                // lastIndex: this.props.id
            });
            let text = event.target.innerText;
            event.target.innerText = event.target.innerText.replace(/\D/g,'');

            if(text.length>1){
                event.target.innerText = text[0];
            }

        });
        event.target.addEventListener('focus',(event)=>{
            const thisKey = this.props.id;
            const tds = document.querySelectorAll('.cell');
            for(let i=thisKey%9;i<81;i+=9){
                tds[i].style.backgroundColor = "rgba(77, 219, 255,0.4)";
            }
            event.target.style.backgroundColor = "rgba(77, 219, 255,0.7)";
            event.target.parentElement.style.backgroundColor = "rgba(77, 219, 255,0.4)";
            event.target.style.outline = "none";


        })
        event.target.addEventListener('blur',(event)=>{
            const thisKey = this.props.id;
            const tds = document.querySelectorAll('.cell');
            for(let i=thisKey%9;i<81;i+=9){
                tds[i].style.backgroundColor = "";
            }
            event.target.style.backgroundColor = "";
            event.target.parentElement.style.backgroundColor = "";
        })

    }

    render(){

        return this.props.board[this.props.id]!=="0" ?
            <td className='cell' onClick={this.handleCellChange} contentEditable={false} style={{fontWeight:'700'}}>
                {this.props.board[this.props.id]}</td> :
            <td className='cell' onClick={this.handleCellChange} contentEditable={this.state.editable}></td>

    }
}


export {Board,Cell};

