import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExercise, getAllCategories, setExercise } from "../../ReduxStore/exerciseSlice";
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

function Exercise() {


    useEffect(()=>{
        dispatch(getAllExercise("All"));
        dispatch(getAllCategories());
    },[])
    
    
    const { allCategories, allExercise, isLoading} = useSelector((store)=> { return store.exerciseReducer});
    const dispatch = useDispatch();
    
    function setPlan(exercise) {
        dispatch(setExercise(exercise));
    }

    if(isLoading===true) {
        return <Loading />;
    }

    return (
        <div className='p-5  bg-dark'>
            <select onChange={(e)=>{dispatch(getAllExercise(e.target.value))}}  name="bodyList" className=' form-control w-50 m-auto' id="bl">
                <option value="All">All</option>
                {allCategories?.map((category,ind)=>{return <option key={ind} value={category}>{category}</option> })}
            </select>
            {/* {console.log(allExercise)} */}
            <div className=' container pt-5'>
                <div className="row gy-5">
                    {allExercise?.map((exercise,ind)=> {return <div key={ind} className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
                            <div className="card bg-dark rounded-3 border-0 shadow-lg p-3" style={{width:"18rem",height:"100%"}}>
                                <Link className=' text-decoration-none' to={`/exerciseDetails/${exercise.id}`}>
                                    <img loading='lazy' src={exercise.gifUrl} className="card-img-top" alt={exercise.name}/>
                                </Link>
                                <div className="card-body border-0 text-white">
                                    <h5 className="card-title text-center">{exercise.name.split(" ").slice(0,2).join(" ").toUpperCase()}</h5>
                                    <h6 className='card-title text-center opacity-50'>{exercise.bodyPart}</h6>
                                    <button onClick={()=>{setPlan(exercise)}} className='w-50 btn btn-danger m-auto d-block mt-4'>Add</button>
                                </div>
                            </div>
                    </div>  })}
                </div>
            </div>
        </div>
    )
}

export default Exercise;
