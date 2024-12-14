import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PlanLayout() {

    const {planedExercise } = useSelector((store)=> { return store.exerciseReducer});
    const [exercises, setExercises] = useState([]);

    // Load exercises from localStorage on component mount
    useEffect(() => {
        const storedExercises = JSON.parse(localStorage.getItem("planExercise")) || planedExercise;
        makeNumbers(storedExercises);
        localStorage.setItem("planExercise",JSON.stringify(storedExercises));
        setExercises(storedExercises);
    }, []);

    // Delete an exercise and update state + localStorage
    function deleteExercise(exer) {
        const updatedExercises = exercises.filter((e) => e !== exer);
        setExercises(updatedExercises);
        toast.success('Successfully Deleted!');
        localStorage.setItem("planExercise", JSON.stringify(updatedExercises));
    }

    function makeNumbers(allExer) {
        allExer.map((exer)=>{
            if(!exer.counter) {
                exer.counter = 0;
            }
            if (!exer.weight) {
                exer.weight = 0;
            }
            if (!exer.edit) {
                exer.edit = false;
            }
        })
    }

    function addCounter(ind) {
        let count = exercises[ind].counter;
        let updatedStore = JSON.parse(JSON.stringify(exercises));
        updatedStore[ind].counter = ++count;
        setExercises(updatedStore);
        localStorage.setItem("planExercise",JSON.stringify(updatedStore));
    }

    function addWeight(ind) {
        let weight = exercises[ind].weight;
        let updatedStore = JSON.parse(JSON.stringify(exercises));
        weight += 0.5;
        updatedStore[ind].weight = weight;
        setExercises(updatedStore);
        localStorage.setItem("planExercise",JSON.stringify(updatedStore));
    }

    function delCounter(ind) {
        let count = exercises[ind].counter;
        let updatedStore = JSON.parse(JSON.stringify(exercises));
        if(updatedStore[ind].counter !== 0) {
            updatedStore[ind].counter = --count;
        }
        setExercises(updatedStore);
        localStorage.setItem("planExercise",JSON.stringify(updatedStore));
    }

    function delWeight(ind) {
        let weight = exercises[ind].weight;
        let updatedStore = JSON.parse(JSON.stringify(exercises));
        if(updatedStore[ind].weight !== 0) {
            weight -= 0.5;
            updatedStore[ind].weight = weight;
        }
        setExercises(updatedStore);
        localStorage.setItem("planExercise",JSON.stringify(updatedStore));
    }

    function changeEdit(ind) {
        let edit = exercises[ind].edit;
        let updatedStore = JSON.parse(JSON.stringify(exercises));
        updatedStore[ind].edit = !edit;
        if(updatedStore[ind].edit === false) {
            toast.success("Successfully Edit!")
        }
        setExercises(updatedStore);
        localStorage.setItem("planExercise",JSON.stringify(updatedStore));
    }

    if (!exercises.length) {
        return <div className='h-75 d-flex justify-content-center align-items-center'>
            <Link to="/exercise" className='btn btn-danger btn-lg'>Let's Make Your Plan</Link>
        </div>
    }

    return (
        <div className='pt-5 bg-dark'>
            <div className=' container'>
                <div className="row gy-5 pb-4">{exercises?.map((exercise,ind)=> {return <div key={ind} className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
                    <div className="card bg-dark rounded-3 border-0 shadow-lg p-3" style={{width:"18rem",height:"100%"}}>
                        <Link className=' text-decoration-none' to={`/exerciseDetails/${exercise.id}`}>
                            <img loading='lazy' src={exercise.gifUrl} className="card-img-top" alt={exercise.name}/>
                        </Link>
                        <div className="card-body border-0 text-white">
                            <h5 className="card-title text-center">{exercise.name.split(" ").slice(0,2).join(" ").toUpperCase()}</h5>
                            <h6 className='card-title text-center opacity-50'>{exercise.bodyPart}</h6>
                            {exercise.edit?                            <div>
                                <div className='d-flex justify-content-evenly align-items-center '>
                                    <h6>Counter</h6>
                                    <button onClick={()=>{delCounter(ind)}} className='btn btn-outline-danger fw-bolder'>-</button>
                                    <span>{exercise.counter}</span>
                                    <button onClick={()=>{addCounter(ind)}} className='btn btn-outline-danger fw-bolder'>+</button>
                                </div>
                                <div className='d-flex justify-content-evenly align-items-center mt-3 '>
                                    <h6>Weights</h6>
                                    <button onClick={()=>{delWeight(ind)}} className='btn btn-outline-danger fw-bolder'>-</button>
                                    <span>{exercise.weight}</span>
                                    <button onClick={()=>{addWeight(ind)}} className='btn btn-outline-danger fw-bolder'>+</button>
                                </div>
                            </div>:<div className=' d-flex justify-content-around mt-3 opacity-75'>
                                <h6 className='fw-light'>Counter: {exercise.counter}</h6>
                                <h6 className='fw-light'>Weight: {exercise.weight}</h6>
                            </div>}
                            <div className=' d-flex'>
                                <button onClick={()=>{deleteExercise(exercise)}} className='w-50 btn btn-danger m-auto d-block mt-4'>Delete</button>
                                <button onClick={()=>{changeEdit(ind)}} className='w-50 btn btn-success m-auto d-block mt-4 ms-2 text-white'>{exercise.edit?"Save":"Edit"}</button>
                            </div>
                        </div>
                    </div>
                    </div>  })}
                </div>
            </div>
        </div>
    )
}

export default PlanLayout;