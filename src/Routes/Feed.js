import React from 'react';
import styled from 'styled-components';
import {} from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { HeartEmpty } from '../Components/Icons';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
	{
		seeFeed {
			id
			location
			caption
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			likeCount
			isLiked
			comments {
				id
				text
				user {
					id
					username
				}
			}
			createdAt
		}
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 80vh;
`;

export default () => {
	const { data, loading } = useQuery(FEED_QUERY);
	console.log(data, loading);
	return (
		<Wrapper>
			{loading && <Loader />}
			{!loading &&
				data &&
				data.seeFeed &&
				data.seeFeed.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						location={post.location}
						caption={post.caption}
						user={post.user}
						files={post.files}
						likeCount={post.LikeCount}
						isLiked={post.isLiked}
						comments={post.comments}
						createdAt={post.createdAt}
					/>
				))}
		</Wrapper>
	);
};
