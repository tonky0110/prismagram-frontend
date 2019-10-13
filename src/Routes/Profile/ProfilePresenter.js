import React from 'react';
import styled from 'styled-components';
import Avatar from '../../Components/Avatar';
import Loader from '../../Components/Loader';

const Wrapper = styled.div`min-height: 60vh;`;
const Header = styled.div``;
const HeaderColumn = styled.div``;
const ProfilePresenter = ({
	loading,
	data: {
		seeUser: {
			id,
			avatar,
			username,
			fullName,
			isFollowing,
			isSelf,
			bio,
			followingCount,
			followersCount,
			postsCount,
			posts = []
		} = {}
	} = {}
}) => {
	console.log(`
    id: ${id}, 
    avatar: ${avatar}, 
    username: ${username}, 
    fullName: ${fullName}, 
    isFollowing: ${isFollowing}, 
    isSelf: ${isSelf}, 
    bio: ${bio}, 
    followingCount: ${followingCount}, 
    followersCount: ${followersCount}, 
    postsCount: ${postsCount}, 
    posts: ${posts}, 
  `);
	if (loading) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		);
	} else {
		return (
			<Header>
				<HeaderColumn>
					<Avatar url={avatar} size="lg" />
				</HeaderColumn>
			</Header>
		);
	}
};

export default ProfilePresenter;
