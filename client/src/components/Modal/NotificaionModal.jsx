import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    minHeight: 100,
    maxHeight: 400,
    overflow: 'hidden',
    overflowY: "scroll",
    bgcolor: '',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'white',
    p: 4,
};
const NotificaionModal = ({ notiModal, notes, handleClear, closeModal }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const handleClose = () => {
        closeModal()
    }

    return (
        <div>
            <Modal
                open={notiModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Notifications...
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {notes.map((items, i) => {
                            return (
                                <div className='notificationdetails' key={i} >
                                    <img src={items.userData.profilePicture ? serverPublic + items.userData.profilePicture : serverPublic + "avatar.png"} alt=""
                                        className='notifyImagess' />
                                    <div className="content">
                                        <p style={{ fontSize: 15 }}>{items.Notifications.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <hr />
                        <span className='clear' onClick={handleClear}>Clear all</span>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default NotificaionModal