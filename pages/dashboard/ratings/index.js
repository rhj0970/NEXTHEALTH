import React,{ Component } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import {FaStar} from "react-icons/fa";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { render } from "react-dom";

const Ratings =() => {
const [rating,setRating] = useState(null);
const [review,setReview] = useState('');
const [plan,setPlan] = useState('');
const [rowData, setRowData] = useState([]);
const [hover,setHover] = useState(null);

    const addRating = (e) => {
        
    Axios.post("/api/users/addratings", {
           
            rating: rating,
         
            review: review,
             plan: plan

        }).then((response) => {
            console.log("test search")
            console.log(plan)
            console.log(rating)
            console.log(review)
            setRowData(response.data)
            console.log(rowData)
        })

     alert("Rating Submitted");
    }

   return (
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
            
          
            
            <div className="contentprate">
            <h2 className="valuenewR">RATINGS AND REVIEWS</h2>
               <form className="LoginFR">
                   
            <div className="LoginNR">

                            
                        <select className="LoginFieldR" name="plan" onChange={(e) => { setPlan(e.target.value) }}>
                            <option value="" disabled selected hidden>Select Plan</option>
                           <option value="Thirty Day fat loss challenge">Thirty Day fat loss challenge</option>
                           <option value="Olympic Bar Training">Olympic Bar Training</option>
                           <option value="Bench and Chest Training">Bench and Chest Training</option> 
                           <option value="High Intensity Cardio">High Intensity Cardio</option>
                           <option value="Weight Lifting">Weight Lifting</option>
                           <option value="Swan Yoga">Swan Yoga</option>
                           <option value="28-Day Ketogenic Diet Plan">28-Day Ketogenic Diet Plan</option>
                           <option value="Intermittent Fasting">Intermittent Fasting</option>
                           <option value="Mediterranean">Mediterranean</option>
                           <option value="Vegan Diet Plan">Vegan Diet Plan</option>
                           <option value="Low Carb">Low Carb</option>
                           <option value="Gluten Free">Gluten Free</option>


                       </select>
                       
                        <label className="LoginR">How many stars out of 5?</label>
                   </div>
                  
    <div className="LoginNR">
    {[...Array(5)].map((star,i) => {
        const ratingValue = i + 1;
        return(

            <label>
                
            <input type="radio" className="rate" value={ratingValue} onClick={()=>setRating(ratingValue)}
             
                />

                
         <FaStar className="star" color={ratingValue <= (hover||rating) ? "#ffc107" : "#e4e5e9"} size={40} onMouseEnter={()=> setHover(ratingValue)}
             onMouseLeave={()=> setHover(null)}/>
         </label>
         );
    })}

                   </div>
                   
     <div className="LoginN">
                            <label className="LoginR2">Reviews: </label>

                        <textarea className="LogintextR" placeholder="*Add Your Review" onChange={(e) => { setReview(e.target.value) }}>  </textarea>
                        </div>
                  
                   <button className="filebuttonrate" onClick={addRating}> Submit </button>
                 
                </form>
               
           </div>
           <div className="imagebg23">
               <img className="pic_backrate" src={require('./happy.jpg')} width={800} height={200} />
           </div>
     </div>
     );
};

export default Ratings;

