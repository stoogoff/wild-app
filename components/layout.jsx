
import { useState } from 'react'
import Head from 'next/head'
import Menu from '~/components/Menu'
import Debug from '~/components/Debug'

const Layout = ({ title, children }) => {
	const menuItems = [
		{ title: 'Home', href: '/' },
		{ title: 'Characters', href: '/characters' },
		{ title: 'Tarot', href: '/tarot', menuItems: [
			{ title: 'Passion', href: '/tarot/passion' },
			{ title: 'Strength', href: '/tarot/strength' },
			{ title: 'Control', href: '/tarot/control' },
			{ title: 'Focus', href: '/tarot/focus' },
			{ title: 'Major Arcana', href: '/tarot/major-arcana' },
		]},
	]
	const [sidebar, setSidebar] = useState(false)
	const closeSidebar = () => setSidebar(false)
	const openSidebar = () => setSidebar(true)

	return (
		<div className="h-screen">
			<Head>
				<title>WILD &ndash; { title }</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="sticky top-0 flex justify-between items-center p-2 pl-4 bg-gray-800">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<button onClick={ openSidebar } className="text-gray-500 focus:outline-none lg:hidden">
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<div className="font-bold tracking-wider text-lg text-white uppercase">WILD</div>
				</div>
			</header>
			<div className="flex h-screen font-roboto">
				<div onClick={ closeSidebar } className={ (sidebar ? 'block' : 'hidden') + " fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden" }></div>
				<div className={ (sidebar ? 'translate-x-0 ease-out' : '-translate-x-full ease-in') + " fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0" }>
					<div className="font-bold tracking-wider text-lg uppercase mt-3 mx-5 lg:hidden">WILD</div>
					<nav className="flex flex-col mt-10 px-4">
						<Menu menuItems={ menuItems } onClick={ closeSidebar } />
						<hr />
						<Menu menuItems={ [ { title: 'Account', href: '/account' } ] } onClick={ closeSidebar } />
					</nav>
				</div>
				<div className="flex-1 flex flex-col">
					<main className="flex-1">
						<div className="container mx-auto px-6 py-8">
							<h1>{ title }</h1>
							<div className="h-96">{ children }</div>
						</div>
					</main>
				</div>
			</div>
			<Debug />
		</div>
	)
}

export default Layout
