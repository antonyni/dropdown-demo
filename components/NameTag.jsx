'use client'
import { useState } from 'react'
import { Arsenal } from 'next/font/google'
const arsenal = Arsenal({weight:"400",subsets:['latin']})



const NameTag = ({ style, children, isSelected, rotate, name }) => {
    const [mainBackgroundColor, setMainBackgroundColor] = useState("white");
    const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState("black");
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

    const processName = (name) => {
        const charArray = Array.from(name);
        const processedArray = [];

        for(let i = 0; i < charArray.length; i++){
            if(charArray[i] == 'a' || charArray[i] == 'e' || charArray[i] == 'i' || charArray[i] =='o' || charArray[i] == 'u'){
                processedArray.push(<span key={i} style={{backgroundColor:"black", color:"white"}}>{charArray[i]}</span>)
            }
            else if(charArray[i] == ' ')
            {
                processedArray.push(<span key={'blank'} style={{backgroundColor:"white", color:"black"}}>&nbsp;</span>)
            }
            else{
                processedArray.push(<span key={i} style={{backgroundColor:"white", color:"black"}}>{charArray[i]}</span>)
            }
        }
        return processedArray;


    }


    return (
        <div  style={{
            ...style,
            transform: scale + " " + rotate + " translateX(0vw)",
            transition: "transform .025s linear",
            position: "absolute",
            transformOrigin: "bottom right",
            width: mainTextBoxWidth + mainTriangleHeight * 1.06 + "vw",
            height: mainTriangleHeight * 1.27 + "vw",
            zIndex: zIndex,

        }}>
            <div style={{transform:"rotateY(180deg) scale(.5) rotate(9deg)", marginRight:"24vw", marginTop:"-2vw"}}>
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
                        fontSize:"3vw"

                    }} 
                    className={arsenal.className}
                    >
                        {processName(name).map((letter)=>letter)}
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

export default NameTag;
