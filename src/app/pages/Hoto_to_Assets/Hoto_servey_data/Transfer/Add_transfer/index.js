import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Grid, TextField } from '@mui/material';
import { orangeSecondary } from 'app/pages/Constants/colors';
import Div from '@jumbo/shared/Div';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddTransfer() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" color='secondary'
                sx={{
                    "&:hover": {
                        backgroundColor: orangeSecondary
                    },
                    mr:2
                }}
                size='small'
                onClick={handleClickOpen}>
                Send Transfer
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={"lg"}
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant='h1' mb={0}>Transfer</Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xl={3} md={4} sm={6}>
                                <Typography mb={1} variant='h6'>Transfer Type</Typography>
                                <TextField
                                    name='transferType'
                                    // label='Transfer Type'
                                    placeholder='Select'
                                    size='small'
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} sm={6}>
                                <Typography mb={1} variant='h6'>Transfer From</Typography>
                                <TextField
                                    name='transferFrom'
                                    // label='Transfer Type'
                                    placeholder='Enter Name'
                                    size='small'
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} sm={6}>
                                <Typography mb={1} variant='h6'>Transfer To</Typography>
                                <TextField
                                    name='transferTo'
                                    // label='Transfer Type'
                                    placeholder='Select'
                                    size='small'
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} sm={6}>
                                <Typography mb={1} variant='h6'>Receiving Incharge</Typography>
                                <TextField
                                    name='receivingIncharge'
                                    // label='Transfer Type'
                                    placeholder='Enter Name'
                                    size='small'
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xl={3} md={4} sm={6}>
                                <Typography mb={1} variant='h6'>Remark</Typography>
                                <TextField
                                    name='remark'
                                    // label='Transfer Type'
                                    placeholder='Enter Remark'
                                    size='small'
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Div sx={{ width: "100%", textAlign: "center", my: 1 }}>
                        <Div>
                            <Button variant='outlined' sx={{ mr: 2 }} size='medium' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant='contained' size='medium' onClick={handleClose}>
                                Submit
                            </Button>
                        </Div>
                    </Div>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}