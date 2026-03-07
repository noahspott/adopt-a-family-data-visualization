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

    return <motion.span className="text-8xl font-bold inline-block">{display}</motion.span>
}