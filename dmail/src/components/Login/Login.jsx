import React from 'react'
import logo from '../../DMail.png'
import { ethers } from 'ethers'
import '../Login/login.css'

const Login = ({ setLogin }) => {
  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.send('eth_requestAccounts', []).then(() => {
        setLogin(true)
      })
    } else {
      alert('Install a wallet for connecting an account !')
    }
  }
  return (
    <div id="intro">
      <img src={logo} width="40%" />
      <button onClick={connect} id="cnct">
        CONNECT TO ACCOUNT
      </button>
    </div>
  )
}

export default Login
