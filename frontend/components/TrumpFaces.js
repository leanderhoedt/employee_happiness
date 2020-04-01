import React from 'react';
import styled from 'styled-components';
import TrumpHappy from '../assets/Trump_Happy.jpg';
import TrumpNeutral from '../assets/Trump_Neutral.jpg';
import TrumpSad from '../assets/Trump_Sad.png';
import {fetchAuth} from "../services/Fetch.service";

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const TrumpFaces = () => {
    const vote = async (mood) => {
        const date = randomDate(new Date(2020, 0, 1), new Date());
        const result = await fetchAuth().post('/vote', {mood, date});
        console.log(result);
    };
    return <TrumpContainer>
        <TrumpImg src={TrumpHappy} onClick={() => vote('happy')}/>
        <TrumpImg src={TrumpNeutral} onClick={() => vote('neutral')}/>
        <TrumpImg src={TrumpSad} onClick={() => vote('sad')}/>
    </TrumpContainer>
};

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
cursor: pointer;
`;

export default TrumpFaces;