import React, { useState } from 'react';
import "./BMI.css";

function BMI() {

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [bmi, setBmi] = useState(null);
    const [tdee, setTdee] = useState(null);

    const calculate = () => {
    // Convert height to meters for BMI calculation
        const heightInMeters = height / 100;
        const calculatedBmi = weight / (heightInMeters * heightInMeters);

    // Calculate BMR based on gender
        let bmr;
        if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

    // Calculate TDEE based on activity level
        const calculatedTdee = bmr * activityLevel;

    // Update the state with the calculated values
        setBmi(calculatedBmi);
        setTdee(calculatedTdee);
    };
    return (
        <div style={{height:"92.3vh"}} className='w-100   p-4'>
            <h2 className='text-center text-danger mb-3'>BMI and Total Calorie Calculator</h2>
            <form className='m-auto ' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='weight' className='mb-1'>
                Weight (kg):
                </label>
                <input id='weight' className='form-control'
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
                <br />
                <label htmlFor='height' className='mb-1'>
                Height (cm):                
                </label>
                <input id='height' className='form-control'
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                />
                <br />
                <label htmlFor='age' className='mb-1'>
                Age:                
                </label>
                <input id='age' className=' form-control'
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <br />
                <label htmlFor='gender'className='mb-1'>
                Gender:
                </label>
                <select id='gender' className='form-control' value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <br />
                <label htmlFor='activity' className='mb-1'>
                Activity Level:
                </label>
                <select id='activity' className='form-control'
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(Number(e.target.value))}
                >
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                    <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                    <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                    <option value="1.9">Super active (very hard exercise, physical job, or training twice a day)</option>
                </select>
                <br />
                <button type="submit" className='btn btn-danger w-50  d-block m-auto' onClick={calculate}>
                Calculate
                </button>
            </form>

            {bmi && tdee ?(
                <div className='mt-3 text-center'>
                <p><strong className='text-danger'>BMI:</strong> {bmi.toFixed(2)}</p>
                <p><strong className='text-danger'>Daily Caloric Needs:</strong> {tdee.toFixed(0)} kcal</p>
                </div>
            ):""}
        </div>
    )
}

export default BMI;
