// import React, {useState} from "react";
// import Plus from "../../assets/images/Plus.svg";
// import classes from './ManageTime.module.css';
// import {Checkbox} from "../../UI/Checkbox/Checkbox";
//
//
//
// function ManageTime(){
//
//
//     const [weekdaysData, setWeekDaysData] = useState([
//         {
//             weekday:"Sun",
//
//         },
//         {
//             weekday: "Mon",
//
//         },
//         {
//             weekday: "TUE",
//         },
//         {
//             weekday:  "WED",
//         },
//         {
//             weekday:  "THU",
//         },
//         {
//             weekday:   "FRI"
//         },
//         {
//             weekday:   "SAT"
//         },
//     ])
//
//     const [state, setState]=useState([])
//     const [values, setValues] = useState([]);
//     const [showInputs, setShowInputs]=useState(false)
//
//
//     const onChangeCheckbox = (e, i) => {
//         console.log(e)
//         // const weekDaysDataCopy=[...weekdaysData]
//         const weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
//         weekDaysDataCopy.find((item, index) => index === i).checked = +e.target.checked;
//         if( weekDaysDataCopy[i].showInput){
//             weekDaysDataCopy[i].showInput = false;
//         }
//         else{
//             weekDaysDataCopy[i].showInput = true;
//         }
//         setWeekDaysData(weekDaysDataCopy)
//     };
//
//
//     // const handleChangeSelect = ({target: {name, value}}, i) => {
//     //     const weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
//     //     weekDaysDataCopy.find((item, index) => index === i)[name] =value;
//     //     setWeekDaysData(weekDaysDataCopy);
//     //     // setBody((prev)=>({
//     //     //     ...prev,
//     //     //     [name]: value,
//     //     // }));
//     // }
//
//     // const handleChangeSelect = ({target: {name, value}}, i) => {
//     //     const weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
//     //     weekDaysDataCopy.find((item, index) => index === i)[name] =value;
//     //     setWeekDaysData(weekDaysDataCopy)
//     //     console.log(weekDaysDataCopy, "weekdaysDayacopy")
//     //         // setState({
//     //         //     ...state,
//     //         //     [name]: value,
//     //         // });
//     //     // const weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
//     //     // weekDaysDataCopy.find((item, index) => index === i)[name] =value;
//     //     // setWeekDaysData(weekDaysDataCopy);
//     // }
//
//     console.log(weekdaysData, "weekdaysData");
//     console.log(state, "state")
//
//     const handleChangeSelect = ({target: {name, value}}, i) => {
//         setState({
//             ...state,
//             [name]: value,
//         });
//     }
//
//     const removeItem =(i)=>{
//         const newOne=JSON.parse(JSON.stringify(weekdaysData));
//         newOne.splice(i, 1);
//         setWeekDaysData(newOne);
//     }
//
//     // const addNewSelectInputs = (i)=> {
//     //     if (weekdaysData[i].showFrom || weekdaysData[i].showTo) {
//     //         weekdaysData[i].showFrom = false;
//     //         weekdaysData[i].showTo = false;
//     //     } else {
//     //         weekdaysData[i].showFrom = true;
//     //         weekdaysData[i].showTo = true;
//     //     }
//     //     setWeekDaysData([...weekdaysData])
//     // }
//
//     console.log(state, "state")
//
//     const addNewSelectInputs = (i)=> {
//         const newValues=[];
//         newValues.push(state)
//         setValues(newValues);
//         setShowInputs(true)
//         // if (weekdaysData[i].showFrom || weekdaysData[i].showTo) {
//         //     weekdaysData[i].showFrom = false;
//         //     weekdaysData[i].showTo = false;
//         // } else {
//         //     weekdaysData[i].showFrom = true;
//         //     weekdaysData[i].showTo = true;
//         // }
//         // weekdaysData[i].push(state)
//         // setWeekDaysData([...weekdaysData])
//     }
//
//     console.log(weekdaysData, "WeekDaysData")
//     console.log(values, "values")
//
//
//     const renderCheckboxData=weekdaysData.map((item, index)=>(
//         <div className={classes.manageTimeRow} key={index}>
//             <div className={classes.manageTimeLeft}>
//                 <div className={classes.firstPart}>
//                     <Checkbox
//                         label={item.weekday}
//                         // name={item.weekday}
//                         checked={!!item?.checked || false} //type-y bullean a darnum !! -ov
//                         index={index}
//                         onChange={(e)=>onChangeCheckbox(e, index)}
//                     />
//                 </div>
//                 {weekdaysData[index].showInput ? <>
//                         <div className={classes.secondPart}>
//                             <div className={classes.secondPartInside} style={{display:"flex"}}>
//                                 <div style={{display:"flex"}}>
//                                     <select
//                                         className={classes.fromSelect}
//                                         name="from"
//                                         // value={body.from} nakhnakan value-i hamar
//                                         onChange={(e)=>{handleChangeSelect(e, index)
//                                             console.log(e, "e")}}
//                                     >
//                                         {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(
//                                             (hour) => (
//                                                 <option key={hour} value={hour}  >
//                                                     {hour}
//                                                 </option>
//                                             )
//                                         )}
//                                     </select>
//                                     -
//                                     <select
//                                         className={classes.toSelect}
//                                         name="to"
//                                         // value={body.to}
//                                         onChange={(e)=>handleChangeSelect(e, index)}
//                                         // defaultValue={value.current?.to}
//                                         // disabled={!enabled}
//                                     >
//                                         {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(
//                                             (hour) => (
//                                                 <option key={hour} value={hour} >
//                                                     {hour}
//                                                 </option>
//                                             )
//                                         )}
//                                     </select>
//                                 </div>
//                                 <div className={classes.manageTimeRight}
//                                      onClick={()=>addNewSelectInputs(index)}
//                                     // onClick={()=>setShowNewSelectInput(!showNewSelectInput)}
//                                 ><img src={Plus} alt={""}/></div>
//                             </div>
//                             {showInputs &&
//                                 <div style={{display:"flex"}}>
//                                     <div className={classes.secondPartInside}>
//                                         <select
//                                             className={classes.fromSelect}
//                                             name="from"
//                                             onChange={(e) => handleChangeSelect(e, index)}
//                                         >
//                                             {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(
//                                                 (hour) => (
//                                                     <option key={hour} value={hour}>
//                                                         {hour}
//                                                     </option>
//                                                 )
//                                             )}
//                                         </select>
//                                         -
//                                         <select
//                                             className={classes.toSelect}
//                                             name="to"
//                                             onChange={(e) => handleChangeSelect(e, index)}
//                                         >
//                                             {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(
//                                                 (hour) => (
//                                                     <option key={hour} value={hour}>
//                                                         {hour}
//                                                     </option>
//                                                 )
//                                             )}
//                                         </select>
//                                     </div>
//                                     <div className={classes.manageTimeRight}
//                                          onClick={()=>addNewSelectInputs(index)}
//                                         // onClick={()=>setShowNewSelectInput(!showNewSelectInput)}
//                                     ><img src={Plus} alt={""}/></div>
//                                 </div>
//                             }
//
//                             {/*{weekdaysData[index].showFrom &&*/}
//                             {/*    <div className={classes.secondPartInside}>*/}
//                             {/*        <select*/}
//                             {/*            className={classes.fromSelect}*/}
//                             {/*            name="from"*/}
//                             {/*            onChange={(e)=>handleChangeSelect(e, index)}*/}
//                             {/*        >*/}
//                             {/*            {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(*/}
//                             {/*                (hour) => (*/}
//                             {/*                    <option key={hour} value={hour}>*/}
//                             {/*                        {hour}*/}
//                             {/*                    </option>*/}
//                             {/*                )*/}
//                             {/*            )}*/}
//                             {/*        </select>*/}
//                             {/*        -*/}
//                             {/*        <select*/}
//                             {/*            className={classes.toSelect}*/}
//                             {/*            name="to"*/}
//                             {/*            onChange={(e)=>handleChangeSelect(e, index)}*/}
//                             {/*        >*/}
//                             {/*            {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(*/}
//                             {/*                (hour) => (*/}
//                             {/*                    <option key={hour} value={hour}>*/}
//                             {/*                        {hour}*/}
//                             {/*                    </option>*/}
//                             {/*                )*/}
//                             {/*            )}*/}
//                             {/*        </select>*/}
//                             {/*    </div>*/}
//                             {/*}*/}
//                         </div>
//                         {/*<div className={classes.thirdPart} onClick={()=>removeItem(index)}>*/}
//                         {/*    <img className={classes.trashImg} src={Trash} alt={""}/>*/}
//                         {/*</div>*/}
//
//                     </>
//                     :     <div className={classes.unAwailable}>Unavailable</div>
//                 }
//             </div>
//             {/*<div className={classes.manageTimeRight}*/}
//             {/*     onClick={()=>addNewSelectInputs(index)}*/}
//             {/*    // onClick={()=>setShowNewSelectInput(!showNewSelectInput)}*/}
//             {/*><img src={Plus} alt={""}/></div>*/}
//         </div>
//     ))
//
//
//     return(
//         <div className={classes.manageTimeWhole}>
//             <div className={classes.manageTimeUpPart}>
//                 <div className={classes.manageTimeTitle}>Set your weekly hours</div>
//                 <div className={classes.buttonDiv}>Save</div>
//             </div>
//             <div className={classes.manageTimeDown}>
//                 {renderCheckboxData}
//             </div>
//         </div>
//     )
// }
//
//
// export default ManageTime;
//
//
//
//
