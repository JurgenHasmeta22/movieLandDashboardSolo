import { useContext } from "react"

s
import { AbilityContext } from "src/layouts/components/acl/Can"

const CanViewNavLink = props => {
    const { children, navLink } = props

    const ability = useContext(AbilityContext)

    return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
}

export default CanViewNavLink
