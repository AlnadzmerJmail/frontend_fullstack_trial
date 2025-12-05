'use client';
import React from 'react';
import Form from '@/components/Form';
import { Inputs } from '@/types/formTypes';

function Login() {
	const handleSubmit = (data: Inputs) => {
		console.log(data);
	};
	return (
		<div className="border min-h-screen flex justify-center">
			<Form handleSubmit={handleSubmit} />
		</div>
	);
}

export default Login;
