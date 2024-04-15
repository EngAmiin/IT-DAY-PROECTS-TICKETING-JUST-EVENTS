import { Container } from '@mui/material'
import Card from 'react-bootstrap/Card'
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import MessageModal from './MessageModal';
export default function FAQ() {
    const [open, setOpen] = useState(false)
  return (
    <Container style={{ marginTop: "6rem", marginBottom: "10px" }}>
        <MessageModal open={open} handleClose={()=> setOpen(false)}/>
    <h4 className="my-5 text-center">How It Works</h4>
    <Card className="border-0 box-shadow">
      <Card.Body>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <strong>Waa Maxay IT-DAY?</strong>
        </AccordionSummary>
        <AccordionDetails>
          IT-DAY Waa Maalin U Gaar Ahaan Ardayda Jamacadda Jamhuuriya Qeeybteeda Computer-ka, Waxayna Maalintaas Soo Bandhigi Doonaan
          Mashruucyo Ay Sameeyen Inta Ay Ku Guda-jireen Waxbarashada. Waana Maalin Fursad U Ah Arday walba oo Wax Dhisay
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <strong>Yaa Kasoo Qeeyb Geli Kara?</strong>
        </AccordionSummary>
        <AccordionDetails>
          Waxaa Kasoo Qeeyb Geli Kara, Arday Walba Semester Walba Ha Ahaadee, Kaliya Waa Inuu Wax Dhisay Waxaas Uu Dhisayna Uu Soo Bandhigo
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <strong>Maxaa Lasoo Bandhigi Karaa?</strong>
        </AccordionSummary>
        <AccordionDetails>
          Waxaa Lasoo Bandhigi Karaa Wax Walba Uu Quseeya Computer-ka, Lkn Waxaa Common Ah Oo Lasoo Bandhigayaa,
          Programming, Networking, Multmedia Iyo Typing Speed, Sidoo Kale Inta Adan Soo Bandhigin Waxaa Maraysaa Testing Si Loo Qiimeeyo Project-ga Aad Wadatid.
          Sido Kale Project-ga waxaa ku dhisi kartaa wax walba oo Aad Jeceshahay. 
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <strong>Yaa So Qaban-Qaabiyo?</strong>
        </AccordionSummary>
        <AccordionDetails>
         Waxaa Soo Qaban-Qaabiyo Ardayda Kuliyadda Gaar ahaan, Student Association *JUTSA 
         
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <strong>Sideen Iskaga Diwaan Gelin Karaa Event-gaan?</strong>
        </AccordionSummary>
        <AccordionDetails>
         Waxaa Iskaga Diwan Gelintaa Adigoo Soo Booqonaya Website-kaan Kadib Join Dheh Information-ka Ardayda Buuxi, Kadibna Waxaa
         Heli Doontaa Event-ga Markaas Active-ka Ah, Haddusan Event Active Aheeyn Iskama Diwaan Gelin Kartaan website-kaan.
         Haddii Aad Ubaahato Xog Dheeraad Waxaa Lasoo Xiriri Kartaa Xafiiska Ardayda Kuliyyada Computer-ka Loogu Adeego  Ama Message Inoo Soo Dir 
         <br />
         <Button variant='contained' className='my-3' color='secondary' onClick={()=> setOpen(true)}>Send Message  </Button>
         
        </AccordionDetails>
      </Accordion>
      
      </Card.Body>
    </Card>
  </Container>
  )
}
