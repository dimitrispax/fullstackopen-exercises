import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

/* Set token. */
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

//////////////////////
////////READ/////////
////////////////////
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


//////////////////////
///////CREATE////////
////////////////////
const create = async (newBlog) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}


//////////////////////
///////UPDATE////////
////////////////////
const update = async (updatedBlog, id) => {

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}


//////////////////////
///////DELETE////////
////////////////////
const remove = async (id) => {

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}




export default { getAll, create, update, remove, setToken }