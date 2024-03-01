import React, { useState, useRef } from 'react';

import Table from '../components/Table';
import ItemForm from '../components/ItemForm';

export default function Items() {
	const formMountRef = useRef(null);
	const formVisibleRef = useRef(null);

	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isFormMounted, setIsFormMounted] = useState(false);

	const [updateData, setUpdateData] = useState(null);

	const toggleFormHandler = () => {
		// Clear the previous timeout, if any
		clearTimeout(formMountRef.current);
		clearTimeout(formVisibleRef.current);

		// long wait when is is about to unMount the form
		const delay = isFormMounted ? 800 : 100;

		formMountRef.current = setTimeout(() => {
			setIsFormMounted(!isFormMounted);
		}, delay);

		formVisibleRef.current = setTimeout(() => {
			setIsFormVisible(!isFormVisible);
		}, 300);

		if (updateData) setUpdateData(null);
	};
	return (
		<div>
			<Table
				toggleFormHandler={toggleFormHandler}
				setUpdateData={setUpdateData}
			/>
			{isFormMounted && (
				<ItemForm
					defaultValues={updateData}
					toggleFormHandler={toggleFormHandler}
					isFormVisible={isFormVisible}
				/>
			)}
		</div>
	);
}
