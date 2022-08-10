import React from 'react'
import Card from '../Card/Card';
import './Tutoring.css'
import feTitle from '../../feTitle.png'
import beTitle from '../../beTitle.png'
import csTitle from '../../csTitle.png'

export default function Tutoring() {
    let fePoints = ['HTML', 'CSS', 'JavaScript', 'React'];
    let bePoints = ['Node', 'Express', 'MongoDB', 'Mongoose'];
    let csPoints = ['Search Algorithms', 'Sort Algorithms', 'Data Structures', 'Big O Notation'];

  return (
    <div className="tutoring">
        <div><Card title={feTitle} points={fePoints} bgColor={'#E7F0FF'}/></div>
        <div><Card title={beTitle} points={bePoints} bgColor={'#CEEFEE'}/></div>
        <div><Card title={csTitle} points={csPoints} bgColor={'#E4FAF8'}/></div>
    </div>
  )
}
