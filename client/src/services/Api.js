import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: `http://localhost:8001/api.php`
    baseURL: `https://fuegoazuladmin.000webhostapp.com/api.php/`
  })
}
