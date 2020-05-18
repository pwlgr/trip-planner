import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Trip = ({ trip }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteTrip();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteTrip = async () => {
        const tripId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/trips/${tripId}`, {
                method: "DELETE"
            });

            router.push("/");
        } catch (error) {
            throw new Error;
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="trips-container">
        {isDeleting
            ? <Loader active />
            :
            <>
                <h1>{trip.title}</h1>
                <p>{trip.description}</p>
                <Button color='red' onClick={open}>Delete</Button>
            </>
        }
        <Confirm
            open={confirm}
            onCancel={close}
            onConfirm={handleDelete}
        />
    </div>
    )
}

Trip.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/trips/${id}`);
    const { data } = await res.json();

    return { trip: data }
}

export default Trip;