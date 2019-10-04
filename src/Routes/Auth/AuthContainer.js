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
	const [ requestSecretMutation ] = useMutation(LOG_IN, {
		variables: { email: email.value }
	});

	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastname: lastname.value,
			email: email.value
		}
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (action === 'logIn') {
			if (email.value !== '') {
				try {
					const { data: { requestSecret } } = await requestSecretMutation();
					console.log('requestSecret: ', requestSecret);
					if (!requestSecret) {
						toast.error("You don't have an account yet, create one.");
					}
				} catch (error) {
					toast.error("Can't request secret, try again.");
				}
			} else {
				toast.error('Email is required.');
			}
		} else if (action === 'signUp') {
			if (username.value !== '' && firstName.value !== '' && lastname.value !== '' && email.value !== '') {
				try {
					const { data: { createAccount } } = await createAccountMutation();
					console.log('createAccount: ', createAccount);

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
			lastname={lastname}
			email={email}
			onSubmit={onSubmit}
		/>
	);
};
