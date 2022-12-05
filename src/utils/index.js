const isDevelopment = process.env.NODE_ENV === 'development'

const randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export { isDevelopment, randomIntInRange }
