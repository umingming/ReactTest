/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx,ts}"],
    theme: {
        screens: {
            mobile: {
                max: "799px",
            },
            tablet: {
                raw: "(min-width: 601px) and (max-width: 1334px) and (orientation: portrait)",
            },
            pc: {
                raw: "(min-width: 800px) and (orientation: landscape), (min-width: 1335px)",
            },
        },
        extend: {},
    },
    plugins: [],
};
