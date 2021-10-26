import React from "react";
import axios from "axios";

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
class Login extends React.Component {
constructor(props) {
super(props);
this.state = { Regist:[],email: null, password:null,errors:{
    email:'',
    password:''
} };
}
handle=(event)=> {
let {name, value} = event.target;
let errors = this.state.errors;

switch(name){
    case 'email': errors.email = regForEmail.test(value)?'':'Enter Email correctly'
    break;
    case 'password': errors.password = value.length < 8?'Password must contain atleast 8 characters':''
    break;
    default:
        break;
}
this.setState({[name]:value, errors});
}
componentDidMount=async()=>{
    try{
    const URL="http://localhost:3004/Registration" 
    const res=await axios.get(URL);
    this.setState({Regist:res.data})
}
catch(err){
    console.log(err)
}
}
handleSubmit = async(event)=> {
    event.preventDefault();
    let {Regist}=this.state;
    if (Regist.find(x=>x.email === this.state.email) && Regist.find(x=>x.password === this.state.password)) {
        alert('Login successful');
        this.props.history.push("/todo");
    } 
    else {
        alert('Incorrect Credntials!');
    }
}
render() {
    const {errors} = this.state;
    return (
        <div id="login" >
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" onSubmit={this.handleSubmit} >
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="email" class="text-info">Email:</label><br/>
                                <input type="email" name="email" id="email" class="form-control" value={this.state.email} onChange={this.handle.bind()} required autoFocus/>
                                {errors.email.length>0 && 
                                <span style={{color:'red'}}>{errors.email}</span>}
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br/>
                                <input type="text" name="password" id="password" class="form-control"value={this.state.password} onChange={this.handle.bind()} required/>
                                {errors.password.length>0 && 
                                <span style={{color:'red'}}>{errors.password}</span>}
                            </div>
                            <div class="form-group">
                                <button className="btn btn-info btn-md">Login</button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
);
}
}
export default Login;