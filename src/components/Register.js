import React, { Component } from 'react'
import axios from 'axios';

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            Regist:[],
            firstname:null,
            lastname1:null,
            username:null,
            email:null,
            password:null,
            conpassword:null,
            id:null,
            errors:{
                firstname:'',
                lastname1:'',
                username:'',
                email:'',
                password:'',
                conpassword:'',
            }
        }
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
        handler=(event)=>{
            const {name,value}=event.target;
            let errors=this.state.errors;
            switch(name){
                case 'firstname':
                    errors.firstname=value.length<4?'First Name is not valid':'';
                    break;
                case 'lastname1':
                    errors.lastname1=value.length<2?'Last Name is not valid':'';
                    break;
                case 'username':
                    errors.username=value.length<4?'Enter username correctly':'';
                    break;    
                case 'email':
                    errors.email=regForEmail.test(value)?'':'Email is not valid';
                    break;
                case 'password':
                     errors.password=value.length<8?'Password must me 8 character long':'';
                    break;
                case 'conpassword':
                    errors.conpassword=value!==this.state.password?'Password is not matched':'';
                    break;
                
                default:        
                        break;
            }
            this.setState({errors,[name]:value},()=>{
                console.log(errors)
            })
        }
        add=async(event)=>{
                event.preventDefault();
                let formData={ firstname:this.state.firstname, lastname1:this.state.lastname1,
                username:this.state.username, email:this.state.email,password:this.state.password,conpassword:this.state.conpassword};
                try{
                const URL="http://localhost:3004/Registration";
                const resData=await axios.post(URL,formData)
                const res=await axios.get(URL)
                this.setState({Regist:res.data,firstname:'', lastname1:'',username:'',email:'',password:'',conpassword:''})
                alert("Registration Completed") 
                this.props.history.push('/login') 
            }
            catch(err){
                console.log(err)
            }
        }
         changedlogin=()=>{
             this.props.history.push('/login')
         }
    render() {
        const {errors}=this.state;
        return (
            
            <div >
                <div id="register">
                    <div class="container">
                        <div id="register-row" class="row justify-content-center align-items-center">
                            <div id="register-column" class="col-md-6">
                                <div id="register-box" class="col-md-12">
                                    <form id="register-form" class="form" onSubmit={this.add}>
                                        <h3 class="text-center text-info">Registration</h3>
                                        <div className="row">
                                            <div class="form-group col-6">
                                                <label for="name" class="text-info">First Name:</label><br/>
                                                    <input type="text" name="firstname" id="name" class="form-control"  onChange={this.handler} required/>
                                                    {errors.firstname.length>0 && 
                                                <span style={{color:'red'}}>{errors.firstname}</span>}
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="lname" class="text-info">Last Name:</label><br/>
                                                    <input type="text" name="lastname1" id="lname" class="form-control" onChange={this.handler} required/>
                                                    {errors.lastname1.length>0 && 
                                                <span style={{color:'red'}}>{errors.lastname1}</span>}<br/> 
                                            </div>
                                        </div>
                                        <div class="form-group">
                                                <label for="name" class="text-info">username:</label><br/>
                                                    <input type="text" name="username" id="name" class="form-control"onChange={this.handler} required />
                                                    {errors.username.length>0 && 
                                                <span style={{color:'red'}}>{errors.username}</span>}
                                            </div>
                                        <div class="form-group">
                                            <label for="email" class="text-info">Email:</label><br/>
                                                <input type="email" name="email" id="email" class="form-control" onChange={this.handler} required />
                                                {errors.email.length>0 && 
                                            <span style={{color:'red'}}>{errors.email}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Password:</label><br/>
                                                <input type="text" name="password" id="password" class="form-control"  onChange={this.handler} required />
                                                {errors.password.length>0 && 
                                            <span style={{color:'red'}}>{errors.password}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Confirm Password:</label><br/>
                                                <input type="text" name="conpassword" id="conpassword" class="form-control" onChange={this.handler} required/>
                                                {errors.conpassword.length>0 && 
                                            <span style={{color:'red'}}>{errors.conpassword}</span>}<br/>
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" value="Register" className=" btn btn-primary col-md-3 m-2 p-2" />
                                            <input type="submit" value="Login" className=" btn btn-success col-md-3 m-2 p-2"onClick={this.changedlogin.bind()} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}

export default Registration
