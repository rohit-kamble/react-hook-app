import React, {useState, useEffect} from 'react';
import { Row, Col, Container } from 'reactstrap';
import { map, isEmpty, some } from 'lodash';
import ReactGifLoader from './ReactGifLoader';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
    bounce: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounce, 'bounce')
    }
  }

export default function AutoWeather(props) {
    console.log("props**", props);
    const [autoData, setAutoData] = useState(null);
    useEffect (()=>{
        if(isEmpty(autoData)) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const {cityname, districtVal, stateVal} = props;
                const liveLocation = `${position.coords.latitude},${position.coords.longitude}`;
                const val = cityname ? `${cityname},${districtVal},${stateVal},india`: liveLocation;
                 fetch(`http://api.weatherstack.com/current?access_key=ddaf735decc7e23802202dc2210ba9a8&query=${val}`)
                 .then(res=> res.json())
                 .then(res=>setAutoData(res))
              });
        }
    },[]);

    return (!isEmpty(autoData) ?
            map(autoData, (item,i)=>{
                const { observation_time, temperature, weather_descriptions, weather_icons }= item;

                return (item &&
                    <StyleRoot>
                        <Container key={i} >
                            <Row className="auto-child-cotainer text-center">
                                {observation_time &&
                                    <Col xs={12}>
                                        <h2>Aboservation Time</h2>
                                        {observation_time}
                                    </Col>
                                }
                                {temperature &&
                                    <Col style={styles.bounce} md={4}>
                                        <h2>temperature</h2>
                                        {temperature}
                                    </Col>
                                }
                                {weather_descriptions &&
                                    <Col  md={4}>
                                        <h2>weather_descriptions</h2>
                                        { weather_descriptions[0]}
                                    </Col>
                                }
                                {weather_icons &&
                                    <Col md={4}>
                                        <h2>weather_icons</h2>
                                        <img src={ weather_icons[0]} alt="weather icon"/>
                                    </Col>
                                }
                            </Row>
                        </Container>
                        </StyleRoot>
                )
            }):
            <ReactGifLoader/>
    )
}
