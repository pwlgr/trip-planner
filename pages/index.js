import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ trips }) => {
	return (
		<div className="trips-container">
			<h1>Your trips</h1>
			<div className="grid wrapper">
				{trips.map((trip) => {
					return (
						<div key={trip._id}>
							<Card>
								<Card.Content>
									<Card.Header>
										<Link href={`/${trip._id}`}>
											<a>{trip.title}</a>
										</Link>
									</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Button.Group>
										<Link href={`/${trip._id}`}>
											<Button color="olive">View</Button>
										</Link>
										<Button.Or text="or" />
										<Link href={`/${trip._id}/edit`}>
											<Button color="teal">Edit</Button>
										</Link>
									</Button.Group>
								</Card.Content>
							</Card>
						</div>
					);
				})}
			</div>
		</div>
	);
};

Index.getInitialProps = async () => {
	const res = await fetch('http://localhost:3000/api/trips');
	const { data } = await res.json();

	return { trips: data };
};

export default Index;
