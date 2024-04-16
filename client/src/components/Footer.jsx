import React, { useState } from 'react'
import Container from "react-bootstrap/Container"
import LocaleChanger from "./LocaleChanger";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
export default function Footer() {
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  return (
    <Container className='text-muted text-center my-2'> @JUST -2024
    
    
    <I18nextProvider i18n={i18n}>
        <LocaleChanger onChange={changeLanguage} />
      </I18nextProvider>
    </Container>
  )
}
