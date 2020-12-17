import React, { Component } from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import table from 'react-table';

import { Head } from 'next/head';

function ClientList() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        Axios.post("/api/users/clients").then((response) => {
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
            
                <h2 className="valuenew2">Next-Health Clients</h2>
                
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
                <div className="imagebg2">
                     <img className="pic_back" src={require('./cc2.jpg')} width={1150} height={440} />
                    </div>


            </div>



        </div >


    );
}


export default ClientList;
