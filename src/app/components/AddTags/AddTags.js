import React from "react";
import Modal from 'react-modal';
import Input from "../../UI/Input/Input";
import classes from './AddTags.module.css';
import TagClosingIcon from '../../assets/images/TagClosingIcon.png';
import WhiteAddIcon from '../../assets/images/WhiteAddIcon.png';
import ClosingIcon from "../../assets/images/ClosingIcon.png";
import axios from "axios";
import config from "../../config";
import {setUserData} from "../../features/User/UserSlice";




function AddTags(props){


    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '763px',
            width: '100%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            background:'#FFFFFF',
            boxShadow:'0px 8px 16px rgba(0, 0, 0, 0.15)',
            borderRadius:'12px',
        },
        overlay: {zIndex: 1000}
    };

    const closeAndReset=()=>{
        props.closeAddTagsModal();
        props.setTag("")
    }




    // let removeTokenHandler = async () => {
    //     try {
    //         let response = await axios.post(`${config.baseUrl}api/send/message`,{}, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         sessionStorage.clear();
    //         props.setAccessToken("");
    //         dispatch(setUserData(null));
    //         navigate('/')
    //     }
    //     catch (error) {
    //         console.log(error, "error message")
    //     }
    // }


    const tagRemovingAndSaving =()=>{
        props.onSaveAddedTags();
        props.closeAddTagsModal();
    }


    return(
        <Modal
            isOpen={props.addTagsModalIsOpen}
            onRequestClose={closeAndReset}
            style={customStyles}
            ariaHideApp={false}
            // className="youClass"
        >
            <div className="modalUpPart">
                <div className="modalTitle">Add tags</div>
                <div className="closingImgDiv" onClick={closeAndReset}><img src={ClosingIcon} alt=""/></div>
            </div>
            <div className={classes.addText}>By adding tags, Chat GPT will automatically understand what email to send
                to the client and will also suggest a zoom meeting, if client will order a call, you will see it in
                your calendar.</div>
            <div className={classes.inputAndBtn}>
                <Input
                    label='Add Tags'
                    width='520px'
                    input={{
                        value: props.tag,
                        placeholder: "Type tag  name",
                        type: "text",
                        onChange: props.onTagChange,
                        // onBlur: emailBlurHandler
                    }}
                />
                <button id="button-1" className={classes.addBtn} onClick={props.onAddTag}>
                    <img className={classes.whiteIconBtn} src={WhiteAddIcon} alt=""/>Add</button>
            </div>
            <div className={classes.tagsWhole}>
                {props.renderAddedTags}
            </div>
            {props?.tableInfo[props.arrayIndex]?.addedTags?.length > 0 &&
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <button className={classes.saveBtn}
                            disabled={!props.addButtonClicked}
                         onClick={tagRemovingAndSaving}>
                        Save</button>
                </div>
            }
        </Modal>
    )
}


export default AddTags;