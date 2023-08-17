import React, {useState, useEffect} from "react";
import AppointmentIcon from '../../assets/images/ActiveAppointmentIcon.png';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from "axios";
import config from "../../config";
import classes from './Appointment.module.css';
import {useSearchParams} from "react-router-dom";



function Appointment(){

    let [searchParams] = useSearchParams();
    const [showForm, setShowForm]=useState(false);
    const [newCode,setNewCode]=useState(null)
    const [value, setValue] = useState(new Date());
    const [timeZone, setTimeZone]=useState(null);
    const [selected, setSelected]=useState(null);
    const workingTimes=["09:00","09:30","10:00","10:30", "11:00", "11:30", "12:00", "12:30", "13:00","13:30"];
    const [showHours, setShowHours]=useState(false);
    const [availableHours, setAvailableHours]=useState(null);



    const date = moment(value).format("YYYY-MM-DD");


    useEffect(()=>{
        let code= searchParams.get('code');
        console.log(code)
        checkCode(code)
    }, []);

    const checkCode = async (code) => {
        let formData = new FormData();
        formData.append('code', code);
        try {
            let response = await axios.post(`${config.baseUrl}api/validate-token`, formData
                // , {
                // headers: {
                //     "Authorization": `Bearer ${token}`
                // }
                // }
            )
            setNewCode(code)
            console.log(response.data, "response data code check");
            setShowForm(true);
            //     setNewCode(response.data.data.code)
        } catch (e) {
            console.log(e, "error")
        }
    }


    function showBtnsFunction(ind) {
        if (selected === ind) {
            setSelected(null)
        } else {
            setSelected(ind)
        }
    }



    const handleChangeSelectTimeZone = (e) => {
        setTimeZone(e.target.value)
    }

    const values= {
        date,
        timeZone,

    }

    console.log(values, "values")

    console.log(availableHours, "availableHours")


    const sendDate = async () => {
        // let token = sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('code',newCode);
        formData.append('date', values.date);
        formData.append('timeZone', values.timeZone);
        // setIsLoading(true);
        try {
            let response = await axios.post(`${config.baseUrl}api/get-valid-dates`, formData
                // , {
                // headers: {
                //     "Authorization": `Bearer ${token}`
                // }
                // }
            )
            setAvailableHours(response.data.data.dates)
            if(response.data.success ===true){
                setShowHours (true)
            }
            console.log(response.data, "response data code check");
            //     setIsLoading(false);
            //     setShowForm(true);
            //     setNewCode(response.data.data.code)
        } catch (e) {
            console.log(e, "error")
        }
    }


    let renderTime = availableHours?.map((item, index)=>(
            <div>
                <div style={{display:"flex"}} onClick={()=>showBtnsFunction(index)}>
                    <div className={classes.time} key={index}>
                         {/*onClick={()=>showBtnsFunction(index)}>*/}
                        {item.from}</div>
                    <div className={classes.time} key={index}>
                        {/*onClick={()=>showBtnsFunction(index)}>*/}
                        {item.to}</div>
                </div>
                {selected===index && <div className={classes.buttons}>
                    <div className={classes.cancelBtn} onClick={()=> setSelected(null)}
                    >Cancel</div>
                    <div className={classes.cancelBtn}>Submit</div>
                </div>}
            </div>
        )
    )


    // let renderTime = workingTimes.map((item, index)=>(
    //     <div>
    //         <div className={classes.time} key={index}
    //              onClick={()=>showBtnsFunction(index)}>{item}</div>
    //         {selected===index && <div className={classes.buttons}>
    //             <div className={classes.cancelBtn} onClick={()=> setSelected(null)}
    //             >Cancel</div>
    //             <div className={classes.cancelBtn}>Submit</div>
    //         </div>}
    //     </div>
    //     )
    // )


    return(
        <>
            {showForm  ?
        <div className={classes.appointmentsWhole}>
            <div className={classes.leftPart}>
                <div className={classes.nameSurname}>Liketodev</div>
                <div className={classes.title}>30 Minute Meeting</div>
                <div className={classes.duration}>
                    <img className={classes.iconStyle} src={AppointmentIcon} alt=" "/>30 min
                </div>
            </div>
            <div className={classes.rightPart}>
                <div className={classes.title} style={{marginLeft:"20px"}}>Select a Date & Time</div>
                <div className={classes.middlePart}>
                    <div>
                        <Calendar className={classes.calendarAppointments} onChange={setValue} value={value} />
                        <div>
                        <label className={classes.timeZoneLabel} htmlFor="timeZone">Time zone</label>
                        <select className={classes.timeZoneInput} id="timeZone" name="time_zone"
                                onClick={(e)=>handleChangeSelectTimeZone(e)}>
                            <option value="+5:30">IST India Standard Time GMT+5:30</option>
                            <option value="+6:00">BST Bangladesh Standard Time GMT+6:00</option>
                            <option value="+7:00">VST Vietnam Standard Time GMT+7:00</option>
                            <option value="+8:00">CTT China Taiwan Time GMT+8:00</option>
                            <option value="+9:00">JST Japan Standard Time GMT+9:00</option>
                            <option value="+9:30">ACT Australia Central Time GMT+9:30</option>
                            <option value="+10:0">AET Australia Eastern Time GMT+10:00</option>
                            <option value="+11:00">SST Solomon Standard Time GMT+11:00</option>
                            <option value="+12:00">NST New Zealand Standard Time GMT+12:00</option>
                            <option value="-11:00">MIT Midway Islands Time GMT-11:00</option>
                            <option value="-10:00">HST Hawaii Standard Time GMT-10:00</option>
                            <option value="-9:00">AST Alaska Standard Time GMT-9:00</option>
                            <option value="-8:00">PST Pacific Standard Time GMT-8:00</option>
                            <option value="-7:00">PNT Phoenix Standard Time GMT-7:00</option>
                            <option value="-7:00">MST Mountain Standard Time GMT-7:00</option>
                            <option value="-6:0">CST Central Standard Time GMT-6:00</option>
                            <option value="-5:00">EST Eastern Standard Time GMT-5:00</option>
                            <option value="-5:00">IET Indiana Eastern Standard Time GMT-5:00</option>
                            <option value="-4:00">PRT Puerto Rico and US Virgin Islands Time GMT-4:00</option>
                            <option value="-3:30">CNT Canada Newfoundland Time GMT-3:30</option>
                            <option value="-3:00">AGT Argentina Standard Time GMT-3:00</option>
                            <option value="-3:00">BET Brazil Eastern Time GMT-3:00</option>
                            <option value="-1:00">CAT Central African Time GMT-1:00</option>
                        </select>
                        </div>
                        <button className={classes.checkBtn} onClick={sendDate}>Check available hours</button>
                    </div>
                    {showHours &&
                        <div className={classes.timing}>
                            <div className={classes.timeAndDate}>Wednesday, May 24</div>
                            <div className={classes.timeDiv}>
                                {renderTime}
                            </div>
                            {/*<div className={classes.time}>09:00</div>*/}
                        </div>
                    }
                </div>
            </div>
        </div>
                : <div className={classes.titleNew}>Page not found</div>}
        </>
    )
}


export default Appointment;