module.exports = {
    content: ["./index.html", "./app.js"],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: "#111E30",
                    dark: "#0A121F",
                    soft: "#1A2B42",
                },
                gold: {
                    DEFAULT: "#C5A16B",
                    light: "#DFBA85",
                    dark: "#A37F4B",
                    subtle: "#E8D4B8",
                },
                ivory: {
                    DEFAULT: "#F6F0E7",
                    soft: "#FCF8F2",
                },
                heritage: {
                    DEFAULT: "#263C3A",
                    dark: "#192928",
                },
                silk: {
                    DEFAULT: "#E8DCCB",
                    light: "#F0E6D8",
                },
                charcoal: {
                    DEFAULT: "#292B30",
                    muted: "#5A5E6B",
                },
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', "serif"],
                sans: ["Manrope", "sans-serif"],
            },
            boxShadow: {
                "luxury-gold":
                    "0 10px 30px -5px rgba(197, 161, 107, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)",
                "luxury-navy": "0 15px 35px -5px rgba(17, 30, 48, 0.3)",
                "card-soft": "0 10px 30px rgba(41, 43, 48, 0.05)",
                "3d-gold":
                    "inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -2px 0 rgba(0, 0, 0, 0.2), 0 8px 20px rgba(197, 161, 107, 0.35)",
            },
        },
    },
    plugins: [],
};
