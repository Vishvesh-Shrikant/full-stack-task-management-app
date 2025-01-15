/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			bgLight: '#EEEEEE',
  			bgDark: '#1E1E1E',
  			lightText: '#04433B',
  			darkText: '#DDAA6B'
  		},
		fontFamily:{
			openSans:["Open Sans", "serif"]
		}
  	}
  },
  darkMode: ['class', "class"],
  plugins: [require("tailwindcss-animate")],
}