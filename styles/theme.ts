import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0B305F",
        },
        secondary: {
            main: "#0B305F"
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "padding": "0 10px",
                    "height": "48px",
                    "backgroundColor": "#ffffff",
                    "display": "flex",
                    "alignItems": "center",
                    "borderRadius": "8px",
                    "color": "#000"
                },
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    padding: "0 10px"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "borderRadius": "8px",
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: "0 40px"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: "8px",
                    border: "1px solid #DFE0EB"
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    ":last-of-type": {
                        borderRadius: "8px"
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover" : {
                        "backgroundColor": "#FFFCF6"
                    },
                    "&.Mui-selected": {
                        "&:hover" : {
                            "backgroundColor": "#FEF3C7",
                        }
                    }
                },
            },
        },
    },
})

export default theme;