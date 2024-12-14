import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

function Loading() {
    return (
        <div style={{height:"calc(100vh - 56px)"}} className='d-flex justify-content-center align-items-center'>
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#dc3545"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
        </div>
    )
}

export default Loading;
