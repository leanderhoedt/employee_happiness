import React from 'react';
import TrumpFaces from "./components/TrumpFaces";


const Vote = ()=> {
    return <Container>
        <Center>
            <TrumpFaces/>
        </Center>
    </Container>
};

const Container = styled.div`
width: 100%;
height: auto;
bottom: 0;
top: 0;
left: 0;
position: absolute;
`;

const Center = styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
width: 100%;
flex-direction: column-reverse;
    
/* You need to define an explicit height! */
height: 100vh;
`;

const Row = styled.div`

`;