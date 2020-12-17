import React, { Component } from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import table from 'react-table';



function Professional() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        Axios.post("/api/users/professional").then((response) => {
            console.log(response)
           setRowData(response.data);
        });

       }, []);

    function handleClick(e) {

        e.preventDefault();
        console.log('The link was clicked.');
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



            <div className="contentp2">
            
                <h2 className="valuenew">Next-Health Professionals</h2>
                
                <div className="boxchildnew">
                   
                    <table className="table table-dark">

                        <thead className="tableheadnew">
                            <tr>

                                <th scope="col">Name</th>
                               <th scope="col">Email</th>
                                
                            </tr>
                        </thead>
                        <tbody className="tablebodynew">
                            {rowData.map((row, i) => <tr key={i}>
                            <td> {row['username']}</td> 
                            <td> {row['email']}</td> 
                            </tr>)}   


                        </tbody>
                    </table>

                </div>
               
               <div className="imagebg4">
                     <img className="pic_back" src={require('./bring.png')} width={900} height={290} />
                    </div>

            </div>



        </div >


    );
}


export default Professional;
