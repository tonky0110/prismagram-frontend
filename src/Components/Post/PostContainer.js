import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';

const PostContainer = ({
	id = '',
	location = '',
	caption = '',
	user,
	files = [],
	likeCount,
	isLiked = false,
	comments = [],
	createdAt
}) => {
	const [ isLikedState, setIsLikedState ] = useState(isLiked);
	const [ likeCountState, setLikeCountState ] = useState(likeCount);
	const comment = useInput('');

	return (
		<PostPresenter
			user={user}
			location={location}
			caption={caption}
			files={files}
			createdAt={createdAt}
			comments={comments}
			isLiked={isLikedState}
			setIsLikedState={setIsLikedState}
			likeCount={likeCountState}
			setLikeCountState={setLikeCountState}
			newComment={comment}
		/>
	);
};

PostContainer.propTypes = {
	id: PropTypes.string.isRequired,
	location: PropTypes.string,
	caption: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired
	}).isRequired,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	).isRequired,
	likeCount: PropTypes.number,
	isLiked: PropTypes.bool.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired
			}).isRequired
		})
	).isRequired,
	createdAt: PropTypes.string.isRequired
};
export default PostContainer;
