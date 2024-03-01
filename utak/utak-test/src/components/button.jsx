import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const buttonIcons = {
	trash: faTrash,
	pen: faPen,
};

const buttonClassNames = {
	danger: 'danger-btn',
	primary: 'primary-btn',
};

export function CreateBtn({ onClickHandler }) {
	return (
		<button onClick={onClickHandler} className="create-btn">
			<FontAwesomeIcon icon={faPlus} /> Create
		</button>
	);
}

CreateBtn.defaultProps = {
	onClick: () => alert('You were not passing createBtnHandler'),
};

export function MyButton({ onClick, type, icon, ml = 0, mr = 0 }) {
	return (
		<button
			onClick={onClick}
			className={buttonClassNames[type]}
			style={{ marginLeft: ml, marginRight: mr }}
		>
			<FontAwesomeIcon icon={buttonIcons[icon]} />
		</button>
	);
}

MyButton.defaultProps = {
	onClick: () => alert('You were not passing createBtnHandler'),
};
