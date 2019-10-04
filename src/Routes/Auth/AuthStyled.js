import styled from 'styled-components';

export const Wrapper = styled.div`
	min-height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Box = styled.div`
	${(props) => props.theme.whiteBox};
	border-radius: 0px;
	width: 100%;
	max-width: 350px;
`;

export const StateChnager = styled(Box)`
  text-align: center;
	padding: 20px 0px;
`;

export const Link = styled.span`
	color: ${(props) => props.theme.blueColor};
	cursor: pointer;
`;

export const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(last-child){
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
