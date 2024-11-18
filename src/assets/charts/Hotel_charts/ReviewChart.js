import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '250px', // Fixed width for consistency
    height: '200px', // Fixed height for consistency
    padding: '16px',
    margin: '10px',
    borderRadius: '8px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: props => getBackgroundColor(props.rating),
    color: 'black',
  },
  detail: {
    marginBottom: '8px',
    fontSize: '14px',
  },
  starIcon: {
    marginRight: '5px',
    fontSize: '18px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  comment: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333',
  },
  platformDate: {
    fontSize: '12px',
    color: '#666',
  }
});

const getBackgroundColor = (rating) => {
  if (rating >= 4) return 'rgba(76, 175, 80, 0.2)'; // Very light green
  if (rating === 3) return 'rgba(255, 193, 7, 0.2)'; // Very light yellow
  return 'rgba(255, 82, 82, 0.2)'; // Very light red
};

const ReviewCard = ({ review }) => {
  const classes = useStyles(review);

  return (
    <div className={classes.card}>
      <div className={classes.rating}>
        <FontAwesomeIcon icon={faStar} className={classes.starIcon} />
        <span>{review.rating} Stars</span>
      </div>
      <div className={classes.comment}>
        {review.comment}
      </div>
      <div className={classes.platformDate}>
        <strong>Platform:</strong> {review.platform} <br />
        <strong>Date:</strong> {review.date}
      </div>
    </div>
  );
};

export default ReviewCard;
