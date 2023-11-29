export const checkError = (error: unknown) => {
  if (error instanceof Object && 'data' in error && typeof error.data === 'string') {
    return error.data
  } else {
    return ''
  }
}
