import React, {Component} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:"",
            firstname:"",
            lastname:"",
            email:"",
            timsetp:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    onDelete=(user)=>{
        let url = `https://localhost:3000/delete`;
        let data = {
            idkey:user.ID
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    openModal() {
        this.setState({
            visible : true
        });

    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    call=(user)=>{
        this.openModal();
        this.setState({
            idkey:user.ID,
            firstname:user.FName,
            lastname:user.LName,
            email:user.Email,
            timestp:user.TimeStamp
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.ID,
            firstname:this.state.FName,
            lastname:this.state.LName,
            email:this.state.Email,
            timestp:this.state.TimeStamp
        }
        axios.put(url,data)
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.ID,
            firstname:this.state.FName,
            lastname:this.state.LName,
            email:this.state.Email,
            timestp:this.state.TimeStamp
        }
        axios.put(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            email:"",
            timestp:""
        });
	this.closeModal();
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">Users Information<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Registed Time</th>
                                </tr>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.ID}</td>
                                            <td>{user.FName}</td>
                                            <td>{user.LName}</td>
                                            <td>{user.Email}</td>
                                            <td>{user.TimeStamp}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delete</button></td>
                                            <div className="box">
                                                <Modal visible={this.state.visible}
                                                       width="1200"
                                                       height="600"
                                                       effect="fadeInUp"
                                                       onClickAway={() => this.closeModal()}
                                                >
                                                    <form className="container" id='form'>
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">ID: {this.state.ID}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Firstname:</label>
                                                            <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.FName}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Lastname:</label>
                                                            <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.LName}/>
                                                        </div>
                                                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                                                    </form>
                                                </Modal>
                                            </div>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
