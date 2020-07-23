import React, { useState, useEffect } from 'react';
import Weather from './weather';

export default function FirstExample() {
    const [count, setcount] = useState({
        label: 'Add',
        incre: 0,
        isAddFalse: false,
    }),
    {label, incre, isAddFalse}= count,
    counted = isAddFalse ? incre: label;

    return (
        <div style={{textAlign:'center'}}>
            <Weather/>
            <button onClick={()=>{setcount({
                incre: incre+1,
                isAddFalse: true,
            })}}>
                {counted}
            </button>
        </div>
    )
}
