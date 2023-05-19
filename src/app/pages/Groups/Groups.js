import React, {useState} from "react";
import GroupLogo from '../../assets/images/GroupLogo.png';
import Plus from '../../assets/images/Plus.png';
import classes from './Groups.module.css';
import AddTags from "../../components/AddTags/AddTags";
import YourTagsModal from "../../components/YourTagsModal/YourTagsModal";
import TagClosingIcon from "../../assets/images/TagClosingIcon.png";
import {Outlet, useNavigate, useOutletContext} from "react-router-dom";


function Groups(props) {

    const [tableInfo, setTableInfo] = useState(Array.from({length: 9}, (_, k) => ({
        group_logo: GroupLogo,
        group_name: "Group Name " + (k+1),
        number_of_members: 324,
        number_of_tags: 0,
        addedTags: [],
        tagNumbersArray:[]
        // id: Math.random() * (new Date().getTime() * performance.now())
    })))


    const setRouting= useOutletContext();

    console.log(tableInfo)
    const navigate= useNavigate();
    const [addTagsModalIsOpen, setAddTagsModalIsOpen] = useState(false);
    const [yourTagsModalIsOpen, setYourTagsModalIsOpen] = useState(false);
    const [tag, setTag] = useState("");
    const [arrayIndex, setArrayIndex] = useState("");
    const [addButtonClicked, setAddButtonClicked]=useState(false)

    const tagChangeHandler = (event) => {
        setTag(event.target.value);
        setAddButtonClicked(false)
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
            tableInfo[index]?.tagNumbersArray?.length >0  //check
        )
            setYourTagsModalIsOpen(true)
            setArrayIndex(index)
    }

    function closeYourTagsModal() {
        setYourTagsModalIsOpen(false)
    }
    const addTagHandler = () => {
        if(tag){
            let cloneTableInfo = JSON.parse(JSON.stringify(tableInfo));
            cloneTableInfo[arrayIndex].addedTags.push(tag);
            setTableInfo(cloneTableInfo);
            setTag("")
            setAddButtonClicked(true)
        }
    }

    const deleteAddedTag =(i)=>{
        let cloneTableInfo =JSON.parse(JSON.stringify(tableInfo));
        cloneTableInfo[arrayIndex].addedTags.splice(i, 1);
        if(cloneTableInfo[arrayIndex].tagNumbersArray.length>0){
            cloneTableInfo[arrayIndex].tagNumbersArray.splice(i, 1);
            cloneTableInfo[arrayIndex].number_of_tags= cloneTableInfo[arrayIndex].tagNumbersArray.length
        }
        // cloneTableInfo[arrayIndex].number_of_tags=cloneTableInfo[arrayIndex].addedTags.length;
        // cloneTableInfo[arrayIndex].tagNumbersLength = cloneTableInfo[arrayIndex].addedTags.length;
        setTableInfo(cloneTableInfo);
    }

    const renderAddedTags=tableInfo[arrayIndex]?.addedTags?.map((item, i)=>(
        <div className={classes.singleTag} key={i}>
            <div style={{marginRight: "8px", cursor:"pointer"}}
                 onClick={()=>deleteAddedTag(i)}
            >
                <img  src={TagClosingIcon} alt=""/>
            </div>
            <div className={classes.itemDiv}>{item}</div>
        </div>
    ))

    const saveHandler = () => {
        let cloneTableInfo = JSON.parse(JSON.stringify(tableInfo));
        // if(addButtonClicked){
            cloneTableInfo[arrayIndex].tagNumbersArray=[...cloneTableInfo[arrayIndex].addedTags];
            cloneTableInfo[arrayIndex].number_of_tags= cloneTableInfo[arrayIndex].tagNumbersArray.length;
            setTableInfo(cloneTableInfo);
        // }
        // cloneTableInfo[arrayIndex].number_of_tags=cloneTableInfo[arrayIndex].addedTags.length;
        // cloneTableInfo[index].number_of_tags = cloneTableInfo[index].number_of_tags + cloneTableInfo[index].addedTags.length;
        // cloneTableInfo[arrayIndex].tagNumbersLength = cloneTableInfo[arrayIndex].addedTags.length;
        // setTagNumbersLength(cloneTableInfo[index].addedTags.length);
    }

const renderSavedTags=tableInfo[arrayIndex]?.tagNumbersArray?.map((item, i)=>(
        <div className={classes.singleTag} key={i}>
            <div style={{marginRight: "8px", cursor:"pointer"}} onClick={()=>deleteAddedTag(i)}>
                <img  src={TagClosingIcon} alt=""/>
            </div>
            <div className={classes.itemDiv}>{item}</div>
        </div>
    ))


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
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tableInfo.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={()=>{setRouting("groups/messages")}}><img src={item.group_logo} alt=""/></td>
                                    <td>{item.group_name}</td>
                                    <td>{item.number_of_members}</td>
                                    <td
                                        // className={` ${ tableInfo[index]?.addedTags?.length > 0 && classes.activeBlue}`}
                                        className={`${ tableInfo[index]?.tagNumbersArray?.length >0 && classes.activeBlue}`}
                                        onClick={()=>openYourTagsModal(index)}
                                    >{item.number_of_tags}</td>
                                    <td className={classes.addTag} onClick={() => openAddTagsModal(index)}>
                                        <img src={Plus} alt="" className={classes.plusImg}/>Add Tags
                                    </td>
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
                tableInfo={tableInfo}
                onSaveAddedTags={saveHandler}
                addButtonClicked={addButtonClicked}
            />
            <YourTagsModal
                yourTagsModalIsOpen={yourTagsModalIsOpen}
                closeYourTagsModal={closeYourTagsModal}
                tableInfo={tableInfo}
                arrayIndex={arrayIndex}
                renderSavedTags={renderSavedTags}
            />
            {/*<Outlet/>*/}
        </>


    )
}

export default Groups;