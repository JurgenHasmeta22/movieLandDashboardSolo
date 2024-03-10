import { useEffect } from "react"

s
import { useRouter } from "next/router"

Import
import { useAuth } from "src/hooks/useAuth"

const GuestGuard = props => {
    const { children, fallback } = props
    const auth = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) {
            return
        }
        if (window.localStorage.getItem("userData")) {
            router.replace("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.route])
    if (auth.loading || (!auth.loading && auth.user !== null)) {
        return fallback
    }

    return <>{children}</>
}

export default GuestGuard
