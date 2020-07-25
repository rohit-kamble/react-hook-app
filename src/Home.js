import React, {useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import Weather from './weather';
import AutoWeather from './AutoWeather';
import image from './loadder.gif';

export default function Home() {
    const [openApp, setOpenApp] = useState({
        isOpenManual:  false,
        isOpenAutomatic : false,
    }),
    {isOpenManual, isOpenAutomatic}= openApp,
    showAuto=()=>{
        setOpenApp({
            isOpenAutomatic: true,
            isOpenManual: false,
        })
    },
    showManul=()=>{
        setOpenApp({
            isOpenManual: true,
            isOpenAutomatic: false,
        })
    },
    checkManul = isOpenManual && <Weather/>,
    checkAuto = isOpenAutomatic && <AutoWeather/>,
    buttonColorManul = isOpenManual ? 'buttton-manual-color': '',
    buttonColorAuto = isOpenAutomatic ? 'buttton-auto-color' : '',
    check = checkManul ? checkManul : checkAuto;
    console.log('buttonColorManul', buttonColorManul);

    const data = {
        backgroundImage: `url(${image})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    return (
        <Container className="text-center" >
            <h1>React Hook Weather App</h1>
            <Row>
                <Col md={6}>
                    <Button onClick={()=>showAuto()}  className={`button-pad ${buttonColorAuto}`}>
                        <span className="button-label">
                            Currrent Location
                        </span>
                    </Button>
                </Col>
                <Col md={6}>
                    <Button onClick={()=>showManul()} className={`button-pad ${buttonColorManul}`}>
                    <span className="button-label">
                            Manul select
                        </span>
                    </Button>
                </Col>
                {check &&
                    <Col>
                        {check}
                    </Col>
                }
            </Row>
        </Container>
    )
}
