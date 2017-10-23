import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import HeadModel from './comm/header';
import MainModel from './comm/main';
import './css/index.css'
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      val:'',
      data:[
        {txt:'无形之刃，最为致命',checked:true,id:1},
        {txt:'死亡如风，常伴吾身',checked:false,id:2}
      ],
      view:'#/all'
    }
  }
  componentWillMount(){
    console.log('挂载前')
  }
  ComponentDidMount(){
    this.setState({
      data:getItem('data')
    })
    console.log('挂载后')
  }
  componentWillUnmount(){
    console.log('组件卸载')
  }

  //切换checked
  PchangeChecked = (id) => {
    let {data} = this.state;
    let data2 = Object.assign(data);

    data2.forEach(e=>{
      if(e.id === id){
        e.checked = !e.checked;
      }
    })

    this.setState({
      data:data2
    })
  }

  //修改输入框内容
  changeVal=(newVal)=>{
    this.setState({
      val:newVal
    })
  }
  click=()=>{
    this.setState({
      val:'12324234324324'
    })
  }


  //添加数据
  changeData = (newData) =>{
    let {data} = this.state;
    let data2 = Object.assign(data);
    data2.unshift(newData);
    this.setState({
      data:data2,
      val:''
    })
  }


  //删除
  remove = (id) =>{
    let {data} = this.state;
    let data2 = null;

    data2 = data.filter((e,i)=>{
      return e.id != id;
    })
    this.setState({
      data:data2
    })
  }
  

  //全选
  allChange = (ev) =>{
    let {checked} = ev.target;
    let {data} = this.state;
    let data2 = Object.assign(data);

    data2.forEach(e => e.checked = checked);
    this.setState({
      data:data2
    })
  }  


  //替换数据
  changeText = (newData) =>{
    let {data} = this.state;
    let data2 = Object.assign(data);

    data2.forEach((e,i)=>{
      if(e.id === newData.id){
        data2.splice(i,1,newData)
      }
    });

    this.setState({
      data:data2
    })
  }


  //清除完成项
  clearFinish = () =>{
    let {data} = this.data;
    let data2 = Object.assign(data);

    data2 = data2.filter(e=>{
      return !e.checked;
    })
    this.setState({
      data:data2
    })
  }



  // 改变视图
  changeView = (newView) =>{
    this.setState({
      view:newView
    })
  }

  render(){
    let {data} = this.state;
    let list = null;
    let all = false;
    let changeAll = null;
    let footer = null;
    let filterView = Object.assign(data);
    let len = data.length;


    filterView = filterView.filter(e=>{
      if (e.checked)len--;
      switch (this.state.view) {
        case '#/active':
          return !e.checked;
          break;
        case '#/completed':
          return !e.checked;
          break;
        default:
          return Object.assign(data)
          break;
      }
    })


    list = filterView.map((e,i)=>{
      let data = {
        key:i,
        id:e.id,
        txt:e.txt,
        checked:e.checked,
        PchangeChecked:this.PchangeChecked,
        remove:this.remove,
        changeText:this.changeText
      }
      return <MainModel {...data} />
    });

    if (data.length) {
      all = data.every(e => e.checked);

      changeAll = (
        <input
          className="toggle-all"
          type="checkbox"
          checked = {all}
          onChange = {this.allChange}
          ref = {(elem) => {this.all = elem}}
        />
      )

      // 放置footer的地方
      let footerData = {
        num:len,
        clearFinish:this.clearFinish,
        changeView:this.changeView,
        view:this.state.view
      }

    }


    list = data.map((e,i)=>{
      let data = {
        key:i,
        id:e.id,
        txt:e.txt,
        checked:e.checked,
        PchangeChecked:this.PchangeChecked,
        remove:this.remove  
      }
      return <MainModel {...data} />
    })
    
    all = data.every(e => e.checked)

    return (
      <div className="todoapp">
        <HeadModel 
          val={this.state.val} 
          changeVal={this.changeVal}
          changeData = {this.changeData}
        />
        <section className="main" ref = {(elem)=>{this.main = elem}}>
          <input
              className="toggle-all"
              type="checkbox"
              checked={all} 
              onChange = {this.allChange}    
          />
          <ul className="todo-list">
              {list}
          </ul>
        </section>
      </div>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('root'));
if(module.hot){
    module.hot.accept()
}
