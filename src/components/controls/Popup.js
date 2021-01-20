import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import ActionButton from "./ActionButton";
import CloseIcon from '@material-ui/icons/Close'
import { Form } from '../useForm';
import Button from './Button';
import Controls from "./Controls";

const useStyle = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyle();

    return (
        <Dialog classes={{ paper: classes.dialogWrapper }} open={openPopup} maxWidth="md" >
            <Form>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <ActionButton
                            color="secondary"
                            onClick={() => { setOpenPopup(false) }}
                        >
                            <CloseIcon></CloseIcon>
                        </ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Controls.Button
                        type="submit"
                        text="Create" />
                    <Controls.Button
                        text="Cancel"
                        color="default"
                    //onClick={resetForm}
                    />
                </DialogActions>
            </Form>

        </Dialog>
    )
}
