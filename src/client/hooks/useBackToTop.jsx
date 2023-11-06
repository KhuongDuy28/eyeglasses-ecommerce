import { useState } from "react"
import { useEffect } from "react"

const useBackToTop = () => {
    const [isScroll, setIsScroll] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 700) {
                setIsScroll(true)
            }
            else {
                setIsScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isScroll])

    const BackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return {
        isScroll, BackToTop
    }
}

export default useBackToTop