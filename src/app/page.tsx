"use client";

import { auraList } from "@/constants/dummyaura";
import Image from "next/image";
import { FormEvent, useState } from "react";
// import exactmath from "exact-math"
const exactmath = require("exact-math")

export default function Home() {
    const [aura, setAura] = useState<any>(0);
    // const [totalaura, setTotalAura] = useState(0)
    const [cd, setCD] = useState(false);
    const DISABLED_CLASS = "disabled";
    const UPDATE_INTERVAL = 1000 / 60; // 60 times/s 60 FPS
    const [cumul, setCumul] = useState<any>();
    const [rand, setRand] = useState<any>();
    let TotalAura = 0;

    auraList.map((aura, index) => {
        TotalAura += aura.Rarity;
        console.log(TotalAura);
    });
    
    const rollAura = (event: any) => {
        const button = document.getElementById("rollAura");
        
        if (!button || cd) return;
        
        let randomChance = Math.floor(Math.random() * TotalAura);
        
        let Cumulative = 0;
        for (let index = 0; index < auraList.length; index++) {
            Cumulative += auraList[index].Rarity;
            setCumul(exactmath.round(Cumulative, 4));
            setRand(randomChance);
            if (randomChance <= Cumulative) {
                setAura(auraList[index].Name);
                break;
                // return auraList[index].Name;
            }
        }
        setCD(true);
        // setAura(auraname);
        // setAura((prev) => prev + 1);
        button.classList.add(DISABLED_CLASS);
        button.style.cssText = "--time-left: 100%;";

        let time = 1000 - UPDATE_INTERVAL;
        const intervalID = setInterval(() => {
            const passedTime = (time / 1000) * 100;
            button.style.cssText = `--time-left: ${passedTime}%;`;

            button.innerHTML = (time / 1000).toFixed(2);
            time -= UPDATE_INTERVAL;

            if (time < 0) {
                button.innerText = "Roll Aura";
                // button.style.cssText = "";
                button.classList.remove(DISABLED_CLASS);
                setCD(false);
                clearInterval(intervalID);
            }
        }, UPDATE_INTERVAL);
    };

    return (
        <main className="">
            <h1 className="text-center py-10 text-5xl">
                {aura}
            </h1>
            <h2>1 of {cumul}</h2>
            <div className="justify-center">
                <div
                    id="rollAura"
                    onClick={(e) => {
                        if (cd == false) {
                            // setAura((prev) => prev + 1);
                            // setCD(true);
                            // setTimeout(() => {
                            //     setCD(false);
                            // }, 500);
                            rollAura(e);
                        }
                    }}
                    className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400 mx-auto text-white text-center font-bold justify-center items-center py-5
  "
                >
                    Roll Aura
                </div>
            </div>
        </main>
    );
}
