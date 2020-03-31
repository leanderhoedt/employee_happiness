import React from 'react';
import styled from 'styled-components';
import TrumpHappy from '../assets/Trump_Happy.jpg';
import TrumpNeutral from '../assets/Trump_Neutral.jpg';
import TrumpSad from '../assets/Trump_Sad.png';

const TrumpFaces = () => {
    const vote = (mood) => {
      // fetchAuth.post('/')
    };
    return <TrumpContainer>
        <TrumpImg src={TrumpHappy} onClick={vote('happy')}/>
        <TrumpImg src={TrumpNeutral} onClick={vote('neutral')}/>
        <TrumpImg src={TrumpSad} onClick={vote('sad')}/>
    </TrumpContainer>
}

const TrumpContainer = styled.div`
display: inline-block;
justify-content: center;
align-items: center;
margin: 0 20px;
display: flex;
flex-direction: row;
`;

const TrumpImg = styled.img`
border-radius: 50%;
width: 200px;
margin: 0 30px;
`;

export default TrumpFaces;