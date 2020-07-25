import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { filter, map, indexOf, isEmpty } from 'lodash';
import './App.css';
import AutoWeather from './AutoWeather';

export default function Weather() {
  const [stateData, setStatesData] = useState([]),
        [districtData, setDistrictData] = useState([]),
        [citiesData, setCitiesData] = useState([]),
        [ toggleall, setToggleAll] = useState({
          s_toggle: false,
          d_toggle: false,
          c_toggle: false,
        }),
        [stateToggleData, setStateToggle] = useState({
          stateVal: 'States',
          isOpenState: false,
        }),
        [districtToggleData, setDistrictToggle] = useState({
          districtVal: 'District',
          isOpenDistrict: false,
        }),
        [cityToggleData, setCityToggle] = useState({
          cityVal: 'City',
          isOpenCity: false,
        }),
        addState = (val) => setStateToggle({
          stateVal: val,
          isOpenState: true,
        }),
        addDistrict = (val)=> setDistrictToggle({
          districtVal: val,
          isOpenDistrict: true,
        }),
        addCity = (val) => setCityToggle({
          cityVal: val,
          isOpenCity: true,
        }),
        {stateVal, isOpenState} = stateToggleData,
        {districtVal,isOpenDistrict}= districtToggleData,
        {cityVal, isOpenCity} = cityToggleData,
        {s_toggle, d_toggle, c_toggle} = toggleall;

    useEffect(() => {
      fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities`)
      .then(data=> data.json())
      .then(res=>setStatesData(res))
    },[]);

    const allStates=map(stateData, 'State'),
          uniqueArray = filter(allStates, function(item, pos) {
            return indexOf(allStates, item) === pos;
          }),
          selectCountry = (val) =>{
            const tes = map(stateData);
            const test = filter(tes, ['State', val]);
            const test2 = map(test, 'District');
            const test3 = filter(test2, function(item, pos){
              return indexOf(test2, item) === pos;
            });
            setDistrictData(test3);
            !isEmpty(districtData) && addDistrict('District');
            !isEmpty(citiesData) && addCity('City');
          },
          selectCity = (val) =>{
            const tes = map(stateData);
            const test = filter(tes, ['District', val]);
            const test2 = map(test, 'City');
            const test3 = filter(test2, function(item, pos){
              return indexOf(test2, item) === pos;
            });
            setCitiesData(test3);
            !isEmpty(citiesData) && addCity('City');
          },
          countryvalues = uniqueArray.map((item, i)=>{
            if (item === stateVal) {
              return false
            }
            return item
          }),
          districValue = districtData.map((item, i)=>{
            if (item === districtVal) {
              return false
            }
            return item
          }),
          cityValue = citiesData.map((item, i)=>{
            if (item === cityVal) {
              return false
            }
            return item
          }),
          [stateDropdown, stateDropdownOpen] = useState(false),
        statettoggle = () => {
          stateDropdownOpen(prevState => !prevState);
          setToggleAll({
            s_toggle: true,
          d_toggle: false,
          c_toggle: false,
          });
        },
        [districtDropdown, districtDropdownOpen] = useState(false),
        districttoggle = () => {
          districtDropdownOpen(prevState => !prevState);
          setToggleAll({
            s_toggle: false,
          d_toggle: true,
          c_toggle: false,
          });
        },
        [cityDropdown, cityDropdownOpen] = useState(false),
        citytoggle = () => cityDropdownOpen(prevState => !prevState);
        const testew = districtVal === 'District' || cityVal === 'City';
          console.log("toggleall**", toggleall);
  return (
    <>
        <Row className="text-center rows" >
        <Col lg={(isOpenState && isOpenDistrict) ? 4: isOpenState ? 6 : 12 } className="cols">
          <Dropdown isOpen={stateDropdown} toggle={statettoggle}>
            <DropdownToggle caret>
              {stateVal}
            </DropdownToggle>
            <DropdownMenu onClick={e => e.stopPropagation()}>
              {countryvalues.map((ites,i)=>{
                return (
                <DropdownItem key={i} onClick={()=>{addState(ites); selectCountry(ites)}}>{ites}</DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </Col>
        {isOpenState &&
          <Col lg={isOpenDistrict ? 4 : 6} className="cols">
            <Dropdown isOpen={districtDropdown} toggle={districttoggle}>
            <DropdownToggle caret>
              {districtVal}
            </DropdownToggle>
            <DropdownMenu onClick={e => e.stopPropagation()}>
              {districValue.map((ites,i)=>{
                return (
                <DropdownItem key={i} onClick={()=>{addDistrict(ites); selectCity(ites)}}>{ites}</DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
          </Col>
        }
        {isOpenDistrict &&
          <Col lg={4} className="cols">
             <Dropdown isOpen={cityDropdown} toggle={citytoggle}>
            <DropdownToggle caret>
              {cityVal}
            </DropdownToggle>
            <DropdownMenu onClick={e => e.stopPropagation()}>
              {cityValue.map((ites,i)=>{
                return (
                <DropdownItem key={i} onClick={()=>addCity(ites)}>{ites}</DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
          </Col>
        }
      </Row>
      {!testew &&
        <AutoWeather
          cityname= {cityVal}
          stateVal={stateVal}
          districtVal= {districtVal}
        />
      }
      </>
  )
}
