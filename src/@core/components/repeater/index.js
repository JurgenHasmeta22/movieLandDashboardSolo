const Repeater = props => {
    const { count, tag, children } = props

    const Tag = tag || "div"

    const items = []

    for (let i = 0; i < count; i++) {
        items.push(children(i))
    }

    return <Tag {...props}>{items}</Tag>
}

export default Repeater
