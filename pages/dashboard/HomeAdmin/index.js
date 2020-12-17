import React,{Component} from 'react';


class HomeAdmin extends Component {
  render(){
 return(

<div className="Dashboard2">
                <div className="navbar2">
                    
                    <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                     <a href="/dashboard/HomeAdmin"><i class="fa fa-fw fa-home"></i>Home</a>
                    <div className="logo">
                        <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                    </div>

                </div>
               
     
               <div className="contentp2">
               <div className="blocknew2">
               Hey Admin! Welcome Back

               </div>
                <div className="imagebg3">
                     <img className="pic_back" src={require('./bb2.jpg')} width={1600} height={700} />
                    </div>
                
                <div className="requestblock">
                    <a href="/dashboard/requests"><p>New Requests</p></a>
                    
                </div>
                <div className="profblock">

                    <a href="/dashboard/professionals" ><p>Professionals List</p></a>

                    
                    </div>

                    <div className="clblock">

                    <a href="/dashboard/clients" ><p>Clients List</p></a>

                    
                </div>

                </div>
               

            </div>


  );



  }

}

export default HomeAdmin;
