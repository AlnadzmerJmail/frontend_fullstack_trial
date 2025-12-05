'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Inputs } from '@/types/formTypes';

interface FormI {
	handleSubmit: (d: Inputs) => void;
}
function Form({ handleSubmit: handleFormSubmit }: FormI) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data);
	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-[400px] min-h-[700px] p-3 rounded-md bg-gray-200"
		>
			{/* register your input into the hook by invoking the "register" function */}
			<div className="flex flex-col mb-3">
				<label htmlFor="">Email or Mobile</label>
				<input
					defaultValue="test"
					{...register('email')}
					className="outline-none px-2 py-1 border rounded-sm"
				/>
			</div>

			{/* include validation with required or other standard HTML validation rules */}
			<div className="flex flex-col mb-3">
				<label htmlFor="">Password</label>
				<input
					{...register('password', { required: true })}
					className="outline-none px-2 py-1 border rounded-sm"
				/>
			</div>

			{/* errors will return when field validation fails  */}
			{errors.password && <span>This field is required</span>}

			<input type="submit" />
		</form>
	);
}

export default Form;
