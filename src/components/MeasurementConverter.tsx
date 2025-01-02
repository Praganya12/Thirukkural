import React, { useState } from 'react';
import './MeasurementConverter.css'

const conversionData = {
    Temperature: {
        units: ["Celsius", "Fahrenheit"],
        convert: {
            toSecond: (value) => (value === "" ? "" : ((value * 9) / 5 + 32).toFixed(2)),
            toFirst: (value) => (value === "" ? "" : (((value - 32) * 5) / 9).toFixed(2)),
        },
    },
    Length: {
        units: ["Meters", "Feet"],
        convert: {
            toSecond: (value) => (value === "" ? "" : (value * 3.28084).toFixed(2)),
            toFirst: (value) => (value === "" ? "" : (value / 3.28084).toFixed(2)),
        },
    },
    Weight: {
        units: ["Kilograms", "Pounds"],
        convert: {
          toSecond: (value) => (value === "" ? "" : (value * 2.20462).toFixed(2)),
          toFirst: (value) => (value === "" ? "" : (value / 2.20462).toFixed(2)),
        },
      },
      
}

const MeasurementConverter = () => {

    const [selectedType, setSelectedType] = useState("Temperature");
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");


    // when first input changes
    const handleFirstValueChanges = (value) => {
        setFirstValue(value);
        const converted = conversionData[selectedType].convert.toFirst(value);
        setSecondValue(converted);
    };

    // when second input changes
    const handleSecondValueChanges = (value) => {
        setSecondValue(value);
        const converted = conversionData[selectedType].convert.toSecond(value);
        setFirstValue(converted);
    };

    // reset both input fields
    const resetFields = () => {
        setFirstValue("");
        setSecondValue("");
    }



    // const [celsius, setCelsius] = useState("");
    // const [fahrenheit, setFahrenheit] = useState("");

    // const convertCelsius = (value) => {
    //     setCelsius(value);
    //     if (value == "") {
    //         setFahrenheit("");
    //     }
    //     else {
    //         setFahrenheit(((value * 9) / 5 + 32).toFixed(2));
    //     }
    // }

    // const convertFahrenheit = (value) => {
    //     setFahrenheit(value);
    //     if (value == "") {
    //         setCelsius("");
    //     }
    //     else {
    //         setCelsius((((value - 32) * 5) / 9).toFixed(2));
    //     }
    // }

    return (
        <section className='container'>
            <h1 className='unit-converter-title'>Unit Converter</h1>
            <div className='unit-types'>
                {Object.keys(conversionData).map((type) => (
                    <button key={type} className={selectedType === type ? "active" : ""} onClick={() => {
                        setSelectedType(type);
                        resetFields();
                    }}
                    >
                        {type}
                    </button>
                ))}
                {/* conversion inputs */}

                <div className='conversion-section'>
                    <div className='input-group'>
                        <label htmlFor='first-input'>{conversionData[selectedType].units[0]}</label>
                        <input type="number" placeholder={`Enter ${conversionData[selectedType].units[0]}`} value={firstValue} onChange={(e) => handleFirstValueChanges(e.target.value)} />
                    </div>
                    <span className='equals'> = </span>
                    <div className='input-group'>

                        <label htmlFor='second-input'>{conversionData[selectedType].units[1]}</label>
                        <input type="number" placeholder={`Enter ${conversionData[selectedType].units[1]}`} value={secondValue} onChange={(e) => handleSecondValueChanges(e.target.value)} />

                    </div>
                </div>
            </div>

            {/* reset Button */}
            <button onClick={resetFields} style={{ marginTop: "20px", padding: "10px 15px" }}>
                Reset
            </button>
        </section>
    )
}

export default MeasurementConverter
