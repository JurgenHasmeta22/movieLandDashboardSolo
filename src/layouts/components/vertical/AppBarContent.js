import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"

import MenuIcon from "mdi-material-ui/Menu"

import Autocomplete from "src/layouts/components/Autocomplete"
import ModeToggler from "src/@core/layouts/components/shared-components/ModeToggler"
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown"
import LanguageDropdown from "src/@core/layouts/components/shared-components/LanguageDropdown"
import NotificationDropdown from "src/@core/layouts/components/shared-components/NotificationDropdown"

const AppBarContent = props => {
    const { hidden, settings, saveSettings, toggleNavVisibility } = props

    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box className='actions-left' sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                {hidden ? (
                    <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                        <MenuIcon />
                    </IconButton>
                ) : null}

                {/* <Autocomplete hidden={hidden} settings={settings} /> */}
                {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
            </Box>
            <Box className='actions-right' sx={{ display: "flex", alignItems: "center" }}>
                {/* <Autocomplete hidden={hidden} settings={settings} /> */}
                {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
                <ModeToggler settings={settings} saveSettings={saveSettings} />
                {/* <NotificationDropdown settings={settings} /> */}
                <UserDropdown settings={settings} />
            </Box>
        </Box>
    )
}

export default AppBarContent
