import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { motion } from "framer-motion";
import { Galleria } from "primereact/galleria";
import { useTranslation } from "react-i18next";
import { Button } from 'primereact/button';

import {
  difficultDark,
  difficultLight,
  rampAppDark,
  rampAppLight,
} from "../common/imagesUrl";
import projects from "../common/projects.json"

export const Project = ({
  flexDirection,
  textAlign,
  txt,
  title,
  images,
  animationVariant,
  mobile,
  link
}) => {
  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        className={`img-proj border-round ${mobile}`}
      />
    );
  };

  const handleClick = () => {
    window.location.href = link;
  }

  return (
    <Card
      title={title}
      className={`w-full h-auto m-auto my-4 mobile-projects xl-card`}
    >
      <motion.div
        className={`flex flex-column text-center text-2xl lg:${flexDirection} lg:${textAlign} lg:justify-content-evenly projects-container`}
        variants={animationVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Galleria
          value={images}
          autoPlay
          circular
          showItemNavigators
          showThumbnails={false}
          showItemNavigatorsOnHover
          showIndicators
          item={itemTemplate}
        />
        <div className="m-1 text-lg md:text-3xl lg:text-3xl txt-proj md:align-self-center lg:align-self-start xl:align-self-center">
        <p>
          {txt}
        </p>
        <Button onClick={handleClick} className="p-2 mt-3">
          <i className="pi pi-github mr-2 md:text-xl"></i>
          <span className="text-lg md:text-xl">{title}</span>
      </Button>
        </div>
        
      </motion.div>
    </Card>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(
    JSON.parse(window.localStorage.getItem("theme")) || "dark"
  );

  useEffect(() => {
    window.addEventListener("switch-theme", () => {
      setTheme(JSON.parse(window.localStorage.getItem("theme")));
    });
  }, [theme]);

  return (
    <>
      <div className="altura" id="projects"></div>
      <h1 className="text-center md:text-5xl">{t("Projects.title")}</h1>
      <div className="mobile flex flex-column mx-5 mbot lg:mb-7">
        <Project
          txt={t("Projects.descP1")}
          flexDirection="flex-row"
          textAlign="text-right"
          images={theme === "dark" ? difficultDark : difficultLight}
          title={projects.tittleDifficult}
          animationVariant={{
            visible: { opacity: 1, transition: { duration: 1.5 }, x: 0 },
            hidden: { opacity: 0, x: "7%" },
          }}
          link={projects.linkDifficult}
        />
        <Project
          txt={t("Projects.descP2")}
          flexDirection="flex-row-reverse"
          textAlign="text-left"
          images={theme === "dark" ? rampAppDark : rampAppLight}
          title={projects.tittleRampApp}
          animationVariant={{
            visible: { opacity: 1, transition: { duration: 1.5 }, x: 0 },
            hidden: { opacity: 0, x: "-7%" },
          }}
          mobile="mobile-width"
          link={projects.linkRampApp}
        />
      </div>
    </>
  );
};
