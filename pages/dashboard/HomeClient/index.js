import React,{Component} from 'react';


class HomeAdmin extends Component {
  render(){
 return(

<div className="Dashboard2">
                <div className="navbar2">
                    
                    <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                    <a href="/dashboard/HomeClient"><i class="fa fa-fw fa-home"></i>Home</a>
                    <a href="/dashboard/messages">Chat</a>
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                </div>
               
     
               <div className="contentp2">
                <div className="blocknew">

                 <p>Welcome To Your Next Health Account</p>

                    

                </div>

                <div className="imagebg3">
                     <img className="pic_back2" src={require('./backgg2.png')} width={1500} height={500} />
                    </div>
                
                <div className="workblock">
                    <a href="/dashboard/workoutplans"><h4>Workout Plans</h4></a>
                    
                </div>
                <div className="dtblock">

                    <a href="/dashboard/dietplans" ><h4>Diet Plans</h4></a>

                    
                    </div>

                    <div className="clblock1">

                    <a href="/dashboard/mycalendar" ><h4>Calendar</h4></a>

                    
                </div>

                <div className="clblock2">

                    <a href="/dashboard/myhealth" ><h4>My Health</h4></a>

                    
                </div>

                <div className="clblock3">

                    <a href="/dashboard/search" ><h4>Search</h4></a>

                    
                </div>

                </div>
               

            </div>


  );



  }

}

export default HomeAdmin;
