import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PhotosCarousel from './PhotosCarousel'

const Home = () => {
	return (
		<div className='App'>
			<Grid container>
				<Grid
					item
					xs={12}
					style={{ height: '20vh', display: 'grid', placeItems: 'center' }}
				>
					<Typography variant='h3'>Spacegram</Typography>
				</Grid>

				<Grid item container xs={12} justifyContent='center'>
					<Grid item xs={3}>
						<PhotosCarousel />{' '}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;