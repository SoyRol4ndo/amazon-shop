import axios from 'axios'

export const dummyjson = axios.create({
  baseURL: process.env.BASE_URL ?? 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
