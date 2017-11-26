import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

function Card({ word, handleClick }) {
  const classNames =  `card ${word.color}`
  return(
    <div id={word.id} onClick={handleClick} className={classNames}>
      <h2>{word.word}</h2>
    </div>
  )
}

export default Card
