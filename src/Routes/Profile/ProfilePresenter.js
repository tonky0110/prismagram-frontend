import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Avatar from '../../Components/Avatar';
import Loader from '../../Components/Loader';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`min-height: 70vh;`;
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 80%;
	margin: 0 auto;
	margin-bottom: 40px;
`;
const HeaderColumn = styled.div``;
const UsernameRow = styled.div`
	display: flex;
	align-items: center;
`;
const Username = styled.span`
	font-size: 26px;
	display: block;
`;
const Counts = styled.ul`
	display: flex;
	margin: 15px 0;
`;
const Count = styled.li`
	font-size: 16px;
	&:not(:last-child) {
		margin-right: 10px;
	}
`;
const FullName = styled(FatText)`
  font-size:16px;
`;
const Bio = styled.p`margin: 10px 0;`;
const Posts = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`;
const ProfilePresenter = ({ loading, data }) => {
	if (loading) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		);
	} else if (!loading && data && data.seeUser) {
		const {
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
		} = data;
		return (
			<Wrapper>
				<Helmet>
					<title>{`${username} | prismagram`}</title>
				</Helmet>
				<Header>
					<HeaderColumn>
						<Avatar url={avatar} size="lg" />
					</HeaderColumn>
					<HeaderColumn>
						<Counts>
							<Count>
								<FatText text={String(postsCount)} /> posts
							</Count>
							<Count>
								<FatText text={String(followersCount)} /> followers
							</Count>
							<Count>
								<FatText text={String(followingCount)} /> following
							</Count>
						</Counts>
						<UsernameRow>
							<Username>{username} </Username>
							{!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
						</UsernameRow>
						<FullName text={fullName} />
						<Bio>{bio}</Bio>
					</HeaderColumn>
				</Header>
				<Posts>
					{posts &&
						posts.map((post) => (
							<SquarePost
								key={post.id}
								id={post.id}
								likeCount={post.likeCount}
								commentCount={post.commentCount}
								file={post.files[0]}
							/>
						))}
				</Posts>
			</Wrapper>
		);
	}
};

export default ProfilePresenter;
