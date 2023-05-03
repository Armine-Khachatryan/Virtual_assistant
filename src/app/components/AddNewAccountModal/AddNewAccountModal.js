import React from "react";
import Modal from 'react-modal';
import Facebook from '../../assets/images/Facebook.png';
import LinkedIn from '../../assets/images/LinkedIn.png';
import ClosingIcon from '../../assets/images/ClosingIcon.png';
import classes from './AddNewAccountModal.module.css';



function AddNewAccountModal(props){

    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '763px',
            width: '100%',
            top: '45%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
        },
        overlay: {zIndex: 1000}
    };



    return(
        <>
            <Modal
                isOpen={props.addNewAccountModalIsOpen}
                onRequestClose={props.closeAddNewAccountModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modalUpPart">
                    <div className="modalTitle">Add New Account</div>
                    <div className="closingImgDiv" onClick={props.closeAddNewAccountModal}>
                        <img src={ClosingIcon} alt=""/></div>
                </div>
                <div className={classes.buttonsDiv}>
                    <div className={classes.buttonFBLinkedIn}>
                        <div className={classes.iconStyle}>
                            <img src={Facebook} alt="" />
                        </div>Connect to my Facebook
                    </div>
                    <div className={classes.buttonFBLinkedIn}>
                        <div className={classes.iconStyle}>
                            <img src={LinkedIn} alt="" />
                        </div>Connect to my Linkedin
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default AddNewAccountModal;