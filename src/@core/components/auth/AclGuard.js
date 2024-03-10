import { useState } from "react"

import { useRouter } from "next/router"

import { AbilityContext } from "src/layouts/components/acl/Can"

import { buildAbilityFor } from "src/configs/acl"

import NotAuthorized from "src/pages/401"
import BlankLayout from "src/@core/layouts/BlankLayout"

import { useAuth } from "src/hooks/useAuth"

const AclGuard = props => {
    const { aclAbilities, children, guestGuard } = props
    const [ability, setAbility] = useState(undefined)

    const auth = useAuth()
    const router = useRouter()

    // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
    if (guestGuard || router.route === "/404" || router.route === "/500" || router.route === "/") {
        return <>{children}</>
    }

    // User is logged in, build ability for the user based on his role
    if (auth.user && auth.user.role && !ability) {
        setAbility(buildAbilityFor(auth.user.role, aclAbilities.subject))
    }

    // Check the access of current user and render pages
    if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
        return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }

    // Render Not Authorized component if the current user has limited access
    return (
        <BlankLayout>
            <NotAuthorized />
        </BlankLayout>
    )
}

export default AclGuard
