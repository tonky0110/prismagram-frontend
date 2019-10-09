import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FatText from '../../Components/Footer';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';

const Wrapper = styled.div`
	height: 50vh;
	text-align: center;
`;

const Section = styled.div``;

const SearchPresenter = ({ searchTerm, loading, data }) => {
	console.log('data: ', data);
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
							console.log('user: ', user);
							return (
								<UserCard
									username={user.username}
									isFollowing={user.isFollowing}
									url={user.avatar}
									isSelf={user.isSelf}
								/>
							);
						})
					)}
				</Section>
				<Section>
					{data.searchPost.length === 0 ? (
						<FatText text={'No Post Found.'} />
					) : (
						data.searchPost.map((post) => null)
					)}
				</Section>
			</Wrapper>
		);
	}
};

SearchPresenter.propTypes = {
	searchTerm: PropTypes.string,
	loading: PropTypes.bool
};
export default SearchPresenter;
