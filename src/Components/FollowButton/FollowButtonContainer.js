import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';
import FollowButtonContainer from '.';

const FollowButtonConatainer = ({ isFollowing, id }) => {
	const [ isFollowingS, setIsFollowing ] = useState(isFollowing);
	const [ followMutation ] = useMutation(FOLLOW, { variables: { id } });
	const [ unfollowMutation ] = useMutation(UNFOLLOW, { variables: { id } });

	const onClick = () => {
		if (isFollowingS === true) {
			setIsFollowing(false);
			unfollowMutation();
		} else {
			setIsFollowing(true);
			followMutation();
		}
	};
	return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonConatainer.propTypes = {
	isFollowing: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired
};

export default FollowButtonConatainer;
