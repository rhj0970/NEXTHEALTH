import React,{Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

class Chart extends Component{
  
  constructor(props)
  {

  super(props);
  this.state={

    Calorie: '',
     Date: '',
           
   chartData: {

   labels: [
   
    ],
   datasets:[{

    label: 'Calories',
    data: [
  

    ],

    backgroundColor: 'rgba(100,183,237,0.6)',

   }]

   }

  };


this.handleChange = this.handleChange.bind(this)
this.handleChangen = this.handleChangen.bind(this)
this.handleSubmit = this.handleSubmit.bind(this);


}



  

  componentDidMount() {
    let labelsArr =[]  // dates 
    let dataArr = []  //calories
    //const [calories, setCalories] = useState([]);
    //const [dates, setDates] = useState([]);
    axios.post("/api/users/getCalories").then((response) => {
        console.log("it's testing for calories")
        this.setState({test:1})
        //this.setState({labels: response.data})
        for (const dataObj of response.data) {
          if(dataObj.date !== null){
            labelsArr.push(dataObj.date)
            this.setState({chartData: {
              ...this.state.chartData,
              labels: [
                ...this.state.chartData.labels,
               dataObj.date.substring(0,10)
              ]
            }});
            //this.state.labels.push(dataObj.date)
            console.log("date check : ",dataObj.date.substring(0,10))
          }
            
          if(dataObj.calories !== null){
            dataArr.push(dataObj.calories)
            this.state.chartData.datasets[0].data.push(dataObj.calories)
            this.setState({}); // forces a refresh
            //this.state.calories.push(dataObj.date)
          }  
            console.log(this.state.chartData.labels)
            console.log(this.state.chartData.datasets[0].data)
          console.log(labelsArr);
          console.log(dataArr);
          console.log("2020-10-22T04:00:00.000Z")

        }


     // setRowData(response.data);
    });


 
  };


 



handleChangen(event) {
  this.setState({
      calories: event.target.value
  })
}


handleChange(event) {
        this.setState({
           date:event.target.value
        })
    }



    handleSubmit(e) {
      e.preventDefault()
      const data = {
          date: this.state.date,
          calories: this.state.calories
      }

      console.log("the data showed");

      axios.post('/api/users/calories', data).then(res => res.data).then(res => {
          if (res.error) {
              this.setState({error: res.error, loading: false});
              return;
          }
      });
           alert("Value submitted" + data.date + data.calories);
        
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
               
                
               <div className="contentp2">
               <div className="eventC">
                   <p>LAST 7 DAYS CALORIE TREND</p>
                   </div>
              
               <form className="LoginFnew">

               <div className="LoginNnew">
                        <label className="LoginLnew">ADD CALORIES: </label>

                        <input type="text" className="LoginFieldnew" placeholder="*Enter Calorie Intake"  name="Calorie" value={this.state.calories} onChange={this.handleChangen} />
                        </div>

                        <div className="LoginNnew">
                            <label className="LoginLnew">DATE:</label>

      <input type="text" className="LoginFieldnew" placeholder="*yyyy-mm-dd"  name="Date"  value={this.state.date} onChange={this.handleChange} />

                        </div>
                   <button className="filebuttonnew" onClick={this.handleSubmit}>
                            Submit
                </button>
               </form>

               </div>

     <div className="previewnew">

                    <Bar 
   data={this.state.chartData}
   options={{

    title:{
    display : this.props.displayTitle,
   //text : 'Calorie Tracking',
    fontSize:25

    },
    legend : {

      display:this.props.displayLegend,
      position: this.props.legendPosition
    }

   }}
   />
                    
                </div>
  </div>


  );

}

}

export default Chart;
