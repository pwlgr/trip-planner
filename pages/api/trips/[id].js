import dbConnect from '../../../utils/dbConnect';
import { Trip } from '../../../models/Trip';

dbConnect();

export default async (req, res) => {
	const { query: { id }, method } = req;

	switch (method) {
		case 'GET':
			try {
				const trip = await Trip.findById(id);

				if (!trip) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: trip });
			} catch (err) {
				return res.status(400).json({ success: false });
			}
			break;
		case 'PUT':
			try {
				const trip = await Trip.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				});

				if (!trip) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: trip });
			} catch (err) {
				return res.status(400).json({ success: false });
			}
			break;
		case 'DELETE':
			try {
				const deletedTrip = await Trip.deleteOne({ _id: id });

				if (!deletedTrip) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: {} });
			} catch (err) {
				return res.status(400).json({ success: false });
			}
			break;
		default:
			return res.status(400).json({ success: false });
			break;
	}
};
