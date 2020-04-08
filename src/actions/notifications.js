import actionTypes from './actionTypes'
import { getNotifications } from '../network'

const startPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST
  }
}

const finishPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST
  }
}


export const markNotificationAsReadyById = (id) => {
  return dispatch => {

    dispatch(startPost())

    // 这里模拟了服务端的请求
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ,
        payload: {
          id
        }
      })
      dispatch(finishPost())

    }, 1000)

  }
}


export const markAllNotificationsAsRead = () => {
  return dispatch => {
    dispatch(startPost())
    // 这里模拟了服务端的请求
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
      })
      dispatch(finishPost())

    }, 1000)

  }
}

export const getNotificationList = () => {
  return dispatch => {
    dispatch(startPost())
    // 这里模拟了服务端的请求
    getNotifications().then(res => {
      dispatch({
        type: actionTypes.RECEIVE_NOTIFICATIONS,
        payload: {
          list: res.list
        }
      })
      dispatch(finishPost())
    })
  }
}
