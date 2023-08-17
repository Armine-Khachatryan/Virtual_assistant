import React, {useEffect, useState} from "react";
import GroupLogo from '../../assets/images/GroupLogo.png';
import Plus from '../../assets/images/Plus.png';
import classes from './Groups.module.css';
import AddTags from "../../components/AddTags/AddTags";
import YourTagsModal from "../../components/YourTagsModal/YourTagsModal";
import TagClosingIcon from "../../assets/images/TagClosingIcon.png";
import axios from "axios";
import config from "../../config";
import {Outlet, useNavigate, useOutletContext} from "react-router-dom";
import MessageModal from "../../components/MessageModal/MessageModal";


function Groups(props) {

    // const [tableInfo, setTableInfo] = useState(Array.from({length: 9}, (_, k) => ({
    //     group_logo: GroupLogo,
    //     group_name: "Group Name " + (k+1),
    //     number_of_members: 324,
    //     number_of_tags: 0,
    //     addedTags: [],
    //     tagNumbersArray:[]
    //     // id: Math.random() * (new Date().getTime() * performance.now())
    // })))

    const [groupsInfo, setGroupsInfo]=useState([])




    const setRouting= useOutletContext();


    const navigate= useNavigate();
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false);
    const [addTagsModalIsOpen, setAddTagsModalIsOpen] = useState(false);
    const [yourTagsModalIsOpen, setYourTagsModalIsOpen] = useState(false);
    const [tag, setTag] = useState("");
    const [arrayIndex, setArrayIndex] = useState("");
    const [addButtonClicked, setAddButtonClicked]=useState(false);
    // const [groupId, setGroupId]=useState(null)

    useEffect(()=>{
        getGroups()
    }, [yourTagsModalIsOpen])

    const tagChangeHandler = (event) => {
        setTag(event.target.value);
        setAddButtonClicked(false)
    }

    console.log(tag, "tag")

    function openMessageModal() {
        setMessageModalIsOpen(true);
    }

    function closeMessageModal(){
        setMessageModalIsOpen(false);
    }

    function openAddTagsModal(index) {
        setAddTagsModalIsOpen(true)
        setArrayIndex(index)
    }

    function closeAddTagsModal() {
        setAddTagsModalIsOpen(false)
    }

    function openYourTagsModal(index) {
        if(
            groupsInfo[index]?.group_tags?.length >0  //check
        )
            setYourTagsModalIsOpen(true)
            setArrayIndex(index)
    }

    function closeYourTagsModal() {
        setYourTagsModalIsOpen(false)
    }

    const addTagHandler = () => {
        if(tag){
            let cloneTableInfo = JSON.parse(JSON.stringify(groupsInfo));
            if(cloneTableInfo[arrayIndex].addedTags){
                cloneTableInfo[arrayIndex]?.addedTags.push(tag);
            }
            else{
                cloneTableInfo[arrayIndex].addedTags=[];
                cloneTableInfo[arrayIndex]?.addedTags.push(tag);
            }
            setGroupsInfo(cloneTableInfo);
            setTag("")
            setAddButtonClicked(true)
        }
    }

    const deleteAddedTag =(i)=>{
        let cloneTableInfo =JSON.parse(JSON.stringify(groupsInfo));
        cloneTableInfo[arrayIndex].addedTags.splice(i, 1);
        // if(cloneTableInfo[arrayIndex].tagNumbersArray.length>0){
        //     cloneTableInfo[arrayIndex].tagNumbersArray.splice(i, 1);
        //     cloneTableInfo[arrayIndex].number_of_tags= cloneTableInfo[arrayIndex].tagNumbersArray.length
        // }
        setGroupsInfo(cloneTableInfo);
    }

    const renderAddedTags=groupsInfo[arrayIndex]?.addedTags?.map((item, i)=>(
        <div className={classes.singleTag} key={i}>
            <div style={{marginRight: "8px", cursor:"pointer"}}
                 onClick={()=>deleteAddedTag(i)}
            >
                <img  src={TagClosingIcon} alt=""/>
            </div>
            <div className={classes.itemDiv}>{item}</div>
        </div>
    ))

    const saveHandler = async() => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('group_id', groupsInfo[arrayIndex]?.id);
        groupsInfo[arrayIndex]?.addedTags.forEach(item => {
            formData.append('tags[]', item);
        })
        try {
            let response = await axios.post(`${config.baseUrl}api/my-profile/group-tags`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response.data, "response data")
            let cloneTableInfo = JSON.parse(JSON.stringify(groupsInfo));
            let requiredItem=cloneTableInfo.find((item) => item.id === + response.data.data.group_id)
            requiredItem.group_tags=response.data.data.group_tags;
            requiredItem.number_of_tags= response.data.data.group_tags.length;
            requiredItem.addedTags =[];
            setGroupsInfo(cloneTableInfo);
        } catch (error) {
       console.log(error)
    }
}
console.log(arrayIndex, "arrayIndex")

    const renderSavedTags=groupsInfo[arrayIndex]?.group_tags?.map((item, i)=>(
            <div className={classes.singleTag} key={i}>
                <div style={{marginRight: "8px", cursor:"pointer"}} onClick={()=>deleteAddedTag(i)}>
                    <img  src={TagClosingIcon} alt=""/>
                </div>
                <div className={classes.itemDiv}>{item.title}</div>
            </div>
        ))


    let getGroups = async ()=>{
        let token = sessionStorage.getItem('token');
        try {
            let response = await axios.get(`${config.baseUrl}api/my-profile/groups`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data.data, "groups response data")
            setGroupsInfo(response.data.data);
        } catch (error) {
            console.log("error")
        }
    }

    let sendMessageToGroup = async (id)=>{
        console.log(id)
        let token = sessionStorage.getItem('token');
        try {
            let response = await axios.post(`${config.baseUrl}api/send/message`, {"id": id},{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(response.data.success===true){
                openMessageModal()
            }
            console.log(response.data, "groups response data")
        } catch (error) {
            console.log("error")
        }
    }

    console.log(groupsInfo, "groupsInfo")


    return (
        <>
            <div className={classes.groupWhole}>
                <div className={classes.groupHeader}>My Groups From Facebook</div>
                <table className={classes.groupTable}>
                    <thead>
                    <tr>
                        <th>Group Logo</th>
                        <th>Group Name</th>
                        <th>Number of Members</th>
                        <th>Number Of Tags</th>
                        <th>Action</th>
                        <th>Send Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        groupsInfo?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={()=>{
                                        setRouting("groups/messages", item.id);
                                    }}><img
                                        className={classes.logoStyle} src={item.logo_img} alt=""/></td>
                                    <td className={classes.groupName}>{item.title}</td>
                                    <td>{item.members_count}</td>
                                    <td
                                        // className={` ${ tableInfo[index]?.addedTags?.length > 0 && classes.activeBlue}`}
                                        className={`${ groupsInfo[index]?.group_tags?.length >0 && classes.activeBlue}`}
                                        onClick={()=>openYourTagsModal(index)}
                                    >
                                        {item?.group_tags.length || 0}
                                    </td>
                                    <td className={classes.addTag} onClick={() => openAddTagsModal(index)}>
                                        <img src={Plus} alt="" className={classes.plusImg}/>Add Tags
                                    </td>
                                    <td className={classes.groupName} onClick={()=>sendMessageToGroup(item.id)}>Send</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <AddTags
                addTagsModalIsOpen={addTagsModalIsOpen}
                closeAddTagsModal={closeAddTagsModal}
                tag={tag}
                setTag={setTag}
                onTagChange={tagChangeHandler}
                onAddTag={addTagHandler}
                renderAddedTags={renderAddedTags}
                arrayIndex={arrayIndex}
                tableInfo={groupsInfo}
                onSaveAddedTags={saveHandler}
                addButtonClicked={addButtonClicked}
            />
            <YourTagsModal
                yourTagsModalIsOpen={yourTagsModalIsOpen}
                closeYourTagsModal={closeYourTagsModal}
                tableInfo={groupsInfo}
                arrayIndex={arrayIndex}
                renderSavedTags={renderSavedTags}
            />
            {/*<Outlet groupId={groupId}/>*/}
            {/*<Outlet/>*/}
            <MessageModal messageModalIsOpen={messageModalIsOpen} closeMessageModal={closeMessageModal}/>
        </>


    )
}

export default Groups;