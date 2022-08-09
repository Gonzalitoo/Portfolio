import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { About } from "./About";

export const Home = () => {
  const { t } = useTranslation();
  const [img, setImg] = useState(
    JSON.parse(window.localStorage.getItem("theme")) === "dark"
      ? "ZaAP18p"
      : "e4dVpoE"
  );

  useEffect(() => {
    window.addEventListener("switch-theme", () => {
      setImg(themeHandler());
    });
  }, [img]);

  const themeHandler = () => {
    const theme = JSON.parse(window.localStorage.getItem("theme"));
    return theme === "dark" ? "ZaAP18p" : "e4dVpoE";
  };

  return (
    <div
      className="grid grid-nogutter text-1 mt-7 small-cel md:h-screen"
      id="about"
    >
      <div className="col-12 lg:col-6 p-6 m-auto max-tamanio">
        <motion.section
          className="flex flex-column text-center lg:text-left align-items-center mobile-home mb-6 md:mb-8 md:-mt-8"
          variants={{
            visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1.5 } },
            hidden: { x: "-10%", y: "60%", opacity: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span
            className="block text-5xl md:text-7xl lg:text-6xl font-bold mb-1 nowrap md:-mt-8"
            id="home"
          >
            Gonzalo Perez
          </span>
          <div className="text-5xl md:text-6xl lg:text-5xl text-primary font-bold mb-3 mbot">
            Full stack developer
          </div>
          <p className="mt-0 mb-4 lg:mb-2 mx-2 xl:mx-4 line-height-3 md:text-2xl">
            {t("About.desc")}
          </p>
          {/* <div> */}
          <Button
            label={t("About.btn")}
            type="button"
            className="p-button-raised md:align-self-end sm:align-self-center sm:mb-4 md:mb-0 mx-8 white-space-nowrap"
            // onClick={changeTheme}
          />
          {/* <Button
            label={t("About.btn")}
            type="button"
            className="p-button-raised md:align-self-end sm:align-self-center sm:mb-4 md:mb-0 mx-8 white-space-nowrap"
            // onClick={changeTheme}
          /> */}
          {/* </div> */}
        </motion.section>
        <About t={t} />
      </div>
      <motion.div
        className="hidden lg:block col-12 md:col-6 h-screen overflow-hidden align-self-center"
        variants={{
          visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 1.2 },
            scale: 1,
          },
          hidden: { x: "20%", opacity: 0, scale: 0.5 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src={`https://i.imgur.com/${img}.png`}
          alt="..."
          className="md:ml-auto block md:mt-2 img-home"
          style={{
            width: "-webkit-fill-available",
            clipPath: "polygon(0% 0px, 100% 0%, 100% 100%, 107px 100%)",
          }}
        />
      </motion.div>
    </div>
  );
};
