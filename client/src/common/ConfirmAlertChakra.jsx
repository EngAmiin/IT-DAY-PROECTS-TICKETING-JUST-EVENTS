import React from 'react'
import {  AlertDialog,AlertDialogBody,AlertDialogOverlay,AlertDialogFooter,AlertDialogContent,Button,AlertDialogHeader ,AlertDialogCloseButton } from "@chakra-ui/react";
export default function ConfirmAlertChakra({cancelRef,onClose,isOpen,onConfirm,isDeleting}) {
  return (
    <AlertDialog
    motionPreset='slideInBottom'
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader>Delete Data?</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>
        Are you sure you want to delete this data?
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button
        disabled={isDeleting ? true : false}
        ref={cancelRef} onClick={onClose}>
          No
        </Button>
        <Button 
        disabled={isDeleting==true}
        onClick={async()=>{
             onConfirm();
         
        }} colorScheme='red' ml={3}>
         {isDeleting ? "Deleting..." : "Yes"} 
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
