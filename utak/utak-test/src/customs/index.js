import {
	getDatabase,
	ref,
	set,
	push,
	get,
	onValue,
	remove,
} from 'firebase/database';
import firebaseConfig from '../../fireBaseConfig';

function useFirebase() {
	const db = getDatabase(firebaseConfig);

	const err = 'Fetch data went error!';

	const fetchData = async (path) => {
		try {
			const dbRef = ref(db, path);
			// read data once
			const snapshot = await get(dbRef);

			if (snapshot.exists) return { data: snapshot.val() };
			else return { data: [] };
		} catch (error) {
			return { error: err };
		}
	};

	const fetchItems = async (path, cb) => {
		try {
			const dbRef = ref(db, path);

			onValue(dbRef, (snapshot) => {
				let items = [];
				if (snapshot.exists()) {
					const data = snapshot.val();

					// adding id to each item
					items = Object.entries(data).map(([id, item]) => ({
						id,
						...item,
					}));
				}
				cb({ data: items });
			});
		} catch (error) {
			return { error: err };
		}
	};

	const saveItem = async (data = {}) => {
		try {
			const newDocRef = push(ref(db, 'items'));

			// does not return data
			await set(newDocRef, { ...data });

			return {};
		} catch (error) {
			return { error: 'Saving item went error!' };
		}
	};

	const updateItem = async ({ id, ...rest }) => {
		try {
			const itemRef = ref(db, `items/${id}`);

			// no return value
			await set(itemRef, { ...rest });
			return {};
		} catch (error) {
			return { error: 'Update item went error!' };
		}
	};

	const deleteItem = async (id) => {
		try {
			const itemRef = ref(db, `items/${id}`);

			// no return value
			await remove(itemRef);
			return {};
		} catch (error) {
			return { error: 'Delete item went error!' };
		}
	};

	return { fetchData, fetchItems, saveItem, updateItem, deleteItem };
}
export default useFirebase;
