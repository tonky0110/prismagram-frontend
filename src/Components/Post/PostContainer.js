import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { ADD_COMMENT, TOGGLE_LIKE } from './PostQueries';
import { toast } from 'react-toastify';

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
	const [ currentItem, setCurrentItem ] = useState(0);
	const [ selfComments, setSelfComments ] = useState([]);
	const comment = useInput('');
	const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE, {
		variables: { postId: id }
	});
	const [ addCommentMutation ] = useMutation(ADD_COMMENT, {
		variables: { postId: id, text: comment.value }
	});

	useEffect(
		() => {
			const totalFiles = files.length;
			if (currentItem === totalFiles - 1) {
				setTimeout(() => setCurrentItem(0), 3000);
			} else {
				setTimeout(() => setCurrentItem(currentItem + 1), 3000);
			}
		},
		[ currentItem, files.length ]
	);

	const toggleLike = async () => {
		toggleLikeMutation();
		if (isLikedState === true) {
			setIsLikedState(false);
			setLikeCountState(likeCountState - 1);
		} else {
			setIsLikedState(true);
			setLikeCountState(likeCountState + 1);
		}
	};

	// Enter key가 입력되는 이벤트 캐치를 위한 Function
	const onKeyPress = async (e) => {
		const { which } = e;
		if (which === 13 && comment.value.trim() !== '') {
			e.preventDefault();
			try {
				const { data: { addComment } } = await addCommentMutation();
				setSelfComments([ ...selfComments, addComment ]);
				comment.setValue('');
			} catch (error) {
				toast.error("You can't send comment.");
			}
		}
		return;
	};

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
			currentItem={currentItem}
			toggleLike={toggleLike}
			onKeyPress={onKeyPress}
			selfComments={selfComments}
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
