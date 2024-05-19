'use client'
import { useState } from 'react'
import { Arsenal } from 'next/font/google'
const arsenal = Arsenal({weight:"400",subsets:['latin']})



const ChatBox = ({ style, children, isSelected, rotate }) => {
    const [mainBackgroundColor, setMainBackgroundColor] = useState("black");
    const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState("white");
    const [scale, setScale] = useState("scale(.7)");
    const [zIndex, setZIndex] = useState(5);
    const mainTextBoxWidth = 25;
    const mainTextBoxHeight = 5.5;
    const boxRatioWidth = .05;
    const boxRatioHeight = .2;

    const mainTriangleHeight = mainTextBoxWidth * .25;
    const traingleRatioHeight = .2;

    const invertColorsAndScale = () => {
        setMainBackgroundColor(mainBackgroundColor == "black" ? "white" : "black");
        setSecondaryBackgroundColor(mainBackgroundColor == "black" ? "black" : "white");
        setScale(scale == "scale(.7)" ? "scale(.77)" : "scale(.7)");
        setZIndex(zIndex === 5 ? 6 : 5);
    }


    return (
        <div
         style={{
            ...style,
            transform: scale + " " + rotate + " translateX(0vw)",
            transition: "transform .025s linear",
            position: "absolute",
            transformOrigin: "bottom right",
            width: mainTextBoxWidth + mainTriangleHeight * 1.06 + "vw",
            height: mainTriangleHeight * 1.27 + "vw",
            zIndex: zIndex,

        }}>
            <div style={{transform:"rotateY(180deg) scale(1.8,1.8)"}}>
                <div id="main-text-box" style={{
                    marginLeft: (boxRatioWidth / 2) * mainTextBoxWidth + "vw",
                    marginTop: (boxRatioHeight / 2) * mainTextBoxHeight + "vw",
                    transform: "rotate(3deg)",
                    zIndex: 5, position: "absolute",
                    backgroundColor: mainBackgroundColor,
                    height: mainTextBoxHeight + "vw",
                    width: mainTextBoxWidth + "vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <div style={{
                        zIndex: 5,
                        color: secondaryBackgroundColor,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        position: "absolute",
                        transform:"scale(1.15,1) rotateY(180deg)",
                        fontSize:".9vw"

                    }} 
                    className={arsenal.className}
                    >
                        {children}
                    </div>
                </div>
                <div id="background-text-box" style={{
                    zIndex: 1,
                    transform: "rotate(3deg)",
                    position: "absolute",
                    backgroundColor: secondaryBackgroundColor,
                    height: mainTextBoxHeight * (1 + boxRatioHeight) + "vw",
                    width: mainTextBoxWidth * (1 + boxRatioWidth) + "vw",

                }}></div>
            </div>


        </div>

    )
}

export default ChatBox
