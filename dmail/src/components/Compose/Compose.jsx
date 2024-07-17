import React, { useState } from 'react'
import '../Compose/Compose.css'
import { ethers } from 'ethers'
import { abi, deployedAddress } from '../../constants'

const Compose = ({ close }) => {
  const [to, setTo] = useState('')
  const [sub, setSub] = useState('')
  const [body, setbody] = useState('')
  const [att, setAtt] = useState('')

  async function send() {
    if (to !== '' && sub !== '' && body !== '') {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(deployedAddress, abi, signer)
      await contract
        .send(sub, body, att, to)
        .then(async (result) => {
          console.log(result)
          await close()
          alert('MAIL SENT')
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('all fields are mandatory except the attachment')
    }
  }

  return (
    <div id="composeBody">
      <div>
        <label>TO</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setTo(e.target.value)
          }}
        />
      </div>
      <div>
        <label>ENTER SUBJECT</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setSub(e.target.value)
          }}
        />
      </div>
      <div>
        <label>ENTER BODY</label>
        <br />
        <textarea
          type="text"
          onChange={(e) => {
            setbody(e.target.value)
          }}
        />
      </div>
      <div>
        <label>ATTACHMENT (if any)</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setAtt(e.target.value)
          }}
        />
      </div>
      <br />
      <button id="sendMailBtn" onClick={send}>
        SEND
      </button>
    </div>
  )
}

export default Compose
