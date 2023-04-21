import React from "react";
import Modal from 'react-modal';
import Input from "../../UI/Input/Input";
import classes from './AddTags.module.css';
import TagClosingIcon from '../../assets/images/TagClosingIcon.png';
import WhiteAddIcon from '../../assets/images/WhiteAddIcon.png';
import ClosingIcon from "../../assets/images/ClosingIcon.png";




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


    const tagRemovingAndSaving =()=>{
        props.onSave();
        props.closeAddTagsModal()
    }


    return(
        <Modal
            isOpen={props.addTagsModalIsOpen}
            onRequestClose={closeAndReset}
            style={customStyles}
            ariaHideApp={false}
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
                <div className={classes.addBtn} onClick={props.onAddTag}>
                    <img className={classes.whiteIconBtn} src={WhiteAddIcon} alt=""/>Add</div>
            </div>
            <div className={classes.tagsWhole}>
                {props.renderTags}
            </div>
            {props?.tableInfo[props.index]?.addedTags?.length > 0 &&
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <div className={classes.saveBtn}
                         onClick={tagRemovingAndSaving}>
                        Save</div>
                </div>
            }
        </Modal>
    )
}


export default AddTags;