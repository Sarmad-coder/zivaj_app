import React from 'react';
import StarRating from 'react-native-star-rating';
import Color from './Color';

const StarRatingComponent = ({ initialRating, onRatingChange,starSize }) => {
  return (
    <StarRating
      disabled={false}
      maxStars={5}
      starSize={starSize}
      rating={initialRating}
      selectedStar={onRatingChange}
      fullStarColor={Color.primary}
    />
  );
};

export default StarRatingComponent;