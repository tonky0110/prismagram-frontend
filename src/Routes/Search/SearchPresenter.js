import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
	height: 50vh;
	text-align: center;
`;

const Section = styled.div`
	margin-bottom: 50px;
	display: grid;
	grid-gap: 25px;
	grid-template-columns: repeat(4, 160px);
	grid-template-rows: 160px;
	grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
	if (searchTerm === undefined) {
		return (
			<Wrapper>
				<FatText text={'Search for something.'} />
			</Wrapper>
		);
	} else if (loading === true) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		);
	} else if (data && data.searchUser && data.searchPost) {
		return (
			<Wrapper>
				<Section>
					{data.searchUser.length === 0 ? (
						<FatText text={'No User Found.'} />
					) : (
						data.searchUser.map((user) => {
							return (
								<UserCard
									key={user.id}
									username={user.username}
									isFollowing={user.isFollowing}
									url={user.avatar}
									isSelf={user.isSelf}
									id={user.id}
								/>
							);
						})
					)}
				</Section>
				<PostSection>
					{data.searchPost.length === 0 ? (
						<FatText text={'No Post Found.'} />
					) : (
						data.searchPost.map((post) => (
							<SquarePost
								key={post.id}
								id={post.id}
								file={post.files[0]}
								likeCount={post.likeCount}
								commentCount={post.commentCount}
							/>
						))
					)}
				</PostSection>
			</Wrapper>
		);
	}
};

SearchPresenter.propTypes = {
	searchTerm: PropTypes.string,
	loading: PropTypes.bool
};
export default SearchPresenter;
