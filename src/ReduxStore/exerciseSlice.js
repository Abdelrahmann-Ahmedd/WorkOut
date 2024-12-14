import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


export const getAllExercise =  createAsyncThunk( 'exercise/allExercise' , (caty) =>{
    if(caty==="All"){
        return axios.get( "https://exercisedb.p.rapidapi.com/exercises", {
            headers: {
                'x-rapidapi-key': '72b244ebe8msh9b8852610de67a8p142160jsn73cbca49aab6',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            },
            params: {
                limit: '50',
                offset: '0'
            },
        } )
    } else {
        return axios.get( `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${caty}`, {
            headers: {
                'x-rapidapi-key': '72b244ebe8msh9b8852610de67a8p142160jsn73cbca49aab6',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            },
            params: {
                limit: '50',
                offset: '0'
            },
        } )
    }
} );

export const getAllCategories = createAsyncThunk( 'exercise/allCategories' , ()=> {
    return axios.get( 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList' , {
        headers: {
            'x-rapidapi-key': '72b244ebe8msh9b8852610de67a8p142160jsn73cbca49aab6',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    } )
} )

export const getExerciseDetails = createAsyncThunk( 'exercise/exerciseDetails' , (id)=> {
    return axios.get( `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}` , {
        headers: {
            'x-rapidapi-key': '72b244ebe8msh9b8852610de67a8p142160jsn73cbca49aab6',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    } )
} )

const exercises = createSlice({

    name: "exercise",
    
    initialState: {
        allExercise: null,
        allCategories: null,
        exerciseDetails: null,
        isLoading: false,
        planedExercise: localStorage.getItem("planExercise")?JSON.parse(localStorage.getItem("planExercise")):[],
    },

    reducers: {
        setExercise(state,action) {
            const exercise = action.payload;
            const flag = state.planedExercise.some((item) => item.id === exercise.id);
            if (!flag) {
                state.planedExercise.push(exercise);
                toast.success('Successfully Added!');
                localStorage.setItem("planExercise",JSON.stringify(state.planedExercise));
            }
        }
    },

    extraReducers: function(builder) {
        builder.addCase(getAllExercise.fulfilled, function(state, action){
            state.allExercise = action.payload.data;
            state.isLoading = false;
        });

        builder.addCase(getAllExercise.pending, function(state, action){
            action.payload = null;
            state.isLoading = true;
        });

        builder.addCase(getAllCategories.fulfilled, function(state, action){
            state.allCategories = action.payload.data;
            state.isLoading = false;
        });

        builder.addCase(getAllCategories.pending, function(state, action){
            state.isLoading = true;
        });

        builder.addCase(getExerciseDetails.fulfilled, function(state, action){
            state.exerciseDetails = action.payload.data;
            state.isLoading = false;
        });

        builder.addCase(getExerciseDetails.pending, function(state, action){
            state.isLoading = true;
        });
    }
})


export default exercises.reducer;
export const { setExercise } = exercises.actions; // Export the action
