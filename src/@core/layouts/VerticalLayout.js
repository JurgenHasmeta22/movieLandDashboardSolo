import { useState } from "react"

import Fab from "@mui/material/Fab"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"

import ArrowUp from "mdi-material-ui/ArrowUp"

import themeConfig from "src/configs/themeConfig"

import AppBar from "./components/vertical/appBar"
import Customizer from "src/@core/components/customizer"
import Navigation from "./components/vertical/navigation"

// import Footer from './components/shared-components/footer'
import ScrollToTop from "src/@core/components/scroll-to-top"

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker"

const VerticalLayoutWrapper = styled("div")({
    height: "100%",
    display: "flex"
})

const MainContentWrapper = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
})

const ContentWrapper = styled("main")(({ theme }) => ({
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(6),
    transition: "padding .25s ease-in-out",
    [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const VerticalLayout = props => {
    const { hidden, settings, children, scrollToTop } = props

    const { skin, navHidden, contentWidth } = settings
    const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig
    const navWidth = navigationSize
    const navigationBorderWidth = skin === "bordered" ? 1 : 0
    const collapsedNavWidth = collapsedNavigationSize

    const [navHover, setNavHover] = useState(false)
    const [navVisible, setNavVisible] = useState(false)

    const toggleNavVisibility = () => setNavVisible(!navVisible)

    return (
        <>
            <VerticalLayoutWrapper className='layout-wrapper'>
                {navHidden &&
                themeConfig.layout === "vertical" &&
                !(navHidden && settings.lastLayout === "horizontal") ? null : (
                    <Navigation
                        navWidth={navWidth}
                        navHover={navHover}
                        navVisible={navVisible}
                        setNavHover={setNavHover}
                        setNavVisible={setNavVisible}
                        collapsedNavWidth={collapsedNavWidth}
                        toggleNavVisibility={toggleNavVisibility}
                        navigationBorderWidth={navigationBorderWidth}
                        {...props}
                    />
                )}
                <MainContentWrapper className='layout-content-wrapper'>
                    <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

                    <ContentWrapper
                        className='layout-page-content'
                        sx={{
                            ...(contentWidth === "boxed" && {
                                mx: "auto",
                                "@media (min-width:1440px)": { maxWidth: 1440 },
                                "@media (min-width:1200px)": { maxWidth: "100%" }
                            })
                        }}
                    >
                        {children}
                    </ContentWrapper>

                    {/* <Footer {...props} /> */}

                    <DatePickerWrapper sx={{ zIndex: 11 }}>
                        <Box id='react-datepicker-portal'></Box>
                    </DatePickerWrapper>
                </MainContentWrapper>
            </VerticalLayoutWrapper>

            {disableCustomizer || hidden ? null : <Customizer />}

            {scrollToTop ? (
                scrollToTop(props)
            ) : (
                <ScrollToTop className='mui-fixed'>
                    <Fab color='primary' size='small' aria-label='scroll back to top'>
                        <ArrowUp />
                    </Fab>
                </ScrollToTop>
            )}
        </>
    )
}

export default VerticalLayout
