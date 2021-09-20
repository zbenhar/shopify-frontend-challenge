import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const Like = ({ title }) => {
    const [like, setLike] = useState(false);
    const [counter, setCounter] = useState(0);

    const mapper = new Map();

    const handleLike = (id) => {
        setCounter(counter + 1);
        mapper.set(id, like);
        setLike(true);

        if (like && mapper.get(id)) {
            setLike(false);
            setCounter(counter - 1);
            mapper.delete(id);
        }
        
        const myStorage = window.localStorage;
        myStorage.setItem(id, like);
        if (like) {
            const mapper2 = new Map();
            mapper2.set(id, like);
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