import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import { Box } from '@chakra-ui/react';
import avatarImage from '../media/nasa-logo.png';
import moment from 'moment';
import Like from './Like';

import SwiperCore, {
	Keyboard,
	Scrollbar,
	Pagination,
	Navigation,
} from 'swiper/core';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';


const useStyles = makeStyles({
	media: {
		height: 0,
		paddingTop: '60%',
	},
	swiperContainer: {
		paddingBottom: '3rem',
		'& .swiper-pagination-bullet': {
			background: 'blue',
		},
		'& .swiper-button-next:after': {
			fontSize: '2rem !important',
            marginBottom: "100px",
		},
		'& .swiper-button-prev:after': {
			fontSize: '2rem !important',
            marginBottom: "100px",
		},
	},
})

SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation]);
const apiKey = process.env.REACT_APP_NASA_API_KEY;

const PhotosCarousel = () => {
	const { media, swiperContainer } = useStyles();
    const [photosData, setPhotosData] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await fetch(
                    `https://api.nasa.gov/planetary/apod?count=20&api_key=${apiKey}`
                );
                const dataRetrieved = await res.json();
                setPhotosData(dataRetrieved);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPhotos();
    }, []);

    if (!photosData) return <Box />;

	return (
        <Box boxShadow="0 3px 10px rgb(0 0 0 / 0.2)">
            <Card>
                <CardHeader
                    avatar={<Avatar src={avatarImage} />}
                    title='To_the_moon'
                    subheader={moment().format('ll')}
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />

                <Swiper
                    grabCursor
                    keyboard={{ enabled: true }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className={swiperContainer}
                >
                    {photosData.map((photoData, index) => (
                        <>
                        <SwiperSlide key={index}>
                            <CardMedia className={media} image={photoData.url} />

                            <CardActions disableSpacing>
                                <Like title={photoData.title} />
                                <IconButton>
                                    <CommentIcon />
                                </IconButton>
                                <IconButton>
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                            
                            <CardContent>
                                <Typography variant='body3' color='textSecondary' component='p' style={{marginBottom: "10px"}}>
                                    {photoData.title}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p' style={{marginBottom: "10px"}}>
                                    Captured: {moment(photoData.date).format('ll')}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {photoData.explanation.substr(0, 300)}...
                                </Typography>
                            </CardContent>
                        </SwiperSlide>
                    </>
                    ))}
                </Swiper>
            </Card>
        </Box>
	)
}

export default PhotosCarousel;