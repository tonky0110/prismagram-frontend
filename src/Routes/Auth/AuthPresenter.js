import React from 'react';
import {Helmet} from 'rl-react-helmet';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { Wrapper, StateChnager, Link, Form } from "./AuthStyled";


export default ({
  action,
  setAction,
  username,
  firstName,
  lastName,
  secret,
  email,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === 'logIn' && (
        <>
          <Helmet>
            <title>Log in | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Log in"}/>
          </form>
        </>
      )}
      {action === 'signUp' && (
        <>
          <Helmet>
            <title>Sign up | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"First name"} {...firstName} type="text" />
            <Input placeholder={"Last name"} {...lastName} type="text" />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} type="text" />
            <Button text={"Sign up"}/>
          </form>
        </>
      )}
      {action === 'confirm' && (
        <>
          <Helmet>
            <title>Confirm secret | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Paste your secret"} required {...secret} type="text" />
            <Button text={"Confirm"}/>
          </form> 
        </>
      )}
    </Form>
    {action !== 'confirm' && (
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
    )}
  </Wrapper>
);