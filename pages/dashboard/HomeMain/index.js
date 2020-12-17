import React, { Component } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';



class HomeMain extends Component {

    render() {
        return (
            <div className="Dashboard2">
                <div className="navbar2">

                    <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                     <a href="/dashboard/HomeMain"><i class="fa fa-fw fa-home"></i>Home</a>
                     <a href="/dashboard/messages">Chat</a>
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                </div>
               <div className="contentp3">
                
                <div className="video">

                  
                        <img className="pic1" src={require('./grl2.png')} width={1540} height={650} />
                   
                   
                    </div>
                   
                    
                <div className="block">

                 <p>Welcome To Your Next Health Account</p>

                    

                </div>

                <div className="contentblock">

                   
                     
                    <div className="image1">
                    <img className="pic1" src={require('./ft.png')} width={160} height={87} />
                    </div>
                       <a href="/dashboard/content"><h3>Upload Your Fitness Content</h3></a>
                </div>
                <div className="clientblock">
                    <a href="/dashboard/client" className="acl"><h3>View Your Enrolled Clients</h3></a>
                    <div className="image3">
                  
                        <img className="pic3" src={require('./clie.png')} width={160} height={80} />
                   
                    </div>

                </div>
                <div className="calendarblock">

                    <a href="/dashboard/calendar" ><h3>View Your Scheduled Events</h3></a>

                    <div className="image2">
                     <img className="pic2" src={require('./calendar.png')} width={160} height={80} />
                    </div>

               </div>

             </div>
              <div className="foot"><p className="footpara">© 2020-2022 Next Health</p></div>

            </div>
        );
    }
}

export default HomeMain;

