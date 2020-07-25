
import React from 'react';
import images from './loadder.gif';
import { Container } from 'reactstrap';

 export default function ReactGifLoader() {
    return (
        <Container className="text-center">
             <img className="reactloadder" src={images} alt="loadder"/>
             <p>Loading...</p>
        </Container>

    );
 }
