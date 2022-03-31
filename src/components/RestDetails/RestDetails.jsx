import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getRestaurant } from '../../actions/restaurants';
import useStyles from './styles';

const Restaurant = () => {
  const { restaurant, restaurants, isLoading } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRestaurant(id));
  }, [id]);

  if (!restaurant) return null;

  const openRestaurant = (_id) => history.push(`/restaurant/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={styles.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedRestaurants = restaurants.filter(({ _id }) => _id !== restaurant._id);

  return (
    <Paper className={styles.container} elevation={6}>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">{restaurant.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{restaurant.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          {/* <Typography className={styles.message} gutterBottom variant="body1" component="p">{post.message}</Typography> */}
          <Typography variant="h6">
            Created by:
            <Link to={`/creator/${restaurant.state}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${restaurant.state}`}
            </Link>
          </Typography>
          <div className={styles.imageSection}>
            {restaurant.selectedFile ? 
              <img className={styles.pic} src={restaurant.selectedFile}  alt={restaurant.title}/> : 
              <img className={styles.nopic} src={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={restaurant.title} />}
          </div>
          {/* <Typography variant="body1">{moment(restaurant.createdAt).fromNow()}</Typography> */}
          <Divider style={{ margin: '20px 0' }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {!!recommendedRestaurants.length && (
        <div className={styles.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={styles.recommendedRestaurants}>
            {recommendedRestaurants.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openRestaurant(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Restaurant;
