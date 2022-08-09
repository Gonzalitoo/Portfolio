import React, { useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { InputSwitch } from "primereact/inputswitch";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const items = [
    {
      label: t("Header.about"),
      icon: "pi pi-fw pi-info-circle",
      command: () => {
        window.location.hash = "#";
      },
    },
    {
      label: t("Header.projects"),
      icon: "pi pi-fw pi-folder-open",
      command: () => {
        window.location.hash = "#projects";
      },
    },
    {
      label: t("Header.contact"),
      icon: "pi pi-fw pi-send",
      command: () => {
        window.location.hash = "#contact";
      },
    },
    {
      template: (init, changeTheme) => {
        return (
          <div className="toggle-theme-wrapper p-menuitem-link">
            <span className="pi-fw text-2xl">☀️</span>
            <InputSwitch
              checked={theme === "dark"}
              onChange={changeTheme.onClick}
            />
            <span className="pi-fw text-2xl">🌒</span>
          </div>
        );
      },
      command: () => {
        changeTheme();
      },
    },
  ];

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    window.dispatchEvent(new Event("switch-theme"));
  };

  useEffect(() => {
    let themeLink = document.getElementById("app-theme");
    if (themeLink) {
      if (theme === "light") {
        themeLink.href = "/portfolio/darkTheme.css";
      } else {
        themeLink.href = "/portfolio/darkTheme.css";
      }
    }
  }, [theme]);

  return (
    <Menubar
      className="border-none fixed top-0 z-1 flex justify-content-around py-2 w-full text-xl lg:text-2xl header-height"
      model={items}
      start={
        <div className="flex align-items-center">
          <a href="/" className="no-underline">
            <span className="border-circle bg-primary p-3 font-semibold font-italic  text-primary ">
              GP
            </span>
          </a>
        </div>
      }
    />
  );
};
