import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const States=()=>{
    const[isDisabled,setIsDisabled]=useState(true);
    const[isDisabled1,setIsDisabled1]=useState(true);
    const[countries,setCountries]=useState([]);
    const[states,setStates]=useState([]);
    const[cities,setCities]=useState([]);
    const[countryNm,setCountryNm]=useState("");
    const[statement,setStatement]=useState(false);
    const[state,setState]=useState("");
    const[city,setCity]=useState("");

    const statementFn=(value)=>{
        setCity(value);
    if(cities.length>0)
    {
        setStatement(true);
    }
    }

    const getCities=async(stateName)=>{
        setIsDisabled1(false);
        try{
            setState(stateName);
            const countryData=await fetch(`https://crio-location-selector.onrender.com/country=${countryNm}/state=${stateName}/cities`);
            const response=await countryData.json();
            setCities(response);
            console.log("city",response);
            }
            catch(err)
            {
                console.log(err);
            }
    }

    const getStateData=async(countryName)=>{
        setCountryNm(countryName);
        setIsDisabled(false);
            try{
                const countryData=await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
                const response=await countryData.json();
                setStates(response);
                console.log("state",response);
                }
                catch(err)
                {
                    console.log(err);
                }
     }
    useEffect(()=>{
      const getCountryData=async()=>{
        try{
        const countryData=await fetch("https://crio-location-selector.onrender.com/countries");
        const response=await countryData.json();
        setCountries(response);
        console.log("country",response);
        }
        catch(err)
        {
            console.log(err);
        }
      } 
      getCountryData();
    },[])

    return(<>
    <h1 style={{textAlign:"center"}}>Select Location</h1>
    <div style={{textAlign:"center"}}>
    <select style={{padding:"0.5rem 1rem",width:"20rem",marginRight:"1rem"}} onChange={(e)=>getStateData(e.target.value)}>
    <option>Select Country</option>
        {countries.map((country)=>(
            <option value={country}>{country}</option>
        ))}
    </select>
    <select style={{padding:"0.5rem 1rem",width:"10rem",marginRight:"1rem"}} disabled={isDisabled} onChange={(e)=>getCities(e.target.value)}>
        <option>Select Country</option>
        {states.map((state)=>(<option value={state}>{state}</option>))}
    </select>
    <select style={{padding:"0.5rem 1rem",width:"10rem"}} disabled={isDisabled1} onChange={(e)=>{statementFn(e.target.value)}}>
        <option>Select Country</option>
        {cities.map((city)=>(<option value={city}>{city}</option>))}
    </select>
    </div>
    {statement && <div>
        <h3>You Selected <span style={{fontSize:"30px"}}>{city}</span>, <span style={{color:"gray"}}>{state},  {countryNm}</span> </h3>
        </div>}
    </>)
}
export default States;