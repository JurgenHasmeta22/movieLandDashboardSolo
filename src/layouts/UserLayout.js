import useMediaQuery from "@mui/material/useMediaQuery"

s
// !Do not remove this Layout import
import Layout from "src/@core/layouts/Layout"

import VerticalNavItems from "src/navigation/vertical"
import HorizontalNavItems from "src/navigation/horizontal"

// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from "./components/vertical/AppBarContent"
import HorizontalAppBarContent from "./components/horizontal/AppBarContent"

import { useSettings } from "src/@core/hooks/useSettings"

const UserLayout = ({ children }) => {
    const { settings, saveSettings } = useSettings()

    /**
     *  The below variable will hide the current layout menu at given screen size.
     *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
     *  You can change the screen size from which you want to hide the current layout menu.
     *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
     *  to know more about what values can be passed to this hook.
     *  ! Do not change this value unless you know what you are doing. It can break the template.
     */
    const hidden = useMediaQuery(theme => theme.breakpoints.down("lg"))

    return (
        <Layout
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            {...(settings.layout === "horizontal"
                ? {
                      horizontalNavItems: HorizontalNavItems(),

                      // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
                      // horizontalNavItems: ServerSideHorizontalNavItems(),

                      horizontalAppBarContent: () => (
                          <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
                      )
                  }
                : {
                      verticalNavItems: VerticalNavItems(),

                      // Uncomment the below line when using server-side menu in vertical layout and comment the above line
                      // verticalNavItems: ServerSideVerticalNavItems(),

                      verticalAppBarContent: props => (
                          <VerticalAppBarContent
                              hidden={hidden}
                              settings={settings}
                              saveSettings={saveSettings}
                              toggleNavVisibility={props.toggleNavVisibility}
                          />
                      )
                  })}
        >
            {children}
        </Layout>
    )
}

export default UserLayout
