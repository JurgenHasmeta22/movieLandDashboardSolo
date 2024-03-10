import { useEffect, Fragment } from "react"

import { useRouter } from "next/router"

import Chip from "@mui/material/Chip"
import Collapse from "@mui/material/Collapse"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import ListItemIcon from "@mui/material/ListItemIcon"
import { styled, useTheme } from "@mui/material/styles"
import ListItemButton from "@mui/material/ListItemButton"

import clsx from "clsx"

import ChevronLeft from "mdi-material-ui/ChevronLeft"
import ChevronRight from "mdi-material-ui/ChevronRight"

import themeConfig from "src/configs/themeConfig"

import { hasActiveChild, removeChildren } from "src/@core/layouts/utils"

import VerticalNavItems from "./VerticalNavItems"
import UserIcon from "src/layouts/components/UserIcon"
import Translations from "src/layouts/components/Translations"
import CanViewNavGroup from "src/layouts/components/acl/CanViewNavGroup"

const MenuItemTextWrapper = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transition: "opacity .25s ease-in-out",
    ...(themeConfig.menuTextTruncate && { overflow: "hidden" })
}))

const MenuGroupToggleRightIcon = styled(ChevronRight)(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: "transform .25s ease-in-out"
}))

const MenuGroupToggleLeftIcon = styled(ChevronLeft)(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: "transform .25s ease-in-out"
}))

