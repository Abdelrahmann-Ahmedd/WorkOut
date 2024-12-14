import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExerciseDetails  } from "../../ReduxStore/exerciseSlice";
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

function ExerciseDetails() {

    const {id} = useParams("id");

    useEffect(()=>{
        dispatch(getExerciseDetails(id));
    },[])

    const { exerciseDetails, isLoading } = useSelector((store)=> { return store.exerciseReducer});
    const dispatch = useDispatch();
    

    if(isLoading===true) {
        return <Loading />
    }

    return (
        <div className='bg-dark'>
            <div className='container mt-5 pt-5'>
            {exerciseDetails&&<div className="row align-items-center">
                <div className="col-lg-6 ">
                    <figure className=' d-flex justify-content-center '>
                        <img  loading='lazy' className='w-75 rounded-5' src={exerciseDetails.gifUrl} alt={exerciseDetails.name} />
                    </figure>
                </div>
                <div className="col-lg-6 ">
                    <div className='p-4'>
                        <h2 className=' fs-4 opacity-75 mt-3' >Name: <span className=' ms-3 fs-5 opacity-50'>{exerciseDetails.name.split(" ").slice(0,2).join(" ")}</span> </h2>
                        <h2 className=' fs-4 opacity-75 mt-3' >Body Part: <span className=' ms-3 fs-5 opacity-50'>{exerciseDetails.bodyPart}</span> </h2>
                        <div className='d-flex flex-wrap mt-3'>
                            <h2 className='fs-4 opacity-75 fw-bold'>Equipment: <span className=' ms-3 fs-5 opacity-50'>{exerciseDetails.equipment}</span> </h2>
                            <h2 className='fs-4 ms-5 opacity-75 fw-bold'>Target: <span className=' ms-3 fs-5 opacity-50'>{exerciseDetails.target}</span></h2>
                        </div>
                        <h2 className='fs-5 opacity-75 fw-bold mt-3'>Secondary Muscles: {exerciseDetails.secondaryMuscles.map((sec)=>{return <span className='fs-6 p-2 rounded-3 shadow-lg  me-2 opacity-75'>{sec} </span>})}</h2>
                        <h2 className='fs-5 opacity-75 fw-bold mt-3' >Instructions: <p className='mt-3 opacity-75 fs-6 fw-light'>{exerciseDetails.instructions}</p></h2>
                    </div>
                </div>
            </div>}
        </div>
        </div>
    )
}

export default ExerciseDetails;
