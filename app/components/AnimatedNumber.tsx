"use client"

import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export default function AnimatedNumber({ number }: { number: number }) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (v) => Math.round(v))
    const [display, setDisplay] = useState(0)

    useMotionValueEvent(rounded, "change", setDisplay)

    useEffect(() => {
        const controls = animate(count, number, { duration: 1 })
        return () => controls.stop()
    }, [count, number])

    return (
        <motion.span
            className="font-mono text-7xl font-bold tabular-nums text-[var(--accent)] glow-text sm:text-8xl lg:text-9xl"
        >
            {display}
        </motion.span>
    )
}