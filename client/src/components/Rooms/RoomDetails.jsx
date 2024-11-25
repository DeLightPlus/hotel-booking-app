import React from 'react'
import { useParams } from 'react-router';
// import { useParams } from 'react';

const RoomDetails = ({room}) =>
{
    // console.log('param/id:', props.match.params.id);
    const {id} = useParams()
    console.log('lee',id, room)

    
    return (
        <div>
            <h1>Room Details</h1>            
        </div>
    )
}

export default RoomDetails;
