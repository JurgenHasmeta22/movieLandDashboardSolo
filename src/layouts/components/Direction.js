import { useEffect } from "react"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

import stylisRTLPlugin from "stylis-plugin-rtl"

const styleCache = () =>
    createCache({
        key: "rtl",
        prepend: true,
        stylisPlugins: [stylisRTLPlugin]
    })

const Direction = props => {
    const { children, direction } = props
    useEffect(() => {
        document.dir = direction
    }, [direction])
    if (direction === "rtl") {
        return <CacheProvider value={styleCache()}>{children}</CacheProvider>
    }

    return <>{children}</>
}

export default Direction
