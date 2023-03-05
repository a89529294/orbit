import React, { createContext, useState } from "react"
import { useHistory } from "react-router"

const AuthContext = createContext()
const { Provider } = AuthContext

function fromLocalStorage(key, initialValue) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue
}
function toLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: fromLocalStorage("expiresAt", null),
    userInfo: fromLocalStorage("userInfo", {}),
  })
  const history = useHistory()

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    setAuthState({
      token,
      userInfo,
      expiresAt,
    })
    toLocalStorage("userInfo", userInfo)
    toLocalStorage("expiresAt", expiresAt)
  }

  const isAuthenticated = () => {
    if (!authState.expiresAt) return false
    return authState.expiresAt > new Date().getTime() / 1000
  }

  const isAdmin = () => {
    return authState.userInfo.role === "admin"
  }

  const logout = () => {
    setAuthState({ token: null, expiresAt: null, userInfo: {} })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("expiresAt")
    history.push("/login")
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: setAuthInfo,
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
