/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				panchang: ["Panchang", "sans-serif"],
				satoshi: ["Satoshi", "sans-serif"],
			},
			screens: {
				xxs: "320px",
				xs: "576px",
				sm: "768px",
				md: "992px",
				lg: "1200px",
				xl: "1400px",
				xxl: "1600px",
			},
			container: {
				center: true,
				padding: "1rem",
				screens: {
					xxs: "340px",
					xs: "540px",
					sm: "720px",
					md: "960px",
					lg: "1140px",
					xl: "1200px",
				},
			},
			colors: {
				textColor: "#4a4754",
				primaryColor: "#201a31",
				buttonColor: "#0df5e3",
				highlightColor: "#FFD700",
			},
		},

		plugins: [],
	},
};
