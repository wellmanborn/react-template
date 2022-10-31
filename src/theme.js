import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
    ...(mode === "dark" ? {
        grey: {
            50: "#C2C2C2",
            100: "#B8B8B8",
            200: "#A3A3A3",
            300: "#8F8F8F",
            400: "#7A7A7A",
            500: "#666666",
            600: "#4A4A4A",
            700: "#2E2E2E",
            800: "#121212",
            900: "#000000",
        },
        primary: {
            50: "#f3f5fa",
            100: "#e2e4f3",
            200: "#cbcfe7",
            300: "#9ca1c9",
            400: "#6b6ea8",
            500: "#313472",
            600: "#262754",
            700: "#1d1d3a",
            750: "#191934",
            800: "#111122",
            900: "#080810",
        },
        orangeAccent: {
            50: "#fff9eb",
            100: "#feecc7",
            200: "#fcd88b",
            300: "#fbbd4e",
            400: "#faab35",
            500: "#f3820d",
            600: "#d85e07",
            700: "#b33e0a",
            800: "#91300f",
            900: "#772810",
        },
        greenAccent: {
            50: "#f1fcf9",
            100: "#cff8e9",
            200: "#9ff0d5",
            300: "#68e0bd",
            400: "#4cceac",
            500: "#1fad8a",
            600: "#168b70",
            700: "#166f5c",
            800: "#16594b",
            900: "#174a40",
        },
        redAccent: {
            50: "#fdf3f3",
            100: "#fbe6e5",
            200: "#f9d0cf",
            300: "#f3b0ae",
            400: "#ea837f",
            500: "#db4f4a",
            600: "#c93e39",
            700: "#a9302c",
            800: "#8c2b28",
            900: "#752a27",
        },
        blueAccent: {
            50: "#f2fbfa",
            100: "#d4f3f0",
            200: "#a9e6e2",
            300: "#6ccfcc",
            400: "#49b8b8",
            500: "#309a9c",
            600: "#247a7d",
            700: "#216164",
            800: "#1e4e51",
            900: "#1d4244",
        }
    } : {
        grey: {
            50:  "#000000",
            100: "#121212",
            200: "#2E2E2E",
            300: "#4A4A4A",
            400: "#666666",
            500: "#7A7A7A",
            600: "#8F8F8F",
            700: "#A3A3A3",
            800: "#B8B8B8",
            900: "#C2C2C2",
        },
        primary: {
            50: "#080810",
            100: "#111122",
            200: "#191934",
            300: "#1d1d3a",
            400: "#262754",
            500: "#313472",
            600: "#6b6ea8",
            700: "#9ca1c9",
            750: "#cbcfe7",
            800: "#e2e4f3",
            900: "#f3f5fa",
        },
        orangeAccent: {
            50:  "#772810",
            100: "#91300f",
            200: "#b33e0a",
            300: "#d85e07",
            400: "#f3820d",
            500: "#faab35",
            600: "#fbbd4e",
            700: "#fcd88b",
            800: "#feecc7",
            900: "#fff9eb",
        },
        greenAccent: {
            50:  "#174a40",
            100: "#16594b",
            200: "#166f5c",
            300: "#168b70",
            400: "#1fad8a",
            500: "#4cceac",
            600: "#68e0bd",
            700: "#9ff0d5",
            800: "#cff8e9",
            900: "#f1fcf9",
        },
        redAccent: {
            50:  "#752a27",
            100: "#8c2b28",
            200: "#a9302c",
            300: "#c93e39",
            400: "#db4f4a",
            500: "#ea837f",
            600: "#f3b0ae",
            700: "#f9d0cf",
            800: "#fbe6e5",
            900: "#fdf3f3",
        },
        blueAccent: {
            50:  "#1d4244",
            100: "#1e4e51",
            200: "#216164",
            300: "#247a7d",
            400: "#309a9c",
            500: "#49b8b8",
            600: "#6ccfcc",
            700: "#a9e6e2",
            800: "#d4f3f0",
            900: "#f2fbfa",
        }
    })
})


export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode,
            ...(mode === "dark" ? {
                primary: {
                    main: colors.primary[500]
                },
                secondary: {
                    main: colors.greenAccent[500]
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: colors.primary[900]
                }
            } : {
                primary: {
                    main: colors.primary[100]
                },
                secondary: {
                    main: colors.greenAccent[500]
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: "#fcfcfc"
                }
            })
        },
        typography: {
            fontFamily: ["IRANSans", "Arial", "serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["IRANSans", "Arial", "serif"].join(","),
                fontSize: 14,
            }
        }
    }
}

//context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export const useMode = () => {
    const [mode, setMode] = useState("dark")

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode]
}