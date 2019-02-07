export const handleUserNotAuth = () => Promise.reject('You are not authenticated')

export const handleError = ({ message }) => Promise.reject(message)