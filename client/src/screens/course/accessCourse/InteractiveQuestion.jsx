import { useEffect, useState, useRef } from 'react'
import { globalFlag } from '~/context/GlobalFlag'
import styled from 'styled-components'

function InteractiveQuestion() {
  const openInteractiveVideo = globalFlag((state) => state.openInteractiveVideo)
  const setOpenInteractiveVideo = globalFlag((state) => state.setOpenInteractiveVideo)
  const interactQuestions = globalFlag((state) => state.interactQuestions)

  useEffect(() => {
    console.log('is open? ', openInteractiveVideo)
    console.log('interactive questions: ', interactQuestions)
  }, [openInteractiveVideo])

  return (
    <>
    </>
  )
}

export default InteractiveQuestion