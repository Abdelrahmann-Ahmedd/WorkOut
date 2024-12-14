import React from 'react';
import "./Home.css";

function Home() {
    return (
        <div style={{height:"92.3vh"}} className="home">
            <div className="layer text-center d-flex justify-content-center align-items-center ">
                <div className="content">
                <h1 className='text-danger mb-4'>Track Your Workouts and Achieve Your Goals.</h1>
                <p className=' opacity-50'>
                    Welcome to your personalized workout tracker! This app is designed to help you build and follow customized workout plans, track your progress, and achieve your fitness goals. Whether you’re following a push-pull-legs routine, 
                    upper-lower split, or any other workout plan, you can easily create and save exercises for each muscle group.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
