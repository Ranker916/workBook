import React,{Component} from 'react';
import ReactDom from 'react-dom';
import MainModel from './main';
class HeadModel extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     value:this.props.val
        // }
    }
    changeVal=(ev)=>{
       
        // this.setState({
        //     value:ev.target.value
        // })
        // console.log(ev.target.value)
        this.props.changeVal(ev.target.value)
    }
    keyup = (ev) =>{
        if(ev.keyCode === 13){
            let json = {
                txt:ev.target.value,
                id: +new Date,
                checked:false
            }
            this.props.changeData(json);
        }
    }
    render(){
        return (
            <header className="header" >
                <h1>todos</h1>
                <input
                    onChange={this.changeVal}
                    className="new-todo"
                    placeholder="请输入内容"
                    value={this.props.val}
                    onChange={this.changeVal}
                    onKeyUp = {this.keyup} />
            </header>
        )
    }
      
}

export default HeadModel