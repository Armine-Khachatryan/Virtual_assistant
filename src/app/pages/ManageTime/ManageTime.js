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
            for (const [key, value] of Object.entries(response.data.data.schedules)) {
                console.log(`${key}: ${value}`, value);
                weekDaysDataCopy[key-1].time = value;
                weekDaysDataCopy[key-1].checked =true
            }
            setWeekDaysData(weekDaysDataCopy);
        } catch (error) {
            console.log(error.response, 'auth request  error response');
        }
    }


    const onChangeCheckbox = (e, i) => {
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


    const deleteItem =(i)=>{
        let weekDaysDataCopy = JSON.parse(JSON.stringify(weekdaysData));
        weekDaysDataCopy.find((item, index) => index === i).time.splice(-1);
        setWeekDaysData(weekDaysDataCopy)
    }

    const handleChangeSelectTimeZone = (e) => {
     setTimeZone(e.target.value)
    }


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

    // let arr = [];
    // for (let i=0; i < 24; i++) {
    //     for (let j=0; j < 2; j++) {
    //         if(i<10){
    //             arr.push(`${0}${i}:${j === 0 ? `00` : 30*j}`);
    //         }
    //         else{
    //             arr.push(`${i}:${j === 0 ? `00` : 30*j}`);
    //         }
    //     }
    // }
    // console.log(arr, 1111111111)

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
                                        {Array.from({length: 24}, (_, i) => i + 0 + ":00").map(  (hour) => (
                                        // {arr.map( (item) => (
                                                <option key={hour} value={hour} >
                                                    {hour}
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
                                        {Array.from({length: 24}, (_, i) => i + 1 + ":00").map(
                                            (hour) => (
                                                <option key={hour} value={hour} >
                                                    {hour}
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
                            <option value="" disabled selected hidden> Select Time Zone</option>
                            <option value="+0:00">UTC Coordinated Universal Time UTC </option>
                            <option value="+0:00">WT Western Sahara Standard Time UTC +0:00</option>
                            <option value="+0:00">AZOST Azores Summer Time UTC +0:00</option>
                            <option value="+0:00">GMT Greenwich Mean Time UTC +0:00</option>
                            <option value="+0:00">WET Western European Time UTC +0:00</option>
                            <option value="+0:00">Z Zulu Time Zone UTC +0:00</option>
                            <option value="+0:00">EGST Eastern Greenland Summer Time UTC +0:00</option>
                            <option value="+1:00">WAT West Africa Time UTC +1:00</option>
                            <option value="+1:00">WST Western Sahara Summer Time UTC +1:00</option>
                            <option value="+1:00">BST British Summer Time UTC +1:00</option>
                            <option value="+1:00">CET Central European Time UTC +1:00</option>
                            <option value="+1:00">IST Irish Standard Time UTC +1:00</option>
                            <option value="+1:00">WEST Western European Summer Time UTC +1:00</option>
                            <option value="+1:00">A Alpha Time Zone UTC +1:00</option>
                            <option value="+10:00">DDUT Dumont-d'Urville Time UTC +10:0</option>
                            <option value="+10:00">MAGT Magadan Time UTC +10:0</option>
                            <option value="+10:00">SAKT Sakhalin Time UTC +10:0</option>
                            <option value="+10:00">VLAT Vladivostok Time UTC +10:0</option>
                            <option value="+10:00">YAKST Yakutsk Summer Time UTC +10:0</option>
                            <option value="+10:00">AEST Australian Eastern Standard Time UTC +10:0</option>
                            <option value="+10:00">K Kilo Time Zone UTC +10:0</option>
                            <option value="+10:00">CHST Chamorro Standard Time UTC +10:0</option>
                            <option value="+10:00">CHUT Chuuk Time UTC +10:0</option>
                            <option value="+10:00">PGT Papua New Guinea Time UTC +10:0</option>
                            <option value="+10:00">YAPT Yap Time UTC +10:0</option>
                            <option value="+10:30">ACDT Australian Central Daylight Time UTC +10:3</option>
                            <option value="+10:30">LHST Lord Howe Standard Time UTC +10:3</option>
                            <option value="+11:00">SRET Srednekolymsk Time UTC +11:0</option>
                            <option value="+11:00">VLAST Vladivostok Summer Time UTC +11:0</option>
                            <option value="+11:00">AEDT Australian Eastern Daylight Time UTC +11:0</option>
                            <option value="+11:00">LHDT Lord Howe Daylight Time UTC +11:0</option>
                            <option value="+11:00">L Lima Time Zone UTC +11:0</option>
                            <option value="+11:00">BST Bougainville Standard Time UTC +11:0</option>
                            <option value="+11:00">KOST Kosrae Time UTC +11:0</option>
                            <option value="+11:00">NCT New Caledonia Time UTC +11:0</option>
                            <option value="+11:00">PONT Pohnpei Standard Time UTC +11:0</option>
                            <option value="+11:00">SBT Solomon Islands Time UTC +11:0</option>
                            <option value="+11:00">VUT Vanuatu Time UTC +11:0</option>
                            <option value="+11:30">NFT Norfolk Time UTC +11:3</option>
                            <option value="+12:00">ANAST Anadyr Summer Time UTC +12:0</option>
                            <option value="+12:00">ANAT Anadyr Time UTC +12:0</option>
                            <option value="+12:00">MAGST Magadan Summer Time UTC +12:0</option>
                            <option value="+12:00">PETST Kamchatka Summer Time UTC +12:0</option>
                            <option value="+12:00">PETT Kamchatka Time UTC +12:0</option>
                            <option value="+12:00">M Mike Time Zone UTC +12:0</option>
                            <option value="+12:00">FJT Fiji Time UTC +12:0</option>
                            <option value="+12:00">GILT Gilbert Island Time UTC +12:0</option>
                            <option value="+12:00">MHT Marshall Islands Time UTC +12:0</option>
                            <option value="+12:00">NRT Nauru Time UTC +12:0</option>
                            <option value="+12:00">NZST New Zealand Standard Time UTC +12:0</option>
                            <option value="+12:00">TVT Tuvalu Time UTC +12:0</option>
                            <option value="+12:00">WAKT Wake Time UTC +12:0</option>
                            <option value="+12:00">WFT Wallis and Futuna Time UTC +12:0</option>
                            <option value="+12:45">CHAST Chatham Island Standard Time UTC +12:4</option>
                            <option value="+13:00">FJST Fiji Summer Time UTC +13:0</option>
                            <option value="+13:00">NZDT New Zealand Daylight Time UTC +13:0</option>
                            <option value="+13:00">PHOT Phoenix Island Time UTC +13:0</option>
                            <option value="+13:00">TKT Tokelau Time UTC +13:0</option>
                            <option value="+13:00">TOT Tonga Time UTC +13:0</option>
                            <option value="+13:00">WST West Samoa Time UTC +13:0</option>
                            <option value="+13:45">CHADT Chatham Island Daylight Time UTC +13:4</option>
                            <option value="+14:00">LINT Line Islands Time UTC +14:0</option>
                            <option value="+2:00">CAT Central Africa Time UTC +2:00</option>
                            <option value="+2:00">SAST South Africa Standard Time UTC +2:00</option>
                            <option value="+2:00">WAST West Africa Summer Time UTC +2:00</option>
                            <option value="+2:00">IST Israel Standard Time UTC +2:00</option>
                            <option value="+2:00">CEST Central European Summer Time UTC +2:00</option>
                            <option value="+2:00">EET Eastern European Time UTC +2:00</option>
                            <option value="+2:00">B Bravo Time Zone UTC +2:00</option>
                            <option value="+3:00">EAT Eastern Africa Time UTC +3:00</option>
                            <option value="+3:00">SYOT Syowa Time UTC +3:00</option>
                            <option value="+3:00">ADT Arabia Daylight Time UTC +3:00</option>
                            <option value="+3:00">AST Arabia Standard Time UTC +3:00</option>
                            <option value="+3:00">IDT Israel Daylight Time UTC +3:00</option>
                            <option value="+3:00">EEST Eastern European Summer Time UTC +3:00</option>
                            <option value="+3:00">FET Further-Eastern European Time UTC +3:00</option>
                            <option value="+3:00">MSK Moscow Standard Time UTC +3:00</option>
                            <option value="+3:00">C Charlie Time Zone UTC +3:00</option>
                            <option value="+3:30">IRST Iran Standard Time UTC +3:30</option>
                            <option value="+4:00">MUT Mauritius Time UTC +4:00</option>
                            <option value="+4:00">RET Reunion Time UTC +4:00</option>
                            <option value="+4:00">SCT Seychelles Time UTC +4:00</option>
                            <option value="+4:00">AMT Armenia Time UTC +4:00</option>
                            <option value="+4:00">AZT Azerbaijan Time UTC +4:00</option>
                            <option value="+4:00">GET Georgia Standard Time UTC +4:00</option>
                            <option value="+4:00">GST Gulf Standard Time UTC +4:00</option>
                            <option value="+4:00">KUYT Kuybyshev Time UTC +4:00</option>
                            <option value="+4:00">MSD Moscow Daylight Time UTC +4:00</option>
                            <option value="+4:00">SAMT Samara Time UTC +4:00</option>
                            <option value="+4:00">D Delta Time Zone UTC +4:00</option>
                            <option value="+4:30">AFT Afghanistan Time UTC +4:30</option>
                            <option value="+4:30">IRDT Iran Daylight Time UTC +4:30</option>
                            <option value="+5:00">MAWT Mawson Time UTC +5:00</option>
                            <option value="+5:00">AMST Armenia Summer Time UTC +5:00</option>
                            <option value="+5:00">AQTT Aqtobe Time UTC +5:00</option>
                            <option value="+5:00">AZST Azerbaijan Summer Time UTC +5:00</option>
                            <option value="+5:00">MVT Maldives Time UTC +5:00</option>
                            <option value="+5:00">ORAT Oral Time UTC +5:00</option>
                            <option value="+5:00">PKT Pakistan Standard Time UTC +5:00</option>
                            <option value="+5:00">TJT Tajikistan Time UTC +5:00</option>
                            <option value="+5:00">TMT Turkmenistan Time UTC +5:00</option>
                            <option value="+5:00">UZT Uzbekistan Time UTC +5:00</option>
                            <option value="+5:00">YEKT Yekaterinburg Time UTC +5:00</option>
                            <option value="+5:00">TFT French Southern and Antarctic Time UTC +5:00</option>
                            <option value="+5:00">E Echo Time Zone UTC +5:00</option>
                            <option value="+5:30">IST India Standard Time UTC +5:30</option>
                            <option value="+5:45">NPT Nepal Time UTC +5:45</option>
                            <option value="+6:00">VOST Vostok Time UTC +6:00</option>
                            <option value="+6:00">ALMT Alma-Ata Time UTC +6:00</option>
                            <option value="+6:00">BST Bangladesh Standard Time UTC +6:00</option>
                            <option value="+6:00">BTT Bhutan Time UTC +6:00</option>
                            <option value="+6:00">KGT Kyrgyzstan Time UTC +6:00</option>
                            <option value="+6:00">OMST Omsk Standard Time UTC +6:00</option>
                            <option value="+6:00">QYZT Qyzylorda Time UTC +6:00</option>
                            <option value="+6:00">YEKST Yekaterinburg Summer Time UTC +6:00</option>
                            <option value="+6:00">IOT Indian Chagos Time UTC +6:00</option>
                            <option value="+6:00">F Foxtrot Time Zone UTC +6:00</option>
                            <option value="+6:30">MMT Myanmar Time UTC +6:30</option>
                            <option value="+6:30">CCT Cocos Islands Time UTC +6:30</option>
                            <option value="+7:00">DAVT Davis Time UTC +7:00</option>
                            <option value="+7:00">HOVT Hovd Time UTC +7:00</option>
                            <option value="+7:00">ICT Indochina Time UTC +7:00</option>
                            <option value="+7:00">KRAT Krasnoyarsk Time UTC +7:00</option>
                            <option value="+7:00">NOVST Novosibirsk Summer Time UTC +7:00</option>
                            <option value="+7:00">NOVT Novosibirsk Time UTC +7:00</option>
                            <option value="+7:00">OMSST Omsk Summer Time UTC +7:00</option>
                            <option value="+7:00">WIB Western Indonesian Time UTC +7:00</option>
                            <option value="+7:00">CXT Christmas Island Time UTC +7:00</option>
                            <option value="+7:00">G Golf Time Zone UTC +7:00</option>
                            <option value="+8:00">CAST Casey Time UTC +8:00</option>
                            <option value="+8:00">BNT Brunei Darussalam Time UTC +8:00</option>
                            <option value="+8:00">CHOT Choibalsan Time UTC +8:00</option>
                            <option value="+8:00">CST China Standard Time UTC +8:00</option>
                            <option value="+8:00">HKT Hong Kong Time UTC +8:00</option>
                            <option value="+8:00">IRKT Irkutsk Time UTC +8:00</option>
                            <option value="+8:00">KRAST Krasnoyarsk Summer Time UTC +8:00</option>
                            <option value="+8:00">MYT Malaysia Time UTC +8:00</option>
                            <option value="+8:00">PHT Philippine Time UTC +8:00</option>
                            <option value="+8:00">SGT Singapore Time UTC +8:00</option>
                            <option value="+8:00">ULAT Ulaanbaatar Time UTC +8:00</option>
                            <option value="+8:00">WITA Central Indonesian Time UTC +8:00</option>
                            <option value="+8:00">AWST Australian Western Standard Time UTC +8:00</option>
                            <option value="+8:00">H Hotel Time Zone UTC +8:00</option>
                            <option value="+8:45">ACWST Australian Central Western Standard Time UTC +8:45</option>
                            <option value="+9:00">IRKST Irkutsk Summer Time UTC +9:00</option>
                            <option value="+9:00">JST Japan Standard Time UTC +9:00</option>
                            <option value="+9:00">KST Korea Standard Time UTC +9:00</option>
                            <option value="+9:00">TLT East Timor Time UTC +9:00</option>
                            <option value="+9:00">WIT Eastern Indonesian Time UTC +9:00</option>
                            <option value="+9:00">YAKT Yakutsk Time UTC +9:00</option>
                            <option value="+9:00">AWDT Australian Western Daylight Time UTC +9:00</option>
                            <option value="+9:00">I India Time Zone UTC +9:00</option>
                            <option value="+9:00">PWT Palau Time UTC +9:00</option>
                            <option value="+9:30">ACST Australian Central Standard Time UTC +9:30</option>
                            <option value="-1:00">CVT Cape Verde Time UTC -1:00</option>
                            <option value="-1:00">AZOT Azores Time UTC -1:00</option>
                            <option value="-1:00">N November Time Zone UTC -1:00</option>
                            <option value="-1:00">EGT East Greenland Time UTC -1:00</option>
                            <option value="-10:00">W Whiskey Time Zone UTC -10:0</option>
                            <option value="-10:00">HAST Hawaii-Aleutian Standard Time UTC -10:0</option>
                            <option value="-10:00">CKT Cook Island Time UTC -10:0</option>
                            <option value="-10:00">TAHT Tahiti Time UTC -10:0</option>
                            <option value="-11:00">X X-ray Time Zone UTC -11:0</option>
                            <option value="-11:00">NUT Niue Time UTC -11:0</option>
                            <option value="-11:00">SST Samoa Standard Time UTC -11:0</option>
                            <option value="-12:00">Y Yankee Time Zone UTC -12:0</option>
                            <option value="-12:00">AOE Anywhere on Earth UTC -12:0</option>
                            <option value="-2:00">O Oscar Time Zone UTC -2:00</option>
                            <option value="-2:00">PMDT Pierre & Miquelon Daylight Time UTC -2:00</option>
                            <option value="-2:00">WGST Western Greenland Summer Time UTC -2:00</option>
                            <option value="-2:00">BRST Brasília Summer Time UTC -2:00</option>
                            <option value="-2:00">FNT Fernando de Noronha Time UTC -2:00</option>
                            <option value="-2:00">GST South Georgia Time UTC -2:00</option>
                            <option value="-2:00">UYST Uruguay Summer Time UTC -2:00</option>
                            <option value="-3:00">ROTT Rothera Time UTC -3:00</option>
                            <option value="-3:00">P Papa Time Zone UTC -3:00</option>
                            <option value="-3:00">ADT Atlantic Daylight Time UTC -3:00</option>
                            <option value="-3:00">PMST Pierre & Miquelon Standard Time UTC -3:00</option>
                            <option value="-3:00">WGT West Greenland Time UTC -3:00</option>
                            <option value="-3:00">AMST Amazon Summer Time UTC -3:00</option>
                            <option value="-3:00">ART Argentina Time UTC -3:00</option>
                            <option value="-3:00">BRT Brasília Time UTC -3:00</option>
                            <option value="-3:00">CLST Chile Summer Time UTC -3:00</option>
                            <option value="-3:00">CLT Chile Standard Time UTC -3:00</option>
                            <option value="-3:00">FKST Falkland Islands Summer Time UTC -3:00</option>
                            <option value="-3:00">GFT French Guiana Time UTC -3:00</option>
                            <option value="-3:00">PYST Paraguay Summer Time UTC -3:00</option>
                            <option value="-3:00">SRT Suriname Time UTC -3:00</option>
                            <option value="-3:00">UYT Uruguay Time UTC -3:00</option>
                            <option value="-3:00">WARST Western Argentine Summer Time UTC -3:00</option>
                            <option value="-4:00">CDT Cuba Daylight Time UTC -4:00</option>
                            <option value="-4:00">CIDST Cayman Islands Daylight Saving Time UTC -4:00</option>
                            <option value="-4:00">Q Quebec Time Zone UTC -4:00</option>
                            <option value="-4:00">AST Atlantic Standard Time UTC -4:00</option>
                            <option value="-4:00">EDT Eastern Daylight Time UTC -4:00</option>
                            <option value="-4:00">AMT Amazon Time UTC -4:00</option>
                            <option value="-4:00">BOT Bolivia Time UTC -4:00</option>
                            <option value="-4:00">FKT Falkland Island Time UTC -4:00</option>
                            <option value="-4:00">GYT Guyana Time UTC -4:00</option>
                            <option value="-4:00">PYT Paraguay Time UTC -4:00</option>
                            <option value="-5:00">CIST Cayman Islands Standard Time UTC -5:00</option>
                            <option value="-5:00">CST Cuba Standard Time UTC -5:00</option>
                            <option value="-5:00">R Romeo Time Zone UTC -5:00</option>
                            <option value="-5:00">CDT Central Daylight Time UTC -5:00</option>
                            <option value="-5:00">EST Eastern Standard Time UTC -5:00</option>
                            <option value="-5:00">EASST Easter Island Summer Time UTC -5:00</option>
                            <option value="-5:00">EAST Easter Island Standard Time UTC -5:00</option>
                            <option value="-5:00">ACT Acre Time UTC -5:00</option>
                            <option value="-5:00">COT Colombia Time UTC -5:00</option>
                            <option value="-5:00">ECT Ecuador Time UTC -5:00</option>
                            <option value="-5:00">PET Peru Time UTC -5:00</option>
                            <option value="-6:00">S Sierra Time Zone UTC -6:00</option>
                            <option value="-6:00">CST Central Standard Time UTC -6:00</option>
                            <option value="-6:00">MDT Mountain Daylight Time UTC -6:00</option>
                            <option value="-6:00">GALT Galapagos Time UTC -6:00</option>
                            <option value="-7:00">T Tango Time Zone UTC -7:00</option>
                            <option value="-7:00">MST Mountain Standard Time UTC -7:00</option>
                            <option value="-7:00">PDT Pacific Daylight Time UTC -7:00</option>
                            <option value="-8:00">U Uniform Time Zone UTC -8:00</option>
                            <option value="-8:00">AKDT Alaska Daylight Time UTC -8:00</option>
                            <option value="-8:00">PST Pacific Standard Time UTC -8:00</option>
                            <option value="-8:00">PST Pitcairn Standard Time UTC -8:00</option>
                            <option value="-9:00">V Victor Time Zone UTC -9:00</option>
                            <option value="-9:00">AKST Alaska Standard Time UTC -9:00</option>
                            <option value="-9:00">HADT Hawaii-Aleutian Daylight Time UTC -9:00</option>
                            <option value="-9:00">GAMT Gambier Time UTC -9:00</option>

                            {/*<option value="+5:30">IST India Standard Time GMT+5:30</option>*/}
                            {/*<option value="+6:00">BST Bangladesh Standard Time GMT+6:00</option>*/}
                            {/*<option value="+7:00">VST Vietnam Standard Time GMT+7:00</option>*/}
                            {/*<option value="+8:00">CTT China Taiwan Time GMT+8:00</option>*/}
                            {/*<option value="+9:00">JST Japan Standard Time GMT+9:00</option>*/}
                            {/*<option value="+9:30">ACT Australia Central Time GMT+9:30</option>*/}
                            {/*<option value="+10:0">AET Australia Eastern Time GMT+10:00</option>*/}
                            {/*<option value="+11:00">SST Solomon Standard Time GMT+11:00</option>*/}
                            {/*<option value="+12:00">NST New Zealand Standard Time GMT+12:00</option>*/}
                            {/*<option value="-11:00">MIT Midway Islands Time GMT-11:00</option>*/}
                            {/*<option value="-10:00">HST Hawaii Standard Time GMT-10:00</option>*/}
                            {/*<option value="-9:00">AST Alaska Standard Time GMT-9:00</option>*/}
                            {/*<option value="-8:00">PST Pacific Standard Time GMT-8:00</option>*/}
                            {/*<option value="-7:00">PNT Phoenix Standard Time GMT-7:00</option>*/}
                            {/*<option value="-7:00">MST Mountain Standard Time GMT-7:00</option>*/}
                            {/*<option value="-6:0">CST Central Standard Time GMT-6:00</option>*/}
                            {/*<option value="-5:00">EST Eastern Standard Time GMT-5:00</option>*/}
                            {/*<option value="-5:00">IET Indiana Eastern Standard Time GMT-5:00</option>*/}
                            {/*<option value="-4:00">PRT Puerto Rico and US Virgin Islands Time GMT-4:00</option>*/}
                            {/*<option value="-3:30">CNT Canada Newfoundland Time GMT-3:30</option>*/}
                            {/*<option value="-3:00">AGT Argentina Standard Time GMT-3:00</option>*/}
                            {/*<option value="-3:00">BET Brazil Eastern Time GMT-3:00</option>*/}
                            {/*<option value="-1:00">CAT Central African Time GMT-1:00</option>*/}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ManageTime;




