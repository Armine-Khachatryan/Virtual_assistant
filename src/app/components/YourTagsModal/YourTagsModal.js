import React from "react";
import Modal from 'react-modal';
import ClosingIcon from "../../assets/images/ClosingIcon.png";
import classes from './YourTagsModal.module.css';



function YourTagsModal(props){


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

    return(
        <Modal
            isOpen={props.yourTagsModalIsOpen}
            onRequestClose={props.closeYourTagsModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="modalUpPart">
                <div className="modalTitle">Your Tags</div>
                <div className="closingImgDiv" onClick={props.closeYourTagsModal}><img src={ClosingIcon} alt=""/></div>
            </div>
            <div className={classes.renderTagsYourModal}>
                {props.renderSavedTags}
                {/*{props?.tableInfo[props?.arrayIndex]?.tagNumbersLength !==0 && props.renderSavedTags}*/}
            </div>
        </Modal>
    )
}


export default YourTagsModal;