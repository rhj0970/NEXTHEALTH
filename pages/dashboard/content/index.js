import React, { Component } from 'react';
import { useState } from "react";
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from "react-dom";
import {storage} from '../../../firebase';
import axios from 'axios';
import { Head } from 'next/head';

class Profcontent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            image: null,
            FileName: '',
            Plan: '',
            Speciality: '',
            Gender: '',
            Location: '',
            Duration: '',
            url: '',
            progress: 0

        };

        this.handleChange = this.handleChange.bind(this)

        this.handleChangen = this.handleChangen.bind(this)
        this.handleChangenn = this.handleChangenn.bind(this)

        this.handleChangennn = this.handleChangennn.bind(this)

        this.handleChangennnn = this.handleChangennnn.bind(this)
        this.handleChangennnnn = this.handleChangennnnn.bind(this)
        this.handleChangennnnnn = this.handleChangennnnnn.bind(this)

        this.onFileUpload = this.onFileUpload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpload = this.handleUpload.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    handleChange = e => {
        console.log(e.target.files)
        if (e.target.files[0] !== undefined) {
           // setImage(e.target.files[0]);
            this.setState({
                image: e.target.files[0]
                
    
            },()=>console.log(this.state.image))
          }
      }


    setImage = (file) => {
        
        this.setState({
            image: file
            

        },()=>console.log(this.state.image))


    }

    

      handleUpload = () => {
          console.log("going through handleupload function");
        //const [image, setImage] = useState(null);
        //const [url, setUrl] = useState("");
       // const [progress, setProgress] = useState(0);
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({progress: progress});
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(this.state.image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({url: url});
              });
          }
        );
      };

/*
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    */

    handleSubmit(e) {
        
        const data = {
            filename: this.state.filename,
            plantype: this.state.plantype,
            gender: this.state.gender,
            speciality: this.state.speciality,
            location: this.state.location,
            duration: this.state.duration,
            

        }

        alert("Submitted Successfully");
        console.log("the data showed");

        
        axios.post('/api/users/post', data).then(res => res.data).then(res => {
            if (res.error) {
                this.setState({error: res.error, loading: false});
                return;
            }
        });


    }

    handleChangen(event) {
        this.setState({
            filename: event.target.value
        })
    }

    handleChangenn(event) {
        this.setState({

            plantype: event.target.value
        })
    }


    handleChangennn(event) {
        this.setState({

            speciality: event.target.value
        })
    }

    handleChangennnn(event) {
        this.setState({
            gender: event.target.value

        })
    }

    handleChangennnnn(event) {
        this.setState({

            location: event.target.value

        })
    }

    handleChangennnnnn(event) {
        this.setState({

            duration: event.target.value
        })
    }

    onFileUpload = () => {

        const formData = new FormData();

        formData.append(

            this.state.file,
            this.state.file.name

        );

        console.log(this.state.file);


    };

    fileData = () => {

        if (this.state.file) {

            return (
                <div className="preview">
                    <h4>Preview of your selected file:</h4>
                    <img src={this.state.file} height={270} width={550} />
                </div>
            );
        } else {
            return (
                <div className="choose">
                    <br />
                    <h7>Choose file before Pressing the Upload button!</h7>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="Dashboard2">
                <div className="navbar2">

                    <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                    <a href="/dashboard/HomeMain"><i class="fa fa-fw fa-home"></i>Home</a>
                    <div class="dropdown">
                        <button class="dropbtn"><i class="fa fa-caret-down"></i>Menu</button>
                        <div class="dropdown-content">
                            <a href="/dashboard/calendar">Calendar</a>
                            <a href="/dashboard/content">Upload</a>
                            <a href="/dashboard/client">Clients</a>
                        </div>
                    </div>
                 
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                </div>
               
                <div className="contentp">
                    <div className="trainer"><h3>Lead, Instruct and Motivate Individuals by uploading the best Fitness Plans!</h3>
                    </div>
                    <form className="LoginF" onSubmit={this.handleSubmit}>
                        <div className="LoginN">
                            <label className="LoginL">FILE NAME: </label>

                            <input type="text" className="LoginField" placeholder="*Enter file name" value={this.state.filename} onChange={this.handleChangen} />
                        </div>

                        <div className="LoginN">
                            <label className="LoginL">PLAN TYPE:</label>

                            <select className="LoginField" name="plan" value={this.state.plan} onChange={this.handleChangenn}>
                                <option value="" disabled selected hidden>*Select Plan Category</option>
                                <option value="workout">Workout Plan</option>
                                <option value="diet">Diet Plan</option>

                            </select>
                        </div>

                        <div className="LoginN">
                            <label className="LoginL">SPECIALITY:</label>

                            <input type="text" className="LoginField" placeholder="*Example Zumba,Strength,Keto..." value={this.state.speciality} onChange={this.handleChangennn} />
                        </div>

                        <div className="LoginN">
                            <label className="LoginL">GENDER:</label>

                            <select className="LoginField" name="Gender" value={this.state.gender} onChange={this.handleChangennnn}>
                                <option value="" disabled selected hidden>*Select Gender that suits your plan</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Any">Any</option>
                            </select>
                        </div>




                        <div className="LoginN">
                            <label className="LoginL">LOCATION:</label>

                            <select className="LoginField" name="Location" value={this.state.location} onChange={this.handleChangennnnn}>
                                <option value="" disabled selected hidden>*Select Suitable Location</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>

                            </select>
                        </div>

                        <div className="LoginN">
                            <label className="LoginL">DURATION: </label>

                            <select className="LoginField" name="duration" value={this.state.duration} onChange={this.handleChangennnnnn} >
                                <option value="" disabled selected hidden>*Duration of the plan</option>
                                <option value="Less than 1 month">Less than 1 month</option>
                                <option value="Between 1-6 months">Between 1-6 months</option>
                                <option value="More than 6 months">More than 6 months</option>
                            </select>
                        </div>

                        <input type="file" onChange={this.handleChange}/>
                        
                        <button className="filebutton1" onClick={this.handleUpload}>Upload</button>
                        
                       
                
                    </form>


                </div>
                {this.fileData()}
            </div>
        );
    }
}


export default Profcontent;



