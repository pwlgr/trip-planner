import Link from 'next/link';

const Navbar = () => (
	<nav className="navbar">
		<Link href="/">
			<a className="navbar-brand">TripPlanner</a>
		</Link>
		<Link href="/new">
			<a className="create">Create trip</a>
		</Link>
	</nav>
);

export default Navbar;
