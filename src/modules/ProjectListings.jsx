import { useEffect, useState } from 'react';
import ProjectList from '../components/ProjectList';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FilterButton } from '../components/navbar/FilterButton';
import loading from '/SVG/loading.svg';
import Search from '../components/navbar/Search';

const filters = [
	{
		label: 'featured',
		property: '#featured',
	},
	{
		label: 'Newest first',
		property: '#newest_first',
	},
	{
		label: 'Sort A-Z',
		property: '#sort_asc',
	},
	{
		label: 'Sort Z-A',
		property: '#sort_dsc',
	},
	{
		label: 'Open to work',
		property: '#open_for_development',
	},
];

const ProjectListings = () => {
	// const [isOpen, setIsOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [searchInput, setSearchInput] = useState({ searchString: "" })
	const authToken = localStorage.getItem("authToken");

	useEffect(() => {
		const fetchProjects = async () => {
			const searchTitle = `?title=${searchInput.searchString}`
			const response = await fetch(
				`https://projekto-backend.onrender.com/projects${searchTitle}`,
				{ mode: 'cors' }
			);
			const fetchedProjects = await response.json();
			setProjects(fetchedProjects.data);
			// console.log('fetch Projects------------', fetchedProjects.data);
			// console.log('fetch Projects------------', projects);
		};
		fetchProjects();
	}, [searchInput]);

	const orgToken = localStorage.getItem('isOrg');

	return (
		<div className='flex flex-col justify-center w-full'>
			{/*------------- Background Gradient ------------ */}
			<div className='gradient z-0'></div>

			{/*------------- Headings ------------ */}

			<div className='gap-0 z-[1] mt-5'>
				<h1
					className=' text-gray-900 text-center text-3xl md:text-4xl
				 font-semibold'
				>
					Find your dream projects
				</h1>
				<h1
					className=' blue-gradient text-center text-3xl md:text-4xl
				 font-semibold'
				>
					Complete Trust & Freedom
				</h1>

				{/* ----------------Show Only for Organizations------------ */}
				{orgToken && (
					<div className='flex my-8 items-center justify-center gap-10 z-[1]'>
						<div className='flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center'>
							<a
								href='/projects/create'
								className='flex p-3 md:p-4 items-center justify-center'
							>
								Add Project <RiArrowRightSLine className='ml-2 text-md' />
							</a>
						</div>
					</div>
				)}
			</div>

			<div className='flex justify-center my-6 relative mx-3'>
				<div
					className='flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start
				 border z-10 border-slate-300  bg-white/50 rounded-2xl py-5'
				>
					<h1 className='text-2xl text-start font-medium text-slate-800 px-5'>
						Projects open for development
					</h1>
					<div className='flex mt-6 w-full justify-between border-b '>
						<div className='tabs gap-4 pl-6'>
							<a className='tab tab-bordered tab-active'>Best Matches</a>
							<a className='tab'>Saved Jobs</a>
						</div>

						{/*--------sort button--------- */}
						<FilterButton
							filters={filters}
							projects={projects}
							setProjects={setProjects}
						/>

						{/*--------sort button END--------- */}
					</div>

					<p className='mx-5 my-2 text-base'>
						Browse projects that match your experience to a client's hiring
						preferences. Ordered by most relevant.
					</p>
					<div className='flex w-full px-4 py-2'>
						<Search searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceholder="Type project title to search.." />
						{/* <Search /> */}
					</div>

					{projects.length === 0 ? (
						<h1>No Projects Found.</h1>
					) : null}
					{projects.length > 0 ? (
						<ProjectList projects_prop={projects} />
					) : (
						<div className='flex w-full py-10 justify-center text-slate-500'>
							<img src={loading} />
						</div>
					)}
					{!authToken ? (
						<h1 className=' blue-gradient text-center text-3xl md:text-4xl font-semibold ml-5'>Please login to see more...</h1>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ProjectListings;
