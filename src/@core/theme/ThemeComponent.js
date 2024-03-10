import { deepmerge } from "@mui/utils"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles"

import themeConfig from "src/configs/themeConfig"

import Direction from "src/layouts/components/Direction"

import overrides from "./overrides"
import typography from "./typography"

import themeOptions from "./ThemeOptions"
import UserThemeOptions from "src/layouts/UserThemeOptions"

import GlobalStyling from "./globalStyles"

const ThemeComponent = props => {
    const { settings, children } = props

    const coreThemeConfig = themeOptions(settings)

    let theme = createTheme(coreThemeConfig)

    const mergeComponentOverrides = (theme, settings) =>
        deepmerge({ ...overrides(theme, settings) }, UserThemeOptions()?.components)

    const mergeTypography = theme => deepmerge(typography(theme), UserThemeOptions()?.typography)

    theme = createTheme(theme, {
        components: { ...mergeComponentOverrides(theme, settings) },
        typography: { ...mergeTypography(theme) }
    })

    if (themeConfig.responsiveFontSizes) {
        theme = responsiveFontSizes(theme)
    }

    return (
        <ThemeProvider theme={theme}>
            <Direction direction={settings.direction}>
                <CssBaseline />
                <GlobalStyles styles={() => GlobalStyling(theme, settings)} />
                {children}
            </Direction>
        </ThemeProvider>
    )
}

export default ThemeComponent
