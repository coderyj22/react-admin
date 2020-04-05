import React from 'react'
import Loadable from 'react-loadable'

let loadingCpn = () => {
  return (
    <div>
      <p>正在玩儿命加载...</p>
    </div>
  )
}

export default (loader, loading = loadingCpn) => {
  return Loadable({
    loader,
    loading
  })
}


