import React, { Component } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';



class workoutplan1 extends Component {

    render() {
        return (


            <div className="Dashboard3">
                <div className="navbar2">

                    <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                    <a href="/dashboard/HomeClient"><i class="fa fa-fw fa-home"></i>Home</a>
                    <div class="dropdown">
                        <button class="dropbtn"><i class="fa fa-caret-down"></i>Menu</button>
                        <div class="dropdown-content">
                            <a href="/dashboard/workoutplans">Workout Plans</a>
                            <a href="/dashboard/dietplans">Diet Plans</a>
                            <a href="/dashboard/myhealth">My Health</a>
                            <a href="/dashboard/mycalendar">Calendar</a>
                            <a href="/dashboard/search">Search</a>
                        </div>
                    </div>
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                </div>


                <div className="contentp2">
                    <div className="diet2">
                        <div className="wblock11">
                            <div className="imagebgw11">
                                <img className="pic_backw11" src={require('./w66.jpg')} width={700} height={400} />
                            </div>
                           
                        </div>
                        <p className="para1">It consists of daily, 20-minute, high-intensity workouts done 30 days in a row and is claimed to help you lose up to 20 pounds (9 kg) in a month.</p>
                        <p className="para2">Some specific exercises include:

                        Strength: pushups, double-arm row, chest flyes, military press
                        Cardio: high knees, jumping jacks, squat thrusts, skate jumps
Abs: crunches, leg lifts</p>
                        <p className="para3">The 30 Day Shred consists of three 20-minute workouts of varying intensity. Each workout contains three interval circuits of 3 minutes of strength, 2 minutes of cardio, and 1 minute of abs.</p>
                        <h4 className="ph1">Trainer: John Doe</h4>
                        <h4 className="ph2">Email: johndoe@gmail.com</h4>
                    </div>
                    <div className="headernew">
                        <div className="heading1">
                            <h1 className="txts1">THIRTY DAY FAT LOSS CHALLENGE</h1>
                        </div>
                        <div className="heading2">
                            <h4 className="txts2"> </h4>
                           
                        </div>
                    </div>
                    





                </div>
            </div>




        );
    }

}

export default workoutplan1;