import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HeartFull, CommentFull } from './Icons';

const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3 linear;
	svg {
		fill: white;
	}
`;
const Container = styled.div`
	background-image: url(${(props) => props.bg});
	background-size: cover;
	cursor: pointer;
	&:hover {
		${Overlay} {
			opacity: 1;
		}
	}
`;

const ELink = styled(Link)`
  color:inherit;
`;

const Number = styled.div`
	color: white;
	display: flex;
	align-items: center;
	&:first-child {
		margin-right: 30px;
	}
`;
const NumberText = styled.div`
	margin-left: 10px;
	font-size: 16px;
`;
const SquarePost = ({ id, file, likeCount, commentCount }) => (
	<Container bg={file.url}>
		<ELink to={`/${id}`}>
			<Overlay>
				<Number>
					<HeartFull />
					<NumberText>{likeCount}</NumberText>
				</Number>
				<Number>
					<CommentFull />
					<NumberText>{commentCount}</NumberText>
				</Number>
			</Overlay>
		</ELink>
	</Container>
);

SquarePost.propTypes = {
	id: PropTypes.string.isRequired,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	),
	likeCount: PropTypes.number.isRequired,
	commentCount: PropTypes.number.isRequired
};

export default SquarePost;
