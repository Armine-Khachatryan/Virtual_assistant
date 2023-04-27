// import React from "react";
// import ProfileFrame from '../../assets/images/ProfileFrame.png';
// import Modal from 'react-modal';
// import classes from './Notifications.module.css';
//
//
//
// function Notifications(props){
//
//     const notificationsArray=[
//         {
//             img:ProfileFrame,
//             info:"User from Group Name order a call  for 13.04.2023 14:00 PM",
//             time:"12 days ago"
//     },
//         {
//             img:ProfileFrame,
//             info:"User from Group Name order a call  for 13.04.2023 14:00 PM",
//             time:"12 days ago"
//         },
//         {
//             img:ProfileFrame,
//             info:"User from Group Name order a call  for 13.04.2023 14:00 PM",
//             time:"12 days ago"
//         },
//         {
//             img:ProfileFrame,
//             info:"User from Group Name order a call  for 13.04.2023 14:00 PM",
//             time:"12 days ago"
//         }
//     ]
//
//     const customStyles = {
//         content: {
//             padding: '16px 24px',
//             maxWidth: '427px',
//             width: '100%',
//             top: '55%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             display: 'flex',
//             flexDirection: 'column',
//             background:'#FFFFFF',
//             boxShadow:'0px 8px 16px rgba(0, 0, 0, 0.15)',
//             borderRadius:'8px',
//         },
//         overlay: {zIndex: 1000}
//     };
//
//
//     const renderNotifications=notificationsArray.map((item, index)=>(
//         <div className={classes.notificationsWhole}>
//             <div className={classes.imgDiv}>
//                 <img src={item.img} alt=""/>
//             </div>
//             <div>
//                 <div className={classes.notificationsRightUp}>{item.info}</div>
//                 <div className={classes.notificationsRightDown}>
//                     <div className={classes.details}>See details</div>
//                     <div className={classes.time}>{item.time}</div>
//                 </div>
//             </div>
//         </div>
//     ))
//
//
//
//     return(
//         <>
//             <Modal
//                 isOpen={props.notificationsModalIsOpen}
//                 onRequestClose={props.closeNotificationsModal}
//                 style={customStyles}
//                 ariaHideApp={false}
//             >
//             <div className={classes.notificationsHeader}>Notifications</div>
//             {renderNotifications}
//             </Modal>
//         </>
//
//     )
// }
//
// export default Notifications;