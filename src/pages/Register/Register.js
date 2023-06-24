import React from "react";
import "./Register.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  email: yup
    .string()
    .required("Nedostaje email")
    .email("Email nije dobar")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i),
  password: yup
    .string()
    .required()
    .min(6)
    .max(50)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .max(50)
    .oneOf([yup.ref("password"), null], "Sifre se ne poklapaju"),

  fullName: yup
    .string()
    .required("Nedostaje fullName")
    .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/i),
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-wrapper">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
        }}
        onSubmit={(values, actions) => {
          fetch("https://js-course-server.onrender.com/user/signup", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.userId) {
                navigate("/login");
              }
            });
        }}
        validationSchema={registerSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (
        //     !values.error ||
        //     values.error.length < 10 ||
        //     values.error.length > 100
        //   ) {
        //     errors.email = "Neispravan email";
        //   }
        //   return errors;
        // }}
      >
        {({
          values, // formikov state
          errors, // errors = { email: 'Neispravan email' }
          touched, // touched = { email: true }
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <button
              onClick={() => {
                console.log(values, "values");
                console.log(errors, "errors");
                console.log(touched, "touched");
              }}
            >
              Console log states
            </button>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email"
              />
              <p className="error-message">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="password"
              />
              <p className="error-message">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="confirm your password"
              />
              <p className="error-message">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
            </div>
            <div>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                placeholder="fullName"
              />
              <p className="error-message">
                {errors.fullName && touched.fullName && errors.fullName}
              </p>
            </div>
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
