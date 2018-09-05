import React from 'react'


class TopMenu extends React.Component{
    render(){
        return <div className='topMenu'>
            <Timer time={this.props.time} bestTime={this.props.bestTime}/>
        </div>

    }
}

class Timer extends React.Component{
    constructor(props){
        super(props)

        this.state={
            seconds:0
        }
    }

    render(){
        let time = this.props.time;
        let bestTime = this.props.bestTime

        return <div className='timers'>
            <div className='bestTime'>
            Your best time:<br/>
            <span style={{fontSize:'1.7rem', fontWeight: '700'}}>{(Math.floor(bestTime/3600)+'').padStart(2, '0')}:{(Math.floor((bestTime%3600)/60)+"").padStart(2, '0')}:{(Math.floor(bestTime%60)+'').padStart(2, '0')}</span>
        </div>
            <div className='timer' >
            {(Math.floor(time/3600)+'').padStart(2, '0')}:{(Math.floor((time%3600)/60)+"").padStart(2, '0')}:{(Math.floor(time%60)+'').padStart(2, '0')}

        </div>

        </div>
    }
}



export {TopMenu};
