import { useRef, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Login from "./components/Login/Login";
import logo from "./DMail.png";
import Message from "./components/Message/Message";
import Compose from "./components/Compose/Compose";
import { abi, deployedAddress } from "./constants";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function App() {
  var [list, setList] = useState([]);
  const [fromTo, setFromTo] = useState("from");
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const ref = useRef();
  const close = () => {
    ref.current.close();
  };

  useState(async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await signer.getAddress().then((res) => {
        setUser(res);
        setLogin(true);
      });
      const contract = new ethers.Contract(deployedAddress, abi, signer);
      await contract
        .getInbox(signer)
        .then(async (result) => {
          setList(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Install a wallet for connecting an account !");
    }
  });

  async function showSentMails() {
    if (
      document.getElementById("sendBtn") &&
      document.getElementById("inboxBtn") &&
      document.getElementById("impBtn")
    ) {
      document.getElementById("sendBtn").style.color = "red";
      document.getElementById("impBtn").style.color = "black";
      document.getElementById("inboxBtn").style.color = "black";
      document.getElementById("sendBtn").style.fontWeight = "bold";
      document.getElementById("impBtn").style.fontWeight = "lighter";
      document.getElementById("inboxBtn").style.fontWeight = "lighter";
      document.getElementById("sendBtn").style.background = "black";
      document.getElementById("impBtn").style.background = "white";
      document.getElementById("inboxBtn").style.background = "white";
    }
    setFromTo("to");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(deployedAddress, abi, signer);
    await contract
      .getSent(signer)
      .then(async (result) => {
        setList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function showInboxMails() {
    if (
      document.getElementById("sendBtn") &&
      document.getElementById("inboxBtn") &&
      document.getElementById("impBtn")
    ) {
      document.getElementById("sendBtn").style.color = "black";
      document.getElementById("impBtn").style.color = "black";
      document.getElementById("inboxBtn").style.color = "red";
      document.getElementById("sendBtn").style.fontWeight = "lighter";
      document.getElementById("impBtn").style.fontWeight = "lighter";
      document.getElementById("inboxBtn").style.fontWeight = "bold";
      document.getElementById("sendBtn").style.background = "white";
      document.getElementById("impBtn").style.background = "white";
      document.getElementById("inboxBtn").style.background = "black";
    }
    setFromTo("from");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(deployedAddress, abi, signer);
    await contract
      .getInbox(signer)
      .then(async (result) => {
        setList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function showImpMails() {
    if (
      document.getElementById("sendBtn") &&
      document.getElementById("inboxBtn") &&
      document.getElementById("impBtn")
    ) {
      document.getElementById("sendBtn").style.color = "black";
      document.getElementById("impBtn").style.color = "red";
      document.getElementById("inboxBtn").style.color = "black";
      document.getElementById("sendBtn").style.fontWeight = "lighter";
      document.getElementById("impBtn").style.fontWeight = "bold";
      document.getElementById("inboxBtn").style.fontWeight = "lighter";
      document.getElementById("sendBtn").style.background = "white";
      document.getElementById("impBtn").style.background = "black";
      document.getElementById("inboxBtn").style.background = "white";
    }
    setFromTo("recievedFrom");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(deployedAddress, abi, signer);
    await contract
      .getImportant(signer)
      .then(async (result) => {
        setList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function delt(index) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(deployedAddress, abi, signer);
    // console.log(`delete function started ${fromTo} with ${int}`);
    await contract
      .deleteMail(signer.getAddress(), index, fromTo)
      .then(async () => {
        if (fromTo === "to") {
          await contract.getSent(signer).then((res) => {
            setList(res);
          });
        }
        if (fromTo === "from") {
          await contract.getInbox(signer).then((res) => {
            setList(res);
          });
        }
        if (fromTo === "recievedFrom") {
          await contract.getImportant(signer).then((res) => {
            setList(res);
          });
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  async function markImp(key) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(deployedAddress, abi, signer);
    await contract
      .markImp(signer, key, fromTo)
      .then(async () => {
        await contract.getInbox(signer).then((res) => {
          setList(res);
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  if (!login) {
    return (
      <>
        <Login setLogin={setLogin} />
      </>
    );
  } else {
    return (
      <div>
        <div id="nav">
          <img src={logo} width="7%" />

          <div id="account">{user}</div>
        </div>
        <div id="main">
          <div id="left-side">
            <Popup
              ref={ref}
              trigger={<button className="compose">COMPOSE</button>}
              position="right top"
            >
              <div>
                <Compose close={close} />
              </div>
            </Popup>
            <button
              className="listItems"
              align="center"
              onClick={showInboxMails}
              id="inboxBtn"
            >
              INBOX
            </button>
            <button
              className="listItems"
              align="center"
              onClick={showSentMails}
              id="sendBtn"
            >
              SENT
            </button>
            <button
              className="listItems"
              align="center"
              onClick={showImpMails}
              id="impBtn"
            >
              IMPORTANT
            </button>
          </div>
          <div id="right-side">
            {list.map((items, index) => {
              return (
                <Message
                  index={index}
                  markImp={markImp}
                  delt={delt}
                  fromTo={fromTo}
                  sub={items.subject}
                  body={items.body}
                  url={items.attachment}
                  adrs={items.from}
                  isImp={items.imp}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
