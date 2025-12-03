import { useState } from "react";

export const GavelSpotlight = () => {
    const [pos, setPos] = useState({ x: "0px", y: "0px" });
    const [isMove , setIsMove] = useState(false)


    const handleMove = (e) => {
        setIsMove(true)
        const rect = e.target.getBoundingClientRect();
        setPos({
            x: e.clientX - rect.left + "px",
            y: e.clientY - rect.top + "px",
        });
    };

    return (
        <div
            className="text-center relative font-bold text-6xl min-[370px]:text-[5rem] min-[480px]:text-[7rem] min-[600px]:text-[9rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] text-transparent bg-clip-text bg-gradient-to-b from-secondary/30 to-background/25 cursor-pointer "
            onMouseMove={handleMove}
            onMouseLeave={() => setIsMove(false)}
            style={{
                "--x": pos.x,
                "--y": pos.y,
            }}
        >
            {isMove &&<span className="pointer-events-none absolute z-10 inset-0 bg-[radial-gradient(circle_150px_at_var(--x)_var(--y),#0040ff,transparent_90%)] mix-blend-soft-light " />}
            GAVEL
        </div>
    );
};
