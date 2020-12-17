import React,{Component} from 'react';


import axios from 'axios';


class recommendation extends Component{
  
  constructor(props) {

  super(props);


  const img0 = require('./blank.png');
  const img1 = require('./weightloss.png');
  const img2 = require('./pushup.png');


  this.state={

    workoutType: '',
    duration: '',
    index:0,
    imgList: [img0, img1, img2]
           
 

  };


this.handleChange = this.handleChange.bind(this)
this.handleChangen = this.handleChangen.bind(this)
this.handleSubmit = this.handleSubmit.bind(this);


}



  

  componentDidMount() {
  };


 

handleChangen(event) {
  this.setState({
      workoutType: event.target.value
  })
}


handleChange(event) {
        this.setState({
           duration:event.target.value
        })
    }



    handleSubmit(e) {
      e.preventDefault()
      if (this.state.index +1 === this.state.imgList.length) {
        this.setState({
          index: 0

        })
      }
      else {
        this.setState ({
          index: this.state.index +1
        })
      }

      const data = {
          workoutType: this.state.workoutType,
          duration: this.state.duration
      }

      console.log("the data showed");

      axios.post('/api/users/goals', data).then(res => res.data).then(res => {
          if (res.error) {
              this.setState({error: res.error, loading: false});
              return;
          }
      });
         //  alert("Your goal has been successfully submitted" + data.workoutType + data.duration);
        
    }

static defaultProps = {

displayTitle : true,
displayLegend : true,
legendPosition : 'right'

}





render()

{
  return(

<div className="Dashboard2">
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

               
                
               <div className="contentpr">
               <div className="eventnew">
                   <p>Recommendations Based on Your Goal</p>
                   </div>
              
               

               </div>

     <div className="previewnew2">
        
                    <form className="LoginFRec">

            <div className="LoginNRec">
                        <label className="LoginLRec">GOAL:</label>

                        <select className="LoginFieldRec" name="plan" value={this.state.plan} onChange={this.handleChangenn}>
                            <option value="" disabled selected hidden>*Select Goal</option>
                            <option value="workout">Weight loss</option>
                            <option value="diet">Push-ups</option>
                            <option value="diet">Strength Training</option>
                            <option value="diet">Upper Body Exercise</option>
                            <option value="diet">Keto Diet</option>
                            <option value="diet">Endurance Exercise</option>
                            <option value="diet">Low carb Diet</option>
                        </select>
                    </div>



                <button className="filebuttonRec" onClick={this.handleSubmit}>
                        Submit
            </button>
            </form>
            <div className="ImageRec">
            <img className="pic1" src={this.state.imgList[this.state.index]} alt="" width={350} height={370} />
            
            
            </div>    
                </div>
  </div>


  );

}

}

export default recommendation;
    
