import React from 'react'

class BottomMenu extends React.Component{

    handleVeryfication=()=>{
        if(typeof this.props.doVeryfication ==='function'){
            this.props.doVeryfication()
        }
    }

    handleMainSeek=(event)=>{
        if(typeof this.props.seek ==='function'){
            this.props.seek(event)
        }
    }

    undo=()=>{
        if(typeof this.props.undo ==='function'){
            this.props.undo()
        }
    }

    erase = (event)=>{
        if(typeof this.props.erase ==='function'){
            this.props.erase(event)
        }


    }

    render(){
        return <div className='bottomMenu'>
            <ValuesMenu seek={this.handleMainSeek}/>
            <FunctionMenu erase={this.erase} doVeryfication={this.handleVeryfication} undo={this.undo}/>
        </div>
    }

}

class ValuesMenu extends React.Component{

    handleSeek = (event)=>{
        if(typeof this.props.seek ==='function'){
            this.props.seek(event)
        }
    }

    render(){
        let values = [];
        for(let i=0; i<9;i++){
            values.push(<div onClick={this.handleSeek} className="value" key={i}>{i+1}</div>)
        }
        return <div className='valuesMenu'> {values} </div>
    }
}

class FunctionMenu extends React.Component{
     constructor(props){
         super(props)

         this.state={
             conflict: false
         }
     }

    handleVeryfication = ()=>{
        if(typeof this.props.doVeryfication ==='function'){
            this.props.doVeryfication()
        }
    }

    undo = ()=>{
        if(typeof this.props.undo ==='function'){
            this.props.undo()
        }
    }

    erase = (event)=>{
        if(typeof this.props.erase ==='function'){
            this.props.erase(event)
        }


    }

    render(){
        return <div className='functionMenu'>
            <div className='funcBtn' onClick={this.handleVeryfication}>Verify</div>
            <div className='funcBtn' onClick={this.erase}>Erase</div>
            <div className='funcBtn' onClick={this.undo}>Undo</div>
        </div>
    }
}



export {BottomMenu}
