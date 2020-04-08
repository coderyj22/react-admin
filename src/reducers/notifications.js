import actionTypes from '../actions/actionTypes'

const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: '111Let me tell you about Tyler',
      desc: '111The relationships that I have had with these special kids have been gifts in my life. They have taught me so many things, but I have especially learned that great courage can be found in the smallest of packages',
      hasRead: false
    },
    {
      id: 2,
      title: '222Let me tell you about Tyler',
      desc: '222The relationships that I have had with these special kids have been gifts in my life. They have taught me so many things, but I have especially learned that great courage can be found in the smallest of packages',
      hasRead: false
    }]
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return { ...state, list: newList }
    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    case actionTypes.RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}
