import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/App.css'
import '../styles/EndGameDialog.css';

const EndGameDialog = props => {
    function handleReset() {
        props.resetWord(); 
        props.close(); 
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogContent>
                <DialogContentText>Would you like to try again?</DialogContentText>
            </DialogContent>
            <div id="button-container">
                <button className="button action-button" onClick={props.close}>Close</button>
                <button className="button action-button" onClick={handleReset}>New Game</button>
            </div>
        </Dialog>
    );
}

export default EndGameDialog;