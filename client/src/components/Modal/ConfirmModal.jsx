import React from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

import toast, { Toaster } from 'react-hot-toast';
import { deletePost } from '../../api/PostRequest';
import { useSelector } from 'react-redux';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};
const ConfirmModal = ({ deleModal, id, closeModal,data }) => {
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleClose = () => {
        closeModal()
    }
    const handleDelete = async () => {
        const response = await deletePost(data._id, user._id)
        toast.success('Post Deleted.')
        closeModal()
    }

    return (
        <div>
            <Modal
                open={deleModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        You want to delete this Post ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <Stack flexDirection='row-reverse'  direction="row" spacing={2}>
                            <Button variant="contained" size="small" color="error" style={{marginLeft:'20px'}}
                            onClick={handleDelete}
                            >
                                Yes
                            </Button>
                            <Button variant="contained" size="small" color="success"
                            onClick={()=>closeModal()}
                            >
                                No
                            </Button>

                        </Stack>
                    </Typography>
                </Box>
            </Modal>
        </div >
    );
}

export default ConfirmModal