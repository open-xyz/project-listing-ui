import React from 'react';

const ConfirmationDialog = (props) => {
	return (
		<div className='flex fixed inset-0 items-center justify-center h-screen w-screen bg-slate-500/40 z-[999] transition'>
			<div className='flex items-center justify-center rounded-xl bg-white p-12 lg:px-36 flex-col  shadow-md border-2 border-slate-300'>
				<h1 className='text-xl lg:text-3xl font-medium text-slate-800 '>
					Are you sure ?
				</h1>
				<h1 className='text-sm lg:text-base font-normal text-slate-600 mt-2'>
					This action is irreversible
				</h1>
				<div className='flex gap-3 mt-7  '>
					<button
						onClick={props.cancel}
						className='bg-slate-100 text-base border border-slate-300 rounded-lg text-slate-600 px-6 py-2 hover:bg-slate-800 hover:text-white'
					>
						Cancel
					</button>
					<button
						onClick={props.delete}
						className='bg-red-200text-base border border-red-500 rounded-lg text-red-500 px-6 py-3 hover:bg-red-500 hover:text-white'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationDialog;
