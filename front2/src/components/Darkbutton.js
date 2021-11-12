import React from "react"
const DarkMode = (props) => {
  let clickedClass = "clicked"
  const body = document.body
  const lightTheme = "theme-light"
  const darkTheme = "theme-dark"
  let theme;
  if (localStorage) {
    theme = localStorage.getItem("theme")
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  let icon = theme === darkTheme ? "sun" : "moon";
  // console.log(theme);
  const switchTheme = e => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      e.target.classList.remove(clickedClass)
      localStorage.setItem("theme", "theme-light")

      // console.log(e.target);
      theme = lightTheme
      document.getElementById(`theme_icon_${props.screen}`).classList.replace("feather-sun", "feather-moon")
    } else {
      body.classList.replace(lightTheme, darkTheme)
      e.target.classList.add(clickedClass)
      // console.log(e.target);
      localStorage.setItem("theme", "theme-dark")
      theme = darkTheme
      document.getElementById(`theme_icon_${props.screen}`).classList.replace("feather-moon", "feather-sun")
    }
  }
  // if (props.screen === "web") {
  // console.log(icon);
  return (
    <span>{
      props.screen == "web" &&
      <span className={`pointer p-2 text-center ms-3 menu-icon chat-active-btn ${theme === "dark" ? clickedClass : ""}`} onClick={e => switchTheme(e)}><i id={`theme_icon_${props.screen}`} className={`feather-${icon} font-xl text-current`}></i></span>
    }
      {
        props.screen == "mobile" &&
        < span className={`mob-menu me-2 ${theme === "dark" ? clickedClass : ""}`} onClick={e => switchTheme(e)}> <i id={`theme_icon_${props.screen}`} className={`feather-${icon} text-grey-900 font-sm btn-round-md bg-greylight`}></i></span >
      }
    </span>

  )
  // } else {
  // return (

  // )
  // }
}

export default DarkMode