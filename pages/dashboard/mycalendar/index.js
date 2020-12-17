import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { Link, NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';


class Calendarclient extends Component {
    constructor(props) {
        super(props);
        this.scheduleData = [{
            Id: 3,
            Subject: 'Testing',
            StartTime: new Date(2018, 1, 11, 9, 0),
            EndTime: new Date(2018, 1, 11, 10, 0),
            IsAllDay: false
        }, {
            Id: 4,
            Subject: 'Vacation',
            StartTime: new Date(2018, 1, 13, 9, 0),
            EndTime: new Date(2018, 1, 13, 10, 0),
            IsAllDay: false
        }];
    }
    onClickAdd() {
        let Data = [{
            Id: 1,
            Subject: 'Conference',
            StartTime: new Date(2018, 1, 20, 9, 0),
            EndTime: new Date(2018, 1, 20, 10, 0),
            IsAllDay: false
        }, {
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2018, 1, 20, 10, 0),
            EndTime: new Date(2018, 1, 20, 11, 30),
            IsAllDay: false
        }];
        this.scheduleObj.addEvent(Data);
    }
    onClickSave() {
        let Data = {
            Id: 3,
            Subject: 'Testing-edited',
            StartTime: new Date(2018, 1, 11, 10, 0),
            EndTime: new Date(2018, 1, 11, 11, 0),
            IsAllDay: false
        };
        this.scheduleObj.saveEvent(Data);
    }
    onClickDelete() {
        this.scheduleObj.deleteEvent(2);
    }
    render() {
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
               
               
           
               
                <div className="contentp2">
                 
                    
                   <div className="event">
                        <p>ADD YOUR EVENTS BY CLICKING ON THE DATE</p>
                   </div>
                    <div className="calendar">
                     <ScheduleComponent ref={t => this.scheduleObj = t} width='100%' height='550px' currentView='Month' eventSettings={{ dataSource: this.scheduleData }}>
                        <ViewsDirective>
                            <ViewDirective option='Day' />
                            <ViewDirective option='Week' />
                            <ViewDirective option='WorkWeek' />
                            <ViewDirective option='Month' />
                        </ViewsDirective>
                        <Inject services={[Day, Week, WorkWeek, Month]} />
                        </ScheduleComponent>
                        </div>
                    </div>
                    
            </div>
        );
    }
}

;

export default Calendarclient;

    