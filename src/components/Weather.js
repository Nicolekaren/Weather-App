import React from 'react'
import "./weather.css"
import { useState } from "react";
import DisplayWeather from './DisplayWeather';

export default function Weather() {
    //variable
    const APIKEY= "4d1ba86814fbab322014694e03a20a7c";

    //useState hook: keeps track of the comp's state
    const [form, setForm ]= useState({
        city:"",
        country:""
    }
    );

    //creates a new state to hold the weather data
    const [weather, setWeather] = useState(
        [//store the data as a key value pair
    ])

    //function that handles the change in the state, typically an arrow function
    const handleChange=(e)=>{
        let name= e.target.name
        let value= e.target.value

        if(name=="city"){
            setForm({...form, city:value})
        }

        if(name=="country"){
            setForm({...form, country:value})
        }

    }

    //function that will fetch us the weather data
    //ASYNCH: because we'll fetch data from the API asynchronously
    async function weatherData(e){
        e.preventDefault();
        if(form.city==""){
            alert("Add values");
        }
        //await is used before fetch
        else{
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`)
       
            .then((res)=> res.json()) //turns the promise object into json format
            .then((data)=> data); //gathers the data from the promise object

            setWeather({
                data: data // sets data(weather state) : data(the actual data from the promise)
            }); //UPDATES THE WEATHER STATE (according to the data passed here)
        }
    }

  return (
    <div className='weather'>
        <span className='title'>Weather App</span>
        <br></br>
        <form>
            <input type="text" name='city' placeholder="city" onChange={(e)=>handleChange(e)}></input>
            &nbsp; &nbsp; &nbsp;
            <input type="text" name='country' placeholder="country" onChange={(e)=>handleChange(e)}></input>
            <button name="getweather" onClick={(e)=> weatherData(e)}>Submit</button>
        </form>

        {
            weather.data!= undefined ?
            <div>
                <DisplayWeather data ={weather.data}></DisplayWeather>
            </div>

            :null
        }
    </div>
  )
}
