import React from 'react';

import CreateBtn from './CreateBtn';

export default function TableNav({ title, createBtnHandler }) {
	return (
		<header>
			<h1>{title}</h1>
			<CreateBtn onClick={createBtnHandler} />
		</header>
	);
}
