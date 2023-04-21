import React, {useState} from "react";
import GroupLogo from '../../assets/images/GroupLogo.png';
import Plus from '../../assets/images/Plus.png';
import classes from './Groups.module.css';
import AddTags from "../../components/AddTags/AddTags";
import YourTagsModal from "../../components/YourTagsModal/YourTagsModal";
import TagClosingIcon from "../../assets/images/TagClosingIcon.png";


function Groups() {

    const [tableInfo, setTableInfo] = useState(Array.from({length: 9}, (_, k) => ({
        group_logo: GroupLogo,
        group_name: "Group Name " + (k+1),
        number_of_members: 324,
        number_of_tags: 0,
        addedTags: [],
        tagNumbersLength:0
        // id: Math.random() * (new Date().getTime() * performance.now())
    })))

    const [addTagsModalIsOpen, setAddTagsModalIsOpen] = useState(false);
    const [yourTagsModalIsOpen, setYourTagsModalIsOpen] = useState(false);
    const [index, setIndex] = useState("");
    const [tag, setTag] = useState("");

    const tagChangeHandler = (event) => {
        setTag(event.target.value)
    }

    console.log(tag, "taaaaaaaaaaaaaaag")

    function openAddTagsModal(index) {
        setAddTagsModalIsOpen(true)
        setIndex(index)
    }

    function closeAddTagsModal() {
        setAddTagsModalIsOpen(false)
    }

    function openYourTagsModal(index) {
        if(
            tableInfo[index].tagNumbersLength >0
        )
            setYourTagsModalIsOpen(true)
        setIndex(index)
    }

    function closeYourTagsModal() {
        setYourTagsModalIsOpen(false)
    }

    const addTagHandler = () => {
        if(tag){
            let cloneTableInfo = JSON.parse(JSON.stringify(tableInfo));
            cloneTableInfo[index].addedTags.push(tag);
            setTableInfo(cloneTableInfo);
            setTag("")
        }
    }

    const saveHandler = () => {
        let cloneTableInfo = JSON.parse(JSON.stringify(tableInfo));
        cloneTableInfo[index].number_of_tags=cloneTableInfo[index].addedTags.length;
        // cloneTableInfo[index].number_of_tags = cloneTableInfo[index].number_of_tags + cloneTableInfo[index].addedTags.length;
        cloneTableInfo[index].tagNumbersLength = cloneTableInfo[index].addedTags.length;
        // setTagNumbersLength(cloneTableInfo[index].addedTags.length);
        setTableInfo(cloneTableInfo);
    }

    const deleteAddedTag =(i)=>{
        let cloneTableInfo =JSON.parse(JSON.stringify(tableInfo));
        cloneTableInfo[index].addedTags.splice(i, 1);
        cloneTableInfo[index].number_of_tags=cloneTableInfo[index].addedTags.length;
        cloneTableInfo[index].tagNumbersLength = cloneTableInfo[index].addedTags.length;
        setTableInfo(cloneTableInfo);
    }
    console.log(tableInfo, "tableInfoAfterAdding")

    const renderTags=tableInfo[index]?.addedTags?.map((item, i)=>(
        <div className={classes.singleTag} key={index}>
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
                                    <td><img src={item.group_logo} alt=""/></td>
                                    <td>{item.group_name}</td>
                                    <td>{item.number_of_members}</td>
                                    <td
                                        // className={` ${ tableInfo[index]?.addedTags?.length > 0 && classes.activeBlue}`}
                                        className={`${ tableInfo[index].tagNumbersLength> 0 && classes.activeBlue}`}
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
                index={index}
                tag={tag}
                setTag={setTag}
                tableInfo={tableInfo}
                onTagChange={tagChangeHandler}
                onAddTag={addTagHandler}
                onSave={saveHandler}
                renderTags={renderTags}/>
            <YourTagsModal
                yourTagsModalIsOpen={yourTagsModalIsOpen}
                closeYourTagsModal={closeYourTagsModal}
                renderTags={renderTags}
                tableInfo={tableInfo}
                index={index}
            />
        </>


    )
}

export default Groups;