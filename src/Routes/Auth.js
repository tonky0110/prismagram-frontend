import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Wrapper = styled.div`
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

const StateChnager = styled(Box)`
  text-align: center;
	padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
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

export default () => {
	const [ action, setAction ] = useState('logIn');
	// action === 'logIn' ? 'Log In' : 'Sign Up'
	return (
		<Wrapper>
      <Form>
        {action === 'logIn' ? (
          <form>
            <Input placeholder={"Username"}/>
            <Input placeholder={"Password"}/>
            <Button text={"Log in"}/>
          </form>
        ) : (
          <form>
            <Input placeholder={"First name"}/>
            <Input placeholder={"Last name"}/>
            <Input placeholder={"Email"}/>
            <Input placeholder={"Username"}/>
            <Input placeholder={"Password"}/>
            <Button text={"Sign up"}/>
          </form>
        )}
      </Form>
      <StateChnager>
        {action === 'logIn' ? (
          <>
            Don't have an account? {" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account? {" "}
            <Link onClick={() => setAction("logIn")}>Log In</Link>
          </>
        )}
      </StateChnager>
		</Wrapper>
	);
};
