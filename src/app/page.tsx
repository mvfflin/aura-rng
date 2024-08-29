"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
    const [aura, setAura] = useState(0);
    const [cd, setCD] = useState(false);
    const DISABLED_CLASS = "disabled";
    const UPDATE_INTERVAL = 1000 / 60; // 60 times/s 60 FPS

    const rollAura = (event: any) => {
        const button = document.getElementById("rollAura");

        if (!button) return;

        button.classList.add(DISABLED_CLASS);
        button.style.cssText = "--time-left: 100%;";

        let time = 500 - UPDATE_INTERVAL;
        const intervalID = () => {
            const passedTime = (time / 500) * 100;
            button.style.cssText = `--time-left: ${passedTime}%;`;

            button.textContent;
        };
    };

    return (
        <main className="">
            <h1 className="text-center py-10 text-2xl">Aura : {aura}</h1>
            <div className="justify-center">
                <div
                    onClick={(e) => {
                        if (cd == false) {
                            setAura((prev) => prev + 1);
                            setCD(true);
                            setTimeout(() => {
                                setCD(false);
                            }, 500);
                        }
                    }}
                    className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400 mx-auto 
  "
                >
                    <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                        +1 Aura
                    </span>
                </div>
            </div>
        </main>
    );
}
