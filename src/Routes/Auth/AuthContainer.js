import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';

export default () => {
	const [ action, setAction ] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastname = useInput('');
	const email = useInput('');
	const [ requestSecret ] = useMutation(LOG_IN, {
		variables: { email: email.value }
	});

	const onLogin = (e) => {
		console.log(e);
		if (email !== '') {
			requestSecret();
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
			onLogin={onLogin}
		/>
	);
};
