import React, { Component } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';



class DietPlan extends Component {

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
                    <div className="diet">
                        <div className="wblock1">
                            <div className="imagebgw1">
                                <img className="pic_backw1" src={require('./d11.jpg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>28-Day Ketogenic Diet Plan</h4></a>
                        </div>
                        <div className="wblock2">
                            <div className="imagebgw2">
                                <img className="pic_backw2" src={require('./d22.jpeg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>Intermittent Fasting</h4></a>
                        </div>
                        <div className="wblock3">
                            <div className="imagebgw3">
                                <img className="pic_backw3" src={require('./d33.jpg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>Mediterranean </h4></a>
                        </div>
                        <div className="wblock4">
                            <div className="imagebgw4">
                                <img className="pic_backw4" src={require('./d44.jpg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>Vegan Diet Plan</h4></a>
                        </div>
                        <div className="wblock5">
                            <div className="imagebgw5">
                                <img className="pic_backw5" src={require('./d55.jpg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>Low Carb</h4></a>
                        </div>
                        <div className="wblock6">
                            <div className="imagebgw6">
                                <img className="pic_backw6" src={require('./d66.jpg')} width={300} height={250} />
                            </div>
                            <a href="/dashboard/dietplan1"><h4>Gluten Free</h4></a>
                        </div>


                    </div>
                <div className="headernew">
                <div className="heading1">
                <h1 className="txts1">DIET PLANS</h1>
                </div>
                <div className="heading2">
                <h4 className="txts2"> Learn about different approaches to fitness nutrition so you can choose the best diet plan that suits you.</h4>
                            <div className="rt">
                                <a className="rt1" href="/dashboard/ratings"><h5>Click here to add rating and reviews</h5></a>
                            </div>
                            <div className="rtnew">
                                <a className="rt2" href="/dashboard/recommendation"><h5>Click here for our recommendations</h5></a>
                            </div>
                        </div>
                </div>
                 
            
            
           
           

                </div>
                </div>

               


);
}

}

export default DietPlan;
