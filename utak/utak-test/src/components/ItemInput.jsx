import { Controller } from 'react-hook-form';
export default function ItemInput({
	field,
	label,
	type,
	control,
	selections = [],
	error,
	register,
}) {
	return (
		<div className="item__input--wrapper">
			<label htmlFor={field}>{label || field}</label>
			{type === 'selection' ? (
				<Controller
					render={({ field: selectField }) => (
						<select id={field} {...selectField}>
							<option value="">--SELECT--</option>
							{selections.map((selection) => (
								<option key={selection} value={selection}>
									{selection}
								</option>
							))}
						</select>
					)}
					control={control}
					name={field}
				/>
			) : (
				<input
					id={field}
					placeholder={`Enter ${label || field}`}
					type={type}
					{...register}
				/>
			)}
			{error && <small>{error.message}</small>}
		</div>
	);
}
