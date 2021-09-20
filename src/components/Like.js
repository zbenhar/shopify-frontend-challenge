import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const Like = ({ title }) => {
    const [like, setLike] = useState(false);
    const [counter, setCounter] = useState(0);

    const mapper = new Map();

    const handleLike = (id) => {
        console.log(mapper);
        setCounter(counter + 1);
        mapper.set(id, like); // key value pair
        setLike(true);
        if (like && mapper.get(id) === true) {
            setLike(false);
            setCounter(counter - 1);
            mapper.delete(id);
        }
        
        const myStorage = window.localStorage;
        myStorage.setItem(id, like);
        if (like === true) {
            const mapper2 = new Map();
            mapper2.set(id, like); // keeps it as liked in the second map
        }
    }

    return (
        <IconButton onClick={() => handleLike(title)}>
            <ThumbUpIcon />
            <Typography>{counter > 0 ? counter : ''}</Typography>
        </IconButton>
    );
}

export default Like;