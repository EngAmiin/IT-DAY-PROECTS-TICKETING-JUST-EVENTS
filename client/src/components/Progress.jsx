import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
export default function Progress({maxCompletedCount, completedCount}) {
  return (
   <ProgressBar  animateOnRender completed={completedCount} maxCompleted={maxCompletedCount}/>
  )
}
