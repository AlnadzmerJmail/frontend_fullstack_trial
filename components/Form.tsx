'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Inputs } from '@/types/formTypes';

interface FormI {
	isSignup?: boolean;
	formTitle?: string;
	handleSubmit: (d: Inputs) => void;
}
function Form({
	isSignup,
	formTitle = 'Registration',
	handleSubmit: handleFormSubmit,
}: FormI) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data);
	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<div className="w-[400px] p-3 rounded-md bg-gray-200">
			<p className="text-center pb-2 uppercase">{formTitle}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				{isSignup && (
					<div className="flex flex-col mb-3">
						<label htmlFor="">Username</label>
						<input
							defaultValue="ffff"
							{...register('userName', { required: true })}
							className="outline-none px-2 py-1 border rounded-sm"
						/>
					</div>
				)}
				{/* register your input into the hook by invoking the "register" function */}
				<div className="flex flex-col mb-3">
					<label htmlFor="">Email address</label>
					<input
						type="email"
						defaultValue="test@gmail.com"
						{...register('email')}
						className="outline-none px-2 py-1 border rounded-sm"
					/>
				</div>

				{/* include validation with required or other standard HTML validation rules */}
				<div className="flex flex-col mb-3">
					<label htmlFor="">Password</label>
					<input
						{...register('password', {
							required: true,
							minLength: {
								value: 8,
								message: 'Password must be minimum of 8 characters',
							},
							maxLength: {
								value: 16,
								message: 'Password must be maximum of 16 characters',
							},
						})}
						className="outline-none px-2 py-1 border rounded-sm"
					/>
				</div>

				{/* errors will return when field validation fails  */}
				{errors.password && (
					<span className="text-red-600">
						Error: {errors.password.message || 'Password is a required field'}
					</span>
				)}

				<div className="w-full cursor-pointer border rounded-md  text-center mt-5 bg-green-600 text-white">
					<input className="cursor-pointer w-full py-1" type="submit" />
				</div>
			</form>
		</div>
	);
}

export default Form;
