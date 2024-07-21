import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Improvement Exercises</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img15.jpeg'
              text="Think of 3 things that you can say with 'At far, you can ___'. Name 4 body parts that have sound 'I have a ________'. Name all 12 months of the year using best sounds."
              label='Speech Therapy'
              path='/chat'
            />
            <CardItem
              src='images/img16.jpeg'
              text="Practice speech in front of the mirror. Practice varying your tone of voice. Practice adding humor. Follow the 7 P's of Public Speaking."
              label='Public Speaking'
              path='/chat'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img18.png'
              text="Write about interactions with others can help you identify areas for improvement. 
              Listen and do activity pack: This pack includes instruction sheets and drawing sheets."
              label='Active Listening'
              path='/chat'
            />
            
            <CardItem
              src='images/img19.png'
              text="Gap-filling exercises: These exercises can help you identify the appropriate words to be used in the missing places. Correcting sentences:
              This exercise involves correcting sentences that have errors in syntax."
              label='Grammar and Syntax'
              path='/chat'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;