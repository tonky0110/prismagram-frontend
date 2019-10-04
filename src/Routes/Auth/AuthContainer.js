import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
	const [ action, setAction ] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const secret = useInput('');
	const email = useInput('');
	const [ requestSecretMutation ] = useMutation(LOG_IN, {
		variables: { email: email.value }
	});

	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value
		}
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email.value !== '') {
				try {
					const { data: { requestSecret } } = await requestSecretMutation();
					if (!requestSecret) {
						toast.error("You don't have an account yet, create one.");
					} else {
						toast.success('Check your inbox for you login secret.');
						setAction('confirm');
					}
				} catch (error) {
					toast.error("Can't request secret, try again.");
				}
			} else {
				toast.error('Email is required.');
			}
		} else if (action === 'signUp') {
			if (username.value !== '' && firstName.value !== '' && lastName.value !== '' && email.value !== '') {
				try {
					const { data: { createAccount } } = await createAccountMutation();
					if (!createAccount) {
						toast.error("Can't create account.");
					} else {
						toast.success('Account created! Log In now.');
						setTimeout(() => setAction('logIn'), 3000);
					}
				} catch (error) {
					toast.error(error.message);
				}
			} else {
				toast.error('All filed are required.');
			}
		}
	};
	return (
		<AuthPresenter
			action={action}
			setAction={setAction}
			username={username}
			firstName={firstName}
			lastName={lastName}
			secret={secret}
			email={email}
			onSubmit={onSubmit}
		/>
	);
};
