import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import '../App.css'
export class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[
                { title:"Hello, This is a simple todo App"},
                { title:"Here we add our task" },
                { title:"Add task " }
            ],
            title: ' ',
            // isUpdate: false,
            isCompleted:false
        };   
    }

    handler=(event)=>{
        let {name, value} = event.target;
        this.setState({ [name] : value})
    }

    addtitle =()=>{
        let item = this.state.title;
        let ap_list = { title: item};
        this.setState({ list: [...this.state.list, ap_list], isCompleted:false })
        document.getElementById('title').value = "";  
    }

    deletetitle=(index)=>{
       let items=this.state.list;
       items.splice(index,1);
       this.setState({ list:items });  
    }

    change=(index)=>{
        let items=this.state.list;
        items[index].isCompleted = true;
        this.setState({list:items});
    }

       
    render() {
        return (
            <div className="container">
                <h2>Todo list App</h2>
            
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-dark"> Add Todo</Form.Label>
                        <Form.Control type="text" name="title" id="title" placeholder="Add new todo" onChange={this.handler}/>
                    </Form.Group>
                   
                </Form>
                <button id="add_btn"  className=" btn btn-danger my-2" onClick={this.addtitle.bind(this)}>Add Task</button> 
                
                    <table align="center" className="table "> 
                        <tbody className="text-center bg-light">
                            {this.state.list.map((item, ind)=>
                                <tr key={item.title}>
                                    <td  style={{color:"black"}}  className={item.isCompleted ? "strick":''}>{item.title}</td>
                                    <td className="col-4">
                                        <button className="btn btn-success mx-1 p-2" onClick={this.change.bind(this,ind)}>Completed <i class="fa fa-check-square-o"></i></button>
                                        <button className="btn btn-danger mx-1 p-2" onClick={this.deletetitle.bind(this,ind)}>Delete <i class="fa fa-times-rectangle-o"></i></button> 
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default Todo;