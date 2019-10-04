import React from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { Wrapper, StateChnager, Link, Form } from "./AuthStyled";


export default ({
  action,
  setAction,
  username,
  firstName,
  lastname,
  email,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === 'logIn' ? (
        <form onSubmit={onSubmit}>
          <Input placeholder={"Email"} {...email} type="email" />
          <Button text={"Log in"}/>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <Input placeholder={"First name"} {...firstName} type="text" />
          <Input placeholder={"Last name"} {...lastname} type="text" />
          <Input placeholder={"Email"} {...email} type="email" />
          <Input placeholder={"Username"} {...username} type="text" />
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