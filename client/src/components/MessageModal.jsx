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
import { Box, Container, Grid, ListItem, ListItemIcon, TextField } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { ContextAPI } from '../context/Provider';
import toast,{Toaster} from 'react-hot-toast'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function MessageModal({open,handleClose}) {

  const { sendMessage } = React.useContext(ContextAPI);
  const [data, setData] = React.useState({
    name : "",
    className : "",
    message : ""
  })

  const onChangeValues = (e)=> setData({
    ...data,
    [e.target.name]: e.target.value
  })


  const handleSubmit = ()=>{
    sendMessage(data,function(err,res){
      if(err)
         toast.error(res)
        else
          {
            toast.success(res);
            handleClose();
          }
    })
  }
    
  return (
    <>
    <Toaster position='top-center'/>
      <Drawer anchor={"bottom"} open={open} onClose={handleClose}>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} md={12}>
              <TextField
                name="name"
                value={data.name}
                onChange={onChangeValues}
                fullWidth
                id="outlined-basic"
                label="Your FullName"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6} md={12}>
              <TextField
                name="className"
                value={data.className}
                onChange={onChangeValues}
                fullWidth
                id="outlined-basic"
                label="Your ClassName"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={12} xs={12} sm={12} md={12}>
              <TextField
                name="message"
                value={data.message}
                onChange={onChangeValues}
                rows={10}
                id="outlined-multiline-flexible"
                label="Message"
                multiline
                placeholder="type your message 😊"
                maxRows={50}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="my-3"
          >
            Send
          </Button>
        </Box>
      </Drawer>
    </>
    // <Dialog
    //     fullScreen
    //     open={open}
    //     onClose={handleClose}
    //     TransitionComponent={Transition}
    //   >
    //     <AppBar sx={{ position: 'relative' }}>
    //       <Toolbar>
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           onClick={handleClose}
    //           aria-label="close"
    //         >
    //           <CloseIcon />
    //         </IconButton>
    //         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
    //           Message
    //         </Typography>
    //         <Button autoFocus color="inherit" onClick={handleClose}>
    //           Send
    //         </Button>
    //       </Toolbar>
    //     </AppBar>
    //     <Container sx={{p: 5}}>
    //         <Grid container spacing={2}>
    //             <Grid item  xs={12} sm={12}  lg={6} md={12}>
    //             <TextField fullWidth id="outlined-basic" label="Your FullName" variant="outlined" />
    //             </Grid>
    //             <Grid item  xs={12} sm={12}  lg={6} md={12}>
    //             <TextField fullWidth id="outlined-basic" label="Your ClassName" variant="outlined" />
    //             </Grid>
    //             <Grid item lg={12} xs={12} sm={12} md={12}>
    //             <TextField
    //             rows={10}
    //       id="outlined-multiline-flexible"
    //       label="Message"
    //       multiline
    //       placeholder='type your message 😊'
    //       maxRows={50}
    //       fullWidth
    //     />
    //             </Grid>
    //         </Grid>

    //     </Container>
    //   </Dialog>
  );
}
