import React, { useState} from "react";
import Modal from 'react-modal';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import classes from './MessageModal.module.css';



function MessageModal (props){


    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '624px',
            width: '100%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:'#FFFFFF',
            borderRadius:'8px',
        },
        overlay: {zIndex: 1000}
    };

    return (
        <>
            <Modal
                isOpen={props.messageModalIsOpen}
                onRequestClose={props.closeMessageModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.titleNew}>Messages have been sent to group members successfully!!!</div>
            </Modal>
        </>
    )
}


export default MessageModal;