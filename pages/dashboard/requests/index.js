import React, { Component } from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import table from 'react-table';



function Requests() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        Axios.post("/api/users/requests").then((response) => {
            console.log(response)
           setRowData(response.data);
        });

       }, []);

    function handleUpdate(email) {
            console.log("in handle update",email)

        const data = {
            email:email,
        flag:1
            
        }
          Axios.post("/api/users/postnew",data).then((response) => {
            console.log(response)
        }).catch((error)=>{
            console.log("error occured",error);
        });

      
        
    }


   function handleUpdatenew(email) {
         console.log("in handle update",email)
         const data = {
            email:email,
        flag:-1
            
        }
          Axios.post("/api/users/posting",data).then((response) => {
            console.log(response)
        }).catch((error)=>{
            console.log("error occured",error);
        });

      
        
    }

    return (
        <div className="Dashboard2">
            <div className="navbar2">

                <a href="/"><i class="fa fa-fw fa-user"></i>Logout</a>
                <a href="/dashboard/HomeAdmin"><i class="fa fa-fw fa-home"></i>Home</a>
                <div class="dropdown">
                    <button class="dropbtn"><i class="fa fa-caret-down"></i>Menu</button>
                    <div class="dropdown-content">
                        <a href="/dashboard/requests">Requests</a>
                        <a href="/dashboard/professionals">Trainers</a>
                        <a href="/dashboard/clients">Clients</a>
                       
                    </div>
                </div>
                <div className="logo">
                    <img className="pic5" src={require('./logo.png')} width={170} height={40} />
                </div>

            </div>
             
           
            <div className="contentp">
            
                <h2 className="valuenew">APPROVAL REQUESTS</h2>
                <div className="boxchild1">

               </div>
                <div className="boxchild3">
                   
                    <table className="table table-dark">

                        <thead className="tableheadnew">
                            <tr>

                                <th scope="col">Name</th>
                               <th scope="col">Email</th>
                                <th scope="col">Speciality</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Location</th>
                                
                                <th scope="col">Request Status</th>

                            </tr>
                        </thead>
                        <tbody className="tablebodynew">
                            {rowData.map((row, i) => <tr key={i}>
                            <td> {row['username']}</td> 
                            <td> {row['email']}</td> 
                            <td> {row['specialty']}</td> 
                            <td> {row['gender']}</td> 
                            <td> {row['location']}</td>  
                            <button className="approve" onClick={()=>handleUpdate(row['email'])}>Approve</button>
                            <button className="reject" onClick={()=>handleUpdatenew(row['email'])}>Reject</button>
                            </tr>)}  


                        </tbody>    
                    </table>
                    <div className="imagebg44">
                        <img className="pic_back" src={require('./bk.jpg')} width={1700} height={350} />
                    </div>
                </div>
                <div className="boxchild2">
                    
                  
                </div>


            </div>



        </div >


    );
}


export default Requests;