const VerticalNavGroup = props => {
    const {
        item,
        parent,
        settings,
        navHover,
        navVisible,
        isSubToSub,
        groupActive,
        setGroupActive,
        collapsedNavWidth,
        currentActiveGroup,
        setCurrentActiveGroup,
        navigationBorderWidth
    } = props & Vars
    const theme = useTheme()
    const router = useRouter()
    const currentURL = router.pathname
    const { skin, direction, navCollapsed, verticalNavToggleType } = settings

    const toggleActiveGroup = (item, parent) => {
        let openGroup = groupActive

        if (openGroup.includes(item.title)) {
            openGroup.splice(openGroup.indexOf(item.title), 1)

            // If clicked Group has open group children, Also remove those children to close those groups
            if (item.children) {
                removeChildren(item.children, openGroup, currentActiveGroup)
            }
        } else if (parent) {
            if (parent.children) {
                removeChildren(parent.children, openGroup, currentActiveGroup)
            }

            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title)
            }
        } else {
            openGroup = []

            if (currentActiveGroup.every(elem => groupActive.includes(elem))) {
                openGroup.push(...currentActiveGroup)
            }

            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title)
            }
        }
        setGroupActive([...openGroup])
    }

    const handleGroupClick = () => {
        const openGroup = groupActive
        if (verticalNavToggleType === "collapse") {
            if (openGroup.includes(item.title)) {
                openGroup.splice(openGroup.indexOf(item.title), 1)
            } else {
                openGroup.push(item.title)
            }
            setGroupActive([...openGroup])
        } else {
            toggleActiveGroup(item, parent)
        }
    }
    useEffect(() => {
        if (hasActiveChild(item, currentURL)) {
            if (!groupActive.includes(item.title)) groupActive.push(item.title)
        } else {
            const index = groupActive.indexOf(item.title)
            if (index > -1) groupActive.splice(index, 1)
        }
        setGroupActive([...groupActive])
        setCurrentActiveGroup([...groupActive])

        // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
        if (navCollapsed && !navHover) {
            setGroupActive([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath])
    useEffect(() => {
        if (navCollapsed && !navHover) {
            setGroupActive([])
        }
        if ((navCollapsed && navHover) || (groupActive.length === 0 && !navCollapsed)) {
            setGroupActive([...currentActiveGroup])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navCollapsed, navHover])
    useEffect(() => {
        if (groupActive.length === 0 && !navCollapsed) {
            setGroupActive([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navHover])
    const IconTag = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon
    const menuGroupCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

    const conditionalIconColor = () => {
        if (skin === "semi-dark" && theme.palette.mode === "light") {
            return {
                color: `rgba(${theme.palette.customColors.dark}, ${parent && item.children ? 0.68 : 0.87})`
            }
        } else if (skin === "semi-dark" && theme.palette.mode === "dark") {
            return {
                color: `rgba(${theme.palette.customColors.light}, ${parent && item.children ? 0.68 : 0.87})`
            }
        } else
            return {
                color: parent && item.children ? theme.palette.text.secondary : theme.palette.text.primary
            }
    }

    const conditionalArrowIconColor = () => {
        if (skin === "semi-dark" && theme.palette.mode === "light") {
            return {
                color: `rgba(${theme.palette.customColors.dark}, 0.68)`
            }
        } else if (skin === "semi-dark" && theme.palette.mode === "dark") {
            return {
                color: `rgba(${theme.palette.customColors.light}, 0.68)`
            }
        } else return {}
    }

    const conditionalBgColor = () => {
        if (skin === "semi-dark" && theme.palette.mode === "light") {
            return {
                "&:hover": {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.05)`
                },
                "&.Mui-selected": {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.08)`,
                    "&:hover": {
                        backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.08)`
                    }
                }
            }
        } else if (skin === "semi-dark" && theme.palette.mode === "dark") {
            return {
                "&:hover": {
                    backgroundColor: `rgba(${theme.palette.customColors.light}, 0.05)`
                },
                "&.Mui-selected": {
                    backgroundColor: `rgba(${theme.palette.customColors.light}, 0.08)`,
                    "&:hover": {
                        backgroundColor: `rgba(${theme.palette.customColors.light}, 0.08)`
                    }
                }
            }
        } else {
            return {
                "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                    "&:hover": {
                        backgroundColor: theme.palette.action.selected
                    }
                }
            }
        }
    }

    return (
        <CanViewNavGroup navGroup={item}>
            <Fragment>
                <ListItem
                    disablePadding
                    className='nav-group'
                    onClick={handleGroupClick}
                    sx={{
                        mt: 1.5,
                        flexDirection: "column",
                        transition: "padding .25s ease-in-out",
                        px:
                            parent && item.children
                                ? "0 !important"
                                : `${theme.spacing(navCollapsed && !navHover ? 2 : 3)} !important`
                    }}
                >
                    <ListItemButton
                        className={clsx({
                            "Mui-selected": groupActive.includes(item.title) || currentActiveGroup.includes(item.title)
                        })}
                        sx={{
                            py: 2.25,
                            width: "100%",
                            borderRadius: "8px",
                            ...conditionalBgColor(),
                            transition: "padding-left .25s ease-in-out",
                            pr:
                                navCollapsed && !navHover
                                    ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8
                                    : 3,
                            pl:
                                navCollapsed && !navHover
                                    ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8
                                    : 4
                        }}
                    >
                        {isSubToSub ? null : (
                            <ListItemIcon
                                sx={{
                                    ...conditionalIconColor(),
                                    transition: "margin .25s ease-in-out",
                                    ...(parent && navCollapsed && !navHover ? {} : { mr: 2 }),
                                    ...(navCollapsed && !navHover ? { mr: 0 } : {}),
                                    ...(parent && item.children ? { ml: 2, mr: 4 } : {})
                                }}
                            >
                                <UserIcon
                                    icon={IconTag}
                                    componentType='vertical-menu'
                                    iconProps={{ sx: { ...(parent ? { fontSize: "0.5rem" } : {}) } }}
                                />
                            </ListItemIcon>
                        )}
                        <MenuItemTextWrapper sx={{ ...menuGroupCollapsedStyles, ...(isSubToSub ? { ml: 8 } : {}) }}>
                            <Typography
                                {...((themeConfig.menuTextTruncate ||
                                    (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                                    noWrap: true
                                })}
                            >
                                <Translations text={item.title} />
                            </Typography>
                            <Box className='menu-item-meta' sx={{ ml: 1.5, display: "flex", alignItems: "center" }}>
                                {item.badgeContent ? (
                                    <Chip
                                        size='small'
                                        label={item.badgeContent}
                                        color={item.badgeColor || "primary"}
                                        sx={{
                                            mr: 0.75,
                                            "& .MuiChip-label": {
                                                px: 2.5,
                                                lineHeight: 1.385,
                                                textTransform: "capitalize"
                                            }
                                        }}
                                    />
                                ) : null}
                                {direction === "ltr" ? (
                                    <MenuGroupToggleRightIcon
                                        sx={{
                                            ...conditionalArrowIconColor(),
                                            ...(groupActive.includes(item.title) ? { transform: "rotate(90deg)" } : {})
                                        }}
                                    />
                                ) : (
                                    <MenuGroupToggleLeftIcon
                                        sx={{
                                            ...conditionalArrowIconColor(),
                                            ...(groupActive.includes(item.title) ? { transform: "rotate(-90deg)" } : {})
                                        }}
                                    />
                                )}
                            </Box>
                        </MenuItemTextWrapper>
                    </ListItemButton>
                    <Collapse
                        component='ul'
                        onClick={e => e.stopPropagation()}
                        in={groupActive.includes(item.title)}
                        sx={{
                            pl: 0,
                            width: "100%",
                            ...menuGroupCollapsedStyles,
                            transition: "all .25s ease-in-out"
                        }}
                    >
                        <VerticalNavItems
                            {...props}
                            parent={item}
                            navVisible={navVisible}
                            verticalNavItems={item.children}
                            isSubToSub={parent && item.children ? item : undefined}
                        />
                    </Collapse>
                </ListItem>
            </Fragment>
        </CanViewNavGroup>
    )
}

export default VerticalNavGroup
