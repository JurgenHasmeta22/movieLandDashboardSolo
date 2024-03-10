const DateTimePicker = theme => {
    return {
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    '& [role="presentation"]': {
                        fontWeight: 400,
                        "& .PrivatePickersFadeTransitionGroup-root + .PrivatePickersFadeTransitionGroup-root > div": {
                            marginRight: 0
                        },
                        "& .MuiIconButton-sizeSmall": {
                            padding: theme.spacing(0.5)
                        },
                        "& + div .MuiIconButton-root:not(.Mui-disabled)": {
                            color: theme.palette.text.secondary
                        }
                    },
                    "& .PrivatePickersSlideTransition-root": {
                        minHeight: 240
                    },
                    "& .MuiCalendarPicker-viewTransitionContainer .MuiTypography-root": {
                        color: theme.palette.text.disabled
                    }
                }
            }
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    fontSize: "0.875rem",
                    letterSpacing: "0.15px"
                }
            }
        },
        MuiClockPicker: {
            styleOverrides: {
                arrowSwitcher: {
                    "& .MuiIconButton-root:not(.Mui-disabled)": {
                        color: theme.palette.text.secondary
                    },
                    "& + div": {
                        "& > div": {
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[50]
                                    : theme.palette.background.default,
                            "& ~ .MuiIconButton-root span.MuiTypography-caption": {
                                color: "inherit"
                            }
                        }
                    }
                }
            }
        },
        MuiMonthPicker: {
            styleOverrides: {
                root: {
                    "& > .MuiTypography-root.Mui-selected": {
                        fontSize: "1rem"
                    }
                }
            }
        }
    }
}

export default DateTimePicker
