import React, { useEffect, useState } from 'react';
import { thirukkural, details } from "../data/thirukkural.js";
import './Thirukkural.css'
interface Kural {
    Number: number;
    Line1: string;
    Line2: string;
    Translation: string;
    [key: string]: string | number;
}




const Thirukkural = () => {
    const [kural, setKural] = useState<Kural | null>(null);
    const [adhikaram, setAdhikaram] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedExplanation, setSelectedExplanation] = useState("mv");
    const [showTranslation, setShowTranslation] = useState(false);

    const [selectedKuralNumber, setSelectedKuralNumber] = useState("");
    const [selectedAdhikaram, setSelectedAdhikaram] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const kuralToAdhikaram = {};
    const adhikaramList: string[] = [];


    // map adhikaram details and dropdown
    details.forEach(section => {
        section.section.detail.forEach(subSection => {
            subSection.chapterGroup.detail.forEach(chapterGroup => {
                chapterGroup.chapters.detail.forEach(chapter => {
                    for(let i = chapter.start; i < chapter.end; i++)
                        kuralToAdhikaram[i] = chapter.name;

                    if(!adhikaramList.includes(chapter.name)){
                        adhikaramList.push(chapter.name);
                    }
                })
            })
        })
    })

    useEffect(() => {
        try {
            const randomIndex = Math.floor(Math.random() * thirukkural[0].kural.length);
            const selectedKural = thirukkural[0].kural[randomIndex];
            setKural(selectedKural);

            // get kural number
            const kuralNumber = selectedKural.Number;
            const foundAdhikaram = kuralToAdhikaram[kuralNumber] || "Adhikaram Not found";
            setAdhikaram(foundAdhikaram);
            setSelectedKuralNumber(selectedKural.Number);
            setSelectedAdhikaram(foundAdhikaram);
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }, []);


    // explanation changes
    const handleExplanationChange = (event) => {
        setSelectedExplanation(event.target.value);
    }

    // view more button
    const toggleTranslation = () => {
        setShowTranslation(!showTranslation);
    }

    // kural number change
    const handleKuralNumberChange = (event) => {
        const value = event.target.value;
        if(value === "" || /^[0-9]+$/.test(value)){
            setSelectedKuralNumber(value);
            setErrorMessage("");
        }
        else{
            setErrorMessage("Please enter a valud number")
        }
    }

    // adhikaram change
    const handleAdhikaramChange = (event) => {
        const selectedAdhikaram = event.target.value;
        setSelectedAdhikaram(selectedAdhikaram);

        const selectedKural = thirukkural[0].kural.find(k => kuralToAdhikaram[k.Number] === selectedAdhikaram);

        if(selectedKural){
            setKural(selectedKural);
            setAdhikaram(selectedAdhikaram);
            setSelectedKuralNumber(selectedKural.Number);
        }
    }

    // kural number blur change
        const handleKuralNumberBlur = () => {
            const selectedNumber = parseInt(selectedKuralNumber);
    
            if (!selectedKuralNumber || isNaN(selectedNumber)) {
                setErrorMessage("Please enter a valid Kural number.");
                return;
            }
    
            // Find the selected Kural based on the Kural number
            const selectedKural = thirukkural[0].kural.find(k => k.Number === selectedNumber);
            if (selectedKural) {
                setKural(selectedKural);
                const kuralNumber = selectedKural.Number;
                const foundAdhikaram = kuralToAdhikaram[kuralNumber] || "Adhikaram Not Found";
                setAdhikaram(foundAdhikaram);
                setSelectedAdhikaram(foundAdhikaram); // Update Adhikaram based on the selected Kural
            } else {
                setErrorMessage("Kural number not found. Please enter a valid number.");
            }
        };

    return (
        <div className='kural-container'>
            <h3 className="heading">தினம் ஒரு குறள்</h3>
            {loading ? (
                <div className='loader'>
                    <div className='spinner'></div>
                    <p>Loading...</p>
                </div>
            ) : kural ? (
                <div className='kural-card'>
                    <div className='kural-header'>
                        <p className='kural-number'>
                        குறள் எண்
                        <input type="number" className='kural-number-input' value={selectedKuralNumber} onChange={handleKuralNumberChange} onBlur={handleKuralNumberBlur}/>
                        </p>
                        <p className='adhikaram'>
                        அதிகாரம்:
                        <select value={selectedAdhikaram} onChange={handleAdhikaramChange} className='adhikaram-select'>
                            <option value="">Select Adhikaram</option>
                            {adhikaramList.map((adhikaramName, index) => (
                                <option key={index} value={adhikaramName}>
                                    {adhikaramName}
                                </option>
                            ))}
                        </select>
                        </p>
                    </div>


                    {/* Error Message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* kural */}
                    <p className="section-title">குறள்</p>
                    <p className="line1">{kural.Line1}</p>
                    <p className="line2">{kural.Line2}</p>

                    {/* explanation */}
                    <p className="section-title">பொருள்</p>
                    <div className='explanation-selection'>
                        <label>
                            <input type="radio" name='meaningful' value="mv" checked={selectedExplanation == "mv"} onChange={handleExplanationChange}/>
                            Meaningful Verse (MV)
                        </label>
                        <label>
                            <input type="radio" name='meaningful' value="sp" checked={selectedExplanation == "sp"}  onChange={handleExplanationChange}/>
                            Simplified / Standard Prose (SP)
                        </label>
                        <label>
                            <input type="radio" name='meaningful' value="mk" checked={selectedExplanation == "mk"}  onChange={handleExplanationChange}/>
                            Muththurai Kural (MK)
                        </label>
                    </div>

                    {/* show the selected explanation */}
                    <p className='mk'>{kural[selectedExplanation]}</p>

                    {/* view more button */}
                    <button onClick={toggleTranslation} className='view-more-btn'>
                        {showTranslation ? "Show Less" : "View More Details"}
                    </button>   

                    {showTranslation && <p className='translation'>Translation: {kural.Translation}</p>}


                </div>
            ) : (
                <p className='error-message'>No Kural Found</p>
            )

            }
        </div>
    )
}

export default Thirukkural
