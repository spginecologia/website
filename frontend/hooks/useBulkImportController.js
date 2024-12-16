import { useEffect, useReducer } from 'react';

// Constants
const LOADED = 'LOADED';
const INIT = 'INIT';
const UPLOADING = 'UPLOADING';
const UPLOAD_ERROR = 'UPLOAD_ERROR';

const initialState = {
	allRows: [],
	currentlyUploadingRow: null,
	currentStatus: 'idle',
	isUploading: false,
	pendingRows: [],
	uploadedRows: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		//
		case 'load':
			return {
				...state,
				allRows: action.allRows,
				currentStatus: LOADED,
			};

			//
			//
			//

		case 'reset':
			return initialState;

		case 'set-upload-error':
			return { ...state, currentStatus: UPLOAD_ERROR, uploadError: action.error };

			//
			//
			//

		case 'upload-bulk-init':
			return {
				...state,
				currentStatus: INIT,
				pendingRows: action.pendingRows,
			};

			//
			//
			//

		case 'upload-done':
			return {
				...state,
				currentlyUploadingRow: null,
				pendingRows: state.pendingRows.slice(1),
				uploadedRows: [...state.uploadedRows, state.currentlyUploadingRow],
			};

			//
			//
			//

		case 'upload-next':
			return {
				...state,
				currentlyUploadingRow: action.nextRow,
				currentStatus: UPLOADING,
			};

			//
			//
			//

		case 'upload-single-init':
			return {
				...state,
				pendingRows: [...state.pendingRows, action.row],
			};

		default:
			return state;
    //
	}
};

const useBulkImportController = (dataUploader) => {
	//

	const [state, dispatch] = useReducer(reducer, initialState);

	//
	const onReceiveData = (parsedData) => {
		const parsedRows = parsedData.map((item, index) => {
			return { item: item, row_id: `row-${index}` };
		});
		dispatch({ allRows: parsedRows, type: 'load' });
	};

	//
	const onUploadBulkInit = (checkedRowsIndexes) => {
		const pendingRows = state.allRows.filter(row => checkedRowsIndexes.includes(row.row_id));
		dispatch({ pendingRows: pendingRows, type: 'upload-bulk-init' });
	};

	//
	const onUploadSingleInit = (row) => {
		dispatch({ row: row, type: 'upload-single-init' });
	};

	//
	const onReset = () => {
		dispatch({ type: 'reset' });
	};

	//
	// Sets the currentlyUploadingRow shape when it detects that its ready to go
	useEffect(() => {
		if (state.pendingRows.length && state.currentlyUploadingRow == null) {
			dispatch({ nextRow: state.pendingRows[0], type: 'upload-next' });
		}
	}, [state.currentlyUploadingRow, state.pendingRows]);

	//
	// Processes the next pendingRows thumbnail when ready
	useEffect(() => {
		async function fetchData() {
			if (state.pendingRows.length && state.currentlyUploadingRow) {
				try {
					await dataUploader(state.currentlyUploadingRow.item);
					dispatch({ type: 'upload-done' });
				}
				catch (error) {
					console.error(error);
					dispatch({ error, type: 'set-upload-error' });
				}
			}
		}
		fetchData();
	}, [dataUploader, state.currentlyUploadingRow, state.pendingRows]);
	useEffect(() => { /***/ }, [state.currentlyUploadingRow, state.pendingRows]);

	return {
		...state,
		onReceiveData,
		onReset,
		onUploadBulkInit,
		onUploadSingleInit,
	};
};

export default useBulkImportController;
