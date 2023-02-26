export const createRandomId = () => {
  const date = new Date()
  const month = date.getMonth() + 1
  const year = date.getFullYear().toString().substr(2, 2)
  const randomId = year + month + date.getMinutes() + date.getSeconds()

  return Number(randomId)
}
