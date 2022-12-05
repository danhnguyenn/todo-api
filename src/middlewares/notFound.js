const notFound = (req, res, next) =>
	res.status(404).json({
		messgage: 'There was an error, route does not match!'
	})

export default notFound
