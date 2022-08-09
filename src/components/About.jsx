import React from "react";
import { Card } from "primereact/card";
import { motion } from "framer-motion";

export const About = ({ t }) => {
  return (
    <motion.div
      className="mobile-about mt-5 md:mt-2 xl:ml-8"
      variants={{
        visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1.5 } },
        hidden: { x: "-10%", y: "60%", opacity: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card
        title={t("About.cardTitle")}
        className="text-lg md:text-xl xl:text-2xl line-height-2 origin-center shadow-8 text-center lg:text-right py-3 about-rotation"
      >
        <div className="mx-3 xl:mx-8 text-center align-self-center origin-top-left line-height-2 xl:line-height-3">
          <p>{t("About.cardDesc")}</p>
          <p>{t("About.cardDesc2")}</p>
        </div>
      </Card>
    </motion.div>
  );
};
