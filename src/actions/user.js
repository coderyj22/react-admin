import actionTypes from './actionTypes'
import { loginRequest } from '../network'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userInfo
  }
}

export const logout = () => {
  return dispatch => {
    // 实际的项目中要告诉服务端，用户已经退出
    dispatch(loginFailed())
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userInfo')

  return {
    type: actionTypes.LOGIN_FAILED
  }
}
export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin)
    loginRequest(userInfo)
      .then(resp => {
        if (resp.data.code === 200) {
          const { authToken, ...userInfo } = resp.data.data
          if (userInfo.remember) {
            window.localStorage.setItem('authToken', authToken)
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          } else {
            window.sessionStorage.setItem('authToken', authToken)
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
          dispatch(loginSuccess(resp.data.data))
        } else {
          dispatch(loginFailed())
        }
      })
  }
}
