import colors from 'colors'
import morgan from 'morgan'

const logger = morgan((tokens, req, res) => {
	let http = 'HTTP Request:'
	let method = tokens.method(req, res)
	let status = tokens.status(req, res)
	let url = tokens.url(req, res)

	url = colors.blue(url)
	http = colors.yellow(http)

	switch (method) {
		case 'GET':
			method = colors.cyan(method)
			break
		case 'POST':
			method = colors.green(method)
			break
		case 'PUT':
			method = colors.yellow(method)
			break
		case 'PATCH':
			method = colors.yellow(method)
			break
		case 'DELETE':
			method = colors.red(method)
			break
	}

	if (status >= 200 && status < 300) {
		status = colors.green(status)
	} else if (status >= 300 && status < 400) {
		status = colors.cyan(status)
	} else if (status >= 400 && status < 500) {
		status = colors.yellow(status)
	} else if (status === 500) {
		status = colors.red(status)
	}

	return [http, method, status, url].join(' ')
})

export default logger
