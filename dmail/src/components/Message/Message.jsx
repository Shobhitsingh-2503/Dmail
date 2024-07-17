import React from 'react'
import '../Message/Message.css'
import { MdDeleteForever } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'

const Message = ({
  fromTo,
  sub,
  body,
  adrs,
  url,
  index,
  delt,
  isImp,
  markImp,
}) => {
  function download() {
    const element = document.createElement('a')
    const file = new Blob(
      [
        `Subject - ${sub} 
        ${fromTo} - ${adrs}
        Message - ${body} 
        attachment - ${url}`,
      ],
      {
        type: 'text/plain;charset=utf-8',
      },
    )
    element.href = URL.createObjectURL(file)
    element.download = `DMail ${fromTo}-${adrs}.txt`
    document.body.appendChild(element)
    element.click()
  }

  if (isImp && document.getElementById('imp'))
    document.getElementById('imp').style.color = 'blue'

  return (
    <div id="content">
      <h4>
        <span id="imp" onClick={() => markImp(index)}>
          <FaStar />
        </span>
        <span className="light">SUB:-</span>
        {sub}
      </h4>
      <span>
        <i>{fromTo}</i>
      </span>
      <span id="adrs">{adrs}</span>
      <button onClick={download} className="link">
        view message &#x2197;
      </button>
      <span id="del" onClick={() => delt(index)}>
        <MdDeleteForever />
      </span>
    </div>
  )
}
export default Message
