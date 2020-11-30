import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Input, Button, List} from 'antd'
import store from './store/index.js'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.storeChange=this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }
    render() { 
        return ( <div style={{margin:'10px'}}>
            <div>
                <Input 
                    placeholder={this.state.inputValue}
                    style={{width:'250px',marginRight:'10px'}}
                    onChange={(e)=>{
                        let action={
                            type:'changeInput',
                            value:e.target.value
                        }
                        store.dispatch(action)
                    }}
                    value={this.state.inputValue}
                />
                <Button type='primary'
                    onClick={()=>{
                        let action={
                            type:'newItem'
                        }
                        store.dispatch(action)
                    }}>增加</Button>
            </div>
            <div style={{margin:'10px',width:'300px'}}>
                <List
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item,index)=>(<List.Item onClick={()=>{
                        let action={
                            type:'deleteItem',
                            index
                        }
                        store.dispatch(action)
                    }}>{item}</List.Item>)}
                />
            </div>
        </div> );
    }
    storeChange(){
        this.setState(store.getState())
        console.log('state:')
        console.log(this.state)
    }
}
 
export default TodoList;