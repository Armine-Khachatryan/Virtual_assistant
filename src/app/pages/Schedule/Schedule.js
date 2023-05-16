import React, {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import NewCalendar from "../../components/NewCalendar/NewCalendar";
import './Schedule.css'


function Schedule(){

    const [value, setValue] = useState(new Date());


    return(
        <>
            <div className="mainStyle">
                <Calendar onChange={setValue} value={value} />
                <NewCalendar/>
            </div>
        </>
    )
}

export default Schedule;