'use client'
import Image from "next/image";
import styles from "./page.module.css";
import joker from "@/public/joker.jpg"
import makoto from "@/public/makoto.jpg"
import OptionSelect from "@/components/OptionSelect";
import { Arsenal } from 'next/font/google'
import ChatBox from "../components/ChatBox";
import NameTag from "../components/NameTag";
import { useState, useEffect } from 'react'

const arsenal = Arsenal({ weight: "400", subsets: ['latin'] })

const doNothing = () => {
  return;
}


const Personas = [
  {
    name: "Ren Amamiya",
    image: joker,
  },
  {
    name: "Makoto Nijima",
    image: makoto,
  }
]



export default function Home() {
  const [currentChat, setCurrentChat] = useState(null);
  const [droppedDown, setDroppedDown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // const [chatAnimation, setChatAnimation] = useState("translateY(3vh)");
  const [chatAnimation, setChatAnimation] = useState("translateY(40vh)");
  const [options, setOptions] = useState("translateX(-100vw)");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [opacity, setOpacity] = useState(1);
  const [z, setZ] = useState(0);
  const [currentPic, setCurrentPic] = useState("translateX(30vw)");

  useEffect(() => {
    console.log(chatAnimation);
    if (currentUser) {
      setDroppedDown(true);
      setChatAnimation("translateY(3vh)");
      setOptions("translateX(0vw)")
      setBackgroundColor("rgba(0,0,0,.7)");
      setOpacity(0);
      setZ(-10);
      setCurrentPic("translateX(0)")

    }
  }, [currentUser]);

  useEffect(()=>{
    console.log(currentChat);
  },[currentChat])


  const closeDropDown = () => {
    setChatAnimation("translateY(40vh)");
    setOptions("translateX(-100vw)")
    setDroppedDown(null);
    setCurrentUser(null);
    setCurrentChat(null);
    setBackgroundColor("transparent");
    setOptions("translateX(-100vw)")
    setOpacity(1);
    setZ(0);
    setCurrentPic("translate(30vw)")
  }

  const fakeDropdownData = [
    {
      message: "Sounds good!",
      onClick: doNothing,
      description: "This is the description for sounds good."
    },
    {
      message: "kekekekkeke",
      onClick: doNothing,
      description: "This is the description for kekekekkeke."
    },
    {
      message: "owo",
      onClick: doNothing,
      description: "This is the description for owo."
    },
    {
      message: "OMO",
      onClick: doNothing,
      description: "This is the description for OMO."
    },
    {
      message: "LOL",
      onClick: doNothing,
      description: "This is the description for LOL."
    },
    {
      message: "idk",
      onClick: doNothing,
      description: "This is the description for idk."
    },
    {
      message: "Close Dropdown",
      onClick: closeDropDown,
      description: "This is the button to close the dropdown"
    },
  ]

  const fanOutChat = (fakeDropdownData, setCurrentChat) => {
    const chatOutput = [];
    const angle = 5;
    const angleOffset = fakeDropdownData.length / 2 * angle;
    const marginTopRatio = 3;
    for (let i = 0; i < fakeDropdownData.length; i++) {
      const translateXValue = i % 2 == 0 ? -5 : 0;
      chatOutput.push(
        <OptionSelect key={"chat" + fakeDropdownData[i].message} setCurrentChat={setCurrentChat} currentName={currentChat} name={fakeDropdownData[i].message} isSelected={fakeDropdownData[i].onClick} key={"ChatBox-" + i} style={{ marginTop: (i * marginTopRatio) + "vw" }} rotate={"rotate(" + ((i * -angle) + angleOffset) + "deg) translateX(" + translateXValue + "vw) "}>
          {fakeDropdownData[i].message}
        </OptionSelect>
      )
    }

    return chatOutput;

  }


  return (
    <div id="main" style={{ position: "relative", height: '100vh', width: "100vw", display: "flex", justifyContent: 'center', alignItems: "center" }}>
      <>
        <div id="backdrop-filter" style={{ transition: "background-color .2s ease-in-out", zIndex: 0, position: "absolute", height: "100vh", width: "100vw", backgroundColor: backgroundColor }}></div>
        <div style={{ transform: options, transition: "transform .4s ease-in-out", position: "absolute", bottom: "45vh", right: "15vw" }}>
          <div style={{ transform: "translateX(-40vw) translateY(-40vh)" }}>
            {fanOutChat(fakeDropdownData,setCurrentChat).map(chatBox => {
              return chatBox
            })}
          </div>
        </div>

        <div id="dropdown Picture" style={{ transition: "transform .2s ease-in-out", transform: currentPic, right: "5vw", top: "30vh", position: "absolute", width: "18vw", height: "18vw", borderRadius: '50%', overflow: "hidden" }}>
          <Image src={currentUser == null ? joker : currentUser.image} layout="fill" objectFit="cover" alt="makoto"></Image>
        </div>

      </>


      <div id="Profiles " style={{ display: "flex", opacity: opacity, zIndex: z, transition: "opacity .2s ease-in-out" }}>
        {Personas.map(persona => {
          return <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
            <div onClick={() => { setCurrentUser(persona) }} key={persona.name} style={{ cursor: "pointer", margin: "0 2vw 0 2vw", position: "relative", width: "18vw", height: "18vw", borderRadius: '50%', overflow: "hidden" }}>
              <Image src={persona.image} layout="fill" objectFit="cover" alt="makoto"></Image>
            </div>
            <div className={arsenal.className} style={{ fontSize: "1.5vw", transform: "scale(1.15,1)", marginTop: "2vh" }}>{persona.name}</div>
          </div>
        })}
      </div>


      <div style={{ position: "absolute", bottom: 0, transform: "translateX(-49.9vw) " + chatAnimation, transition: "transform .2s ease-in-out" }}>
        <div id="ChatBox" style={{ opacity: currentChat ? 0 : 1, position: "absolute", bottom: "29vh", left: "29.2vw" }}>
          <ChatBox>
            <div>Hover over an option to see more about it!</div>
          </ChatBox>
        </div>

        {currentUser &&
          <div id="ChatBox" style={{ zIndex: 10, position: "absolute", bottom: "29vh", left: "29.2vw" }}>
            <NameTag name={currentUser.name}>
            </NameTag>
          </div>
        }
      </div>

      {
        fakeDropdownData.map(entry => {
          return(
          <div key={"description"+entry.message} style={{ position: "absolute", bottom: 0, transform: "translateX(-49.9vw) " + chatAnimation, transition: "transform .2s ease-in-out" }}>
            <div id="ChatBox" style={{ opacity: currentChat == entry.message ? 1 : 0, position: "absolute", bottom: "29vh", left: "29.2vw" }}>
              <ChatBox>
                <div>{entry.description}</div>
              </ChatBox>
            </div>

            {currentUser &&
              <div id="ChatBox" style={{ zIndex: 10, position: "absolute", bottom: "29vh", left: "29.2vw" }}>
                <NameTag name={currentUser.name}>
                </NameTag>
              </div>
            }
          </div>)


        })

      }


    </div>
  );
}
