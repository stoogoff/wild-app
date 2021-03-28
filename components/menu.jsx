
import { useRouter } from 'next/router'

export const MenuItem = ({ title, href, onClick, menuItems }) => {
	const router = useRouter()

	const handleClick = (e) => {
		e.preventDefault()

		if(onClick) {
			onClick()
		}

		window.setTimeout(() => router.push(href), 250)
	}

	const isActive = href !== '/' && router.asPath.startsWith(href) || href === '/' && router.asPath === '/'

	return <li>
		<a href={ href } onClick={ handleClick } className={ isActive ? 'active' : null }>{ title }</a>
		{ isActive && menuItems ? <ul>{ menuItems.map(item => <MenuItem key={ item.href } { ...item } onClick={ onClick } />) }</ul> : null }
	</li>
}

const Menu = ({ menuItems, onClick }) => (
	<ul>
		{ menuItems.map(item => <MenuItem key={ item.href } { ...item } onClick={ onClick } />) }
	</ul>
)

export default Menu
