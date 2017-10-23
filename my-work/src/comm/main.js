import React,{Component} from 'react';
import ReactDom from 'react-dom';

class MainModel extends Component{
    changeChecked = () =>{
        this.props.PchangeChecked(this.props.id)
    }
    remove = () =>{
        this.props.remove(this.props.id)
    }
    render() {
        let {txt,checked} = this.props;
        let sClass = checked?'completed':'';
        return(
           <li className={sClass}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={checked}
                        onChange = {this.changeChecked}
                    />
                    <label>{txt}</label>
                    <button 
                        className="destroy"
                        onClick = {this.remove}
                    ></button>
                </div>
            </li>
        )
    }
}

export default MainModel