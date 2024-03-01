import React, { useState, useEffect, useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useForm } from 'react-hook-form';
import ItemInput from './ItemInput';

import useFirebase from '../customs';

export default function ItemForm({
	defaultValues = {},
	toggleFormHandler,
	isFormVisible,
}) {
	const { fetchData, saveItem, updateItem } = useFirebase();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	const [categories, setCategories] = useState([]);
	const [variations, setVariations] = useState([]);

	useEffect(() => {
		(async function firebase() {
			const categories = await fetchData('categories');
			if (!categories.error) setCategories(categories.data);

			const variations = await fetchData('variations');
			if (!variations.error) setVariations(variations.data);
		})();
	}, []);

	const onSubmit = async (data) => {
		try {
			const { id } = defaultValues || {};
			const res = id ? await updateItem({ id, ...data }) : await saveItem(data);

			if (res.error) alert(res.error);
			else toggleFormHandler();
		} catch (error) {
			alert('Submit went error!');
		}
	};

	const itemFields = useMemo(() => {
		const required = true;
		const fields = [
			{
				field: 'name',
				label: 'Item Name',
				required,
			},
			{
				field: 'category',
				required,
				type: 'selection',
				selections: categories,
			},
			{
				field: 'variation',
				type: 'selection',
				selections: variations,
				required: false,
			},
			{
				field: 'price',
				required,
				type: 'number',
				someValidation: {
					validate: (value) =>
						value > 0 ? true : 'Price should be greater than 0',
				},
			},
			{
				field: 'cost',
				required,
				type: 'number',
				someValidation: {
					validate: (value) =>
						value <= 0
							? 'Cost should be greater than 0'
							: value < 100
							? 'Cost is minimum of 100'
							: true,
				},
			},
			{
				field: 'stock',
				required,
				type: 'number',
				someValidation: {
					validate: (value) =>
						value > 0 ? true : 'Stock should be more than 0',
				},
			},
		];

		return fields;
	}, [categories, variations]);

	return (
		<div className={`item__form--wrappper ${!isFormVisible ? 'closed' : ''}`}>
			<div className="item__form--header">
				<h3>Create Item</h3>
				<FontAwesomeIcon
					icon={faXmark}
					className="item__close-btn"
					onClick={toggleFormHandler}
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="item__form">
				{itemFields.map(
					({
						field,
						label,
						type,
						required,
						selections,
						someValidation = {},
					}) => (
						<ItemInput
							key={field}
							field={field}
							label={label}
							type={type || 'text'}
							selections={selections}
							control={control}
							register={{
								...register(field, {
									required: required ? `${label || field} is required` : false,
									...someValidation,
								}),
							}}
							error={errors[field]}
						/>
					)
				)}

				<div className="item__form--buttons">
					<button onClick={toggleFormHandler}>Cancel</button>
					<button type="submit" className="item__submit-btn">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
