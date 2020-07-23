import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
const data = [
  'raj',
  'rohit',
  'ranju',
  'ganes',
];

export default function Weather() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataval, setCountry] = useState({
          setVal: data[0],
          isOpenCountry: false,
        })
  const toggle = () => setDropdownOpen(prevState => !prevState);

  let addCountry = (val) => setCountry({
    setVal: val,
    isOpenCountry: true,
  });

  // useEffect(() => {
  //     fetch(`http://api.weatherstack.com/current?access_key=ddaf735decc7e23802202dc2210ba9a8&query=india`)
  // .then(data=> data.json())
  // .then(res=>{
  //         console.log("res***", res);
  //     })
  //   },[]);
  const {setVal, isOpenCountry} = dataval;
  const newdata = data.map((item, i)=>{
    if (item == setVal){
      return false
    }
    return item
  })
    console.log("setval", newdata);
  return (
    <Container>
        <Row>
        <Col>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {setVal}
            </DropdownToggle>
            <DropdownMenu onClick={e => e.stopPropagation()}>
              {newdata.map((ites,i)=>{
                return (
                <DropdownItem key={i} onClick={()=>addCountry(ites)}>{ites}</DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </Col>
        {isOpenCountry && <Col>new dropdowen</Col>}
      </Row>
    </Container>

  )
}
