import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";

import { apiKey } from "../common/emailkeys";

const idiomas = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Español",
    value: "es",
  },
];

export const Footer = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("language");

 useEffect(() => {
    i18n.changeLanguage(lng || navigator.language);
  }, [i18n, lng]);

  const handleChangeIdioma = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Name is required.";
      }

      if (!values.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!values.message) {
        errors.message = "Message is required.";
      }

      return errors;
    },
    onSubmit: (values) => {
      setLoading(true);
      try {
        emailjs
          .send(apiKey.SERVICE_ID, apiKey.TEMPLATE_ID, values, apiKey.USER_ID)
          .then(() => {
            setLoading(false);
            showSuccess();
            formik.resetForm();
          });
      } catch {
        setLoading(false);
        showWarn();
      }
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error ml-2">{formik.errors[name]}</small>
      )
    );
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: t("Toast.successTitle"),
      detail: t("Toast.successMsg"),
      life: 3000,
    });
  };

  const showWarn = () => {
    toast.current.show({
      severity: "warn",
      summary: t("Toast.errorTitle"),
      detail: t("Toast.errorMsg"),
      life: 3000,
    });
  };

  return (
    <footer
      className="flex flex-column lg:flex-row justify-content-evenly"
      id="contact"
    >
      <Toast ref={toast} position="top-right" />
      <motion.form
        className="col-12 lg:col-7"
        variants={{
          visible: {
            y: 0,
            x: 0,
            transition: { type: "spring", stiffness: 120 },
          },
          hidden: { y: 100 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onSubmit={formik.handleSubmit}
      >
        <p className="text-center text-3xl lg:text-4xl xl:text-5xl mb-3">
          {t("Footer.contact")}
        </p>
        <div className="field col-12 md:col-11 lg:col-10 md:mx-auto">
          <span className="p-float-label">
            <InputText
              className={`w-full text-xl lg:text-2xl`}
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="name"
              className={classNames({ "p-error": isFormFieldValid("name") })}
            >
              {t("Footer.name")}
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>
        <div className="field col-12 md:col-11 lg:col-10 md:mx-auto">
          <span className="p-float-label">
            <InputText
              className={`w-full text-xl lg:text-2xl`}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="email"
              className={classNames({ "p-error": isFormFieldValid("email") })}
            >
              {t("Footer.email")}
            </label>
          </span>
          {getFormErrorMessage("email")}
        </div>
        <div className="field col-12 md:col-11 lg:col-10 md:mx-auto">
          <span className="p-float-label">
            <InputTextarea
              className={`w-full text-xl lg:text-2xl 
              ${classNames({ "p-invalid": isFormFieldValid("message") })} `}
              id="message"
              rows={3}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="message"
              className={classNames({ "p-error": isFormFieldValid("message") })}
            >
              {t("Footer.msg")}
            </label>
          </span>
          {getFormErrorMessage("message")}
        </div>
        <div className="field col-12 md:col-11 lg:col-10 md:mx-auto">
          <Button
            label={t("Footer.send")}
            className="w-full text-xl lg:text-2xl -mt-3 send-pointer"
            loading={loading}
            type="submit"
          />
        </div>
      </motion.form>
      <motion.div
        className="col-12 lg:col-4 lg:m-auto text-center text-2xl md:text-3xl lg:text-5xl"
        variants={{
          visible: {
            y: 0,
            x: 0,
            transition: { type: "spring", stiffness: 170 },
          },
          hidden: { y: 100 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="col-12 md:col-6 md:inline-block lg:col-12">
          Gonzalo Perez 2022
        </p>
        <div className="col-12 md:col-6 md:inline-block lg:col-12">
          <a href="https://github.com/GonPerez">
            <i className="pi pi-github text-3xl md:text-4xl lg:text-6xl col-3 text-primary jump" />
          </a>
          <a href="https://www.linkedin.com/in/gonzalo-perez-b00166215/">
            <i className="pi pi-linkedin text-3xl md:text-4xl  lg:text-6xl col-3 text-primary jump" />
          </a>
        </div>
        <p className="col-12 text-sm text-right font-italic">
          {t("Footer.info")}
        </p>
        <Dropdown
          value={lng}
          options={idiomas}
          onChange={handleChangeIdioma}
          placeholder={t("Footer.lang")}
          className="mt-4 md:mt-6"
        />
      </motion.div>
    </footer>
  );
};
