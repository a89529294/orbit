import React, { createContext, useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"

const FetchContext = createContext()
const { Provider } = FetchContext

const FetchProvider = ({ children }) => {
  const {
    authState: { token },
  } = useContext(AuthContext)

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  )
}

export { FetchContext, FetchProvider }
