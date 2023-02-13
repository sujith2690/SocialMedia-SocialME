import React from 'react'
import './reportModal.css'

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { postReport } from '../../api/PostRequest';

const ReportModal = ({ modal, toggleModal,postId }) => {

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(postId,'------postId', value, '-----value')
        const response = await postReport(postId, value)
        console.log(response,'--response')
        toggleModal()
    };
    return (
        <>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Choose Your Reason</h2>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ m: 3 }} error={error} variant="standard">
                                <FormLabel id="demo-error-radios">Why are you reporting this post?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-error-radios"
                                    name="report"
                                    value={value}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="It's spam" control={<Radio />} label="It's spam." />
                                    <FormControlLabel value="Nudity or sexual activity" control={<Radio />} label="Nudity or sexual activity." />
                                    <FormControlLabel value="Violence or dangerous organisations" control={<Radio />} label="Violence or dangerous organisations." />
                                    <FormControlLabel value="Intellectual property violation" control={<Radio />} label="Intellectual property violation." />
                                    <FormControlLabel value="Scam or fraud" control={<Radio />} label="Scam or fraud." />
                                    <FormControlLabel value="False information" control={<Radio />} label="False information." />
                                    <FormControlLabel value="I just don't like it" control={<Radio />} label="I just don't like it." />
                                </RadioGroup>
                                <FormHelperText>{helperText}</FormHelperText>
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    Submit
                                </Button>
                            </FormControl>
                        </form>
                    </div>
                </div>
            )}
            <p>hai</p>
        </>
    )
}

export default ReportModal