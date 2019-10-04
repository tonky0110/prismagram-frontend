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
	const lastname = useInput('');
	const email = useInput('');
	const [ requestSecret ] = useMutation(LOG_IN, {
		update: (_, { data }) => {
			const { requestSecret } = data;
			if (!requestSecret) {
				toast.error("You don't have an account yet, create one.");
				setTimeout(() => setAction('signUp'), 3000);
			}
		},
		variables: { email: email.value }
	});

	const [ createAccount ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastname: lastname.value,
			email: email.value
		}
	});
	const onSubmit = (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email.value !== '') {
				requestSecret();
			} else {
				toast.error('Email is required.');
			}
		} else if (action === 'signUp') {
			if (username.value !== '' && firstName.value !== '' && lastname.value !== '' && email.value !== '') {
				createAccount();
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
			lastname={lastname}
			email={email}
			onSubmit={onSubmit}
		/>
	);
};
