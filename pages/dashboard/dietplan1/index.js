import React, { Component } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';



class dietplan1 extends Component {

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
                                <img className="pic_backw11" src={require('./d11.jpg')} width={700} height={400} />
                            </div>

                        </div>
                        <p className="para1">Lose up to 25 pounds in a month.A healthy ketogenic diet should revolve around high-fat, low-carb food choices and restrict highly processed items and unhealthy fats. Keto-friendly beverage options must be sugar-free. Consider water, sparkling water or unsweetened green tea and coffee.A healthy ketogenic diet should consist of about 75% fat, 10-30% protein and no more than 5% or 20 to 50 grams of carbs per day.</p>
                        <p className="para2"></p>
                        <p className="para3"></p>
                        <h4 className="ph1">Trainer: Andrew Johnson</h4>
                        <h4 className="ph2">Email: andrewjj@gmail.com</h4>
                    </div>
                    <div className="headernew">
                        <div className="heading1">
                            <h1 className="txts1">28-DAY KETOGENIC DIET PLAN</h1>
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

export default dietplan1;