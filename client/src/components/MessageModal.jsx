import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container, Grid, TextField } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function MessageModal({open,handleClose}) {
    
  return (
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Message 
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Send 
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{p: 5}}>
            <Grid container spacing={2}>
                <Grid item  xs={12} sm={12}  lg={6} md={12}>
                <TextField fullWidth id="outlined-basic" label="Your FullName" variant="outlined" />
                </Grid>
                <Grid item  xs={12} sm={12}  lg={6} md={12}>
                <TextField fullWidth id="outlined-basic" label="Your ClassName" variant="outlined" />
                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>
                <TextField
                rows={10}
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          placeholder='type your message 😊'
          maxRows={50}
          fullWidth
        />
                </Grid>
            </Grid>

    
        </Container>
      </Dialog>
  )
}
