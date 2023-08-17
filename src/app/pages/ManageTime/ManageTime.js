import React, {useEffect, useState} from "react";
import Trash from "../../assets/images/Trash.svg";
import Plus from "../../assets/images/Plus.svg";
import classes from './ManageTime.module.css';
import {Checkbox} from "../../UI/Checkbox/Checkbox";
import axios from "axios";
import config from "../../config";
import {setUserData} from "../../features/User/UserSlice";



function ManageTime(){

    const [timeZone, setTimeZone]=useState(null)
    const [weekdaysData, setWeekDaysData] = useState([
        {
            weekday: "Mon",
            day_N: 1,
            time: [],
            checked: false
        },
        {
            weekday: "TUE",
            day_N: 2,
            time: [],
            checked: false
        },
        {
            weekday:  "WED",
            day_N: 3,
            time: [],
            checked: false
        },
        {
            weekday:  "THU",
            day_N: 4,
            time: [],
            checked: false
        },
        {
            weekday:   "FRI",
            day_N: 5,
            time: [],
            checked: false
        },
        {
            weekday:   "SAT",
            day_N: 6,
            time: [],
            checked: false
        },
        {
            weekday:"Sun",
            day_N: 7,
            time: [],
            checked: false
        }
    ])



    useEffect(() => {
        getWeeklyAvailableHours();
    }, []);

    let getWeeklyAvailableHours = async () => {
        let token= sessionStorage.getItem('token')
        try {
            let response = await axios.get(`${config.baseUrl}api/my-profile/schedules`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data, "response data")
            console.log(response.data.data.schedules, "schedules");
            // const weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
            const weekDaysDataCopy = [...weekdaysData];
                console.log(weekDaysDataCopy, "weekdaysdatacopy");
            for (const [key, value] of Object.entries(response.data.data.schedules)) {
                console.log(`${key}: ${value}`, value);
                weekDaysDataCopy[key-1].time = value;
                weekDaysDataCopy[key-1].checked =true
            }
            setWeekDaysData(weekDaysDataCopy);
            console.log(weekdaysData)
        } catch (error) {
            console.log(error.response, 'auth request  error response');
        }
    }

    console.log(weekdaysData, 1111);

    const onChangeCheckbox = (e, i) => {
        console.log(e)
        const weekDaysDataCopy = [...weekdaysData];
        weekDaysDataCopy.find((item, index) => index === i).checked = e.target.checked;
        weekDaysDataCopy.find((item, index) => index === i).time=[{from: "", to: ""}];
        setWeekDaysData(weekDaysDataCopy)
    };


    const handleChangeSelect = ({target: {name, value}}, i, ix) => {
        let weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
        let item= weekDaysDataCopy.find((item, index) => index === i).time;
        item.find((it, index) => index === ix)[name]=value
        setWeekDaysData(weekDaysDataCopy)
    }

    const handleChangePlus =(i)=>{
        let weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
         weekDaysDataCopy.find((item, index) => index === i).time.push({from: "", to: ""})
        setWeekDaysData(weekDaysDataCopy)
    }
    console.log(weekdaysData, "needed")

    const deleteItem =(i)=>{
        let weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
        weekDaysDataCopy.find((item, index) => index === i).time.splice(-1);
        setWeekDaysData(weekDaysDataCopy)
    }

    const handleChangeSelectTimeZone = (e) => {
     setTimeZone(e.target.value)
    }



    console.log(timeZone, 222222222)

    const values= {
        weekdaysData,
        timeZone
    }




    let saveData = async () => {
        let token= sessionStorage.getItem('token');
        try {
            let response = await axios.post(`${config.baseUrl}api/my-profile/insert-schedule`, values, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response);
        }
        catch (error) {
            console.log(error, "error message")
        }
    }

    console.log(weekdaysData, "weekdaysData")

    //
    // let timeArray = [];
    // let d = new Date();
    // let h = d.getHours();
    // let m = d.getMinutes();
    //
    // for (let i = h; i <= 24; i++) {
    //     for (let j = m; j <= 59; j++) {
    //         if (j % 15 === 0) {
    //             j = j === 0 ? '00' : j;
    //             if (i >= 12) {
    //                 timeArray.push((i - 12) + ':' + j + ' PM');
    //             } else {
    //                 timeArray.push(i + ':' + j + ' AM');
    //             }
    //         }
    //     }
    //     console.log(timeArray, "timeArray")
    // }

    let arr = [];
    for (let i=0; i < 24; i++) {
        for (let j=0; j < 2; j++) {
            if(i<10){
                arr.push(`${0}${i}:${j === 0 ? `00` : 30*j}`);
            }
            else{
                arr.push(`${i}:${j === 0 ? `00` : 30*j}`);
            }
        }
    }
    console.log(arr, 1111111111)

    const renderCheckboxData=weekdaysData?.map((item, index)=> (
        <div className={classes.manageTimeRow} key={index}>
            <div className={classes.manageTimeLeft}>
                <div className={classes.firstPart}>
                    <Checkbox
                        label={item.weekday}
                        // name={item.weekday}
                        checked={!!item?.checked || false} //type-y bullean a darnum !! -ov
                        index={index}
                        onChange={(e) => onChangeCheckbox(e, index)}
                    />
                </div>
                <div>
                    { console.log(weekdaysData, "weekdaysData in render checkbox")}
                    {weekdaysData[index].checked && item.time.map((single, indx) => (
                        <div className={classes.secondPart} key={indx}>
                            <div className={classes.secondPartInside} style={{display: "flex"}}>
                                <div style={{display: "flex"}}>
                                    <select
                                        className={classes.fromSelect}
                                        name="from"
                                        value={single.from}
                                        // defaultValue={value.current?.from}
                                        // value={single.from}
                                        onChange={(e) => {
                                            handleChangeSelect(e, index, indx)
                                            console.log(e, "e")
                                        }}
                                    >
                                        {/*{Array.from({length: 24}, (_, i) => i + 0 + ":00").map(*/}
                                        {arr.map( (item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    -
                                    <select
                                        className={classes.toSelect}
                                        name="to"
                                        value={single.to}
                                        // value={body.to}
                                        onChange={(e) => handleChangeSelect(e, index, indx)}
                                        // defaultValue={value.current?.to}
                                        // disabled={!enabled}
                                    >
                                        {arr.map( (item) => (
                                            <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {weekdaysData[index].checked &&
                    <div style={{display: "flex"}}>
                        <div className={classes.manageTimeRight}
                             onClick={() => handleChangePlus(index)}>
                            <img src={Plus} alt={""}/>
                        </div>
                        <div className={classes.trash} onClick={() => deleteItem(index)}>
                            <img src={Trash} alt={""}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    ))


    return(
        <div className={classes.manageTimeWhole}>
            <div className={classes.manageTimeUpPart}>
                <div className={classes.manageTimeTitle}>Set your weekly hours</div>
                <div className={classes.buttonDiv} onClick={saveData}>Save</div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div className={classes.manageTimeDown}>
                    {renderCheckboxData}
                </div>
                <div>
                    <div>
                        <label className={classes.timeZoneLabel} htmlFor="timeZone">Time zone</label>
                        <select className={classes.timeZoneInput} id="timeZone" name="time_zone"
                                onClick={(e)=>handleChangeSelectTimeZone(e)}>
                            <option value="" disabled selected hidden>Select Time Zone</option>
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
                </div>
            </div>
        </div>
    )
}


export default ManageTime;




