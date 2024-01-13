import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./WelcomePage.css";
import { Link } from "react-router-dom";
import "./Login";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";

const WelcomePage = () => {
	const validationSchema = Yup.object().shape({
		fullname: Yup.string().required("Fullname is required"),
		username: Yup.string()
			.required("Username is required")
			.min(6, "Username must be at least 6 characters")
			.max(20, "Username must not exceed 20 characters"),
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters")
			.max(40, "Password must not exceed 40 characters"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
		acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	return (
		<div className="bg-container flex flex-col md:flex-col lg:flex-row justify-center items-center h-screen w-screen mt-52 lg:mt-32">
			<div
				className="welcome-image bg-blue-dark h-full w-full min-h-[500px] lg:w-1/2 relative"
				style={{
					height: "100%", // Set a fixed height
					backgroundImage: `url(../images/dogbg.png)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backdropFilter: "blur(5px)",
				}}
			>
				<div className="logo-header flex flex-col justify-start items-center md:items-start mt-4">
					<div className="welcome-logo flex flex-row items-start">
						<h1 className="welcome-title font-raleway color-purple text-2xl md:text-4xl text-white lg:mt-24 lg:ml-24">
							Welcome to
						</h1>
						<img
							src="../images/logo.svg"
							alt="logo"
							className="dog-logo w-40 h-30 md:w-60 md:h-45 lg:mt-12"
						/>
					</div>
				</div>
			</div>

			<div className="register-form flex flex-col justify-center items-center w-full lg:w-1/2">
				<div className="mb-6">
					<p className="text-2xl font-bold m-4">Sign Up</p>
					<p>Adopt a pet right now!</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							name="fullname"
							type="text"
							{...register("fullname")}
							className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
						/>
						<div className="invalid-feedback">{errors.fullname?.message}</div>
					</div>

					<div className="form-group">
						<label>Username</label>
						<input
							name="username"
							type="text"
							{...register("username")}
							className={`form-control ${errors.username ? "is-invalid" : ""}`}
						/>
						<div className="invalid-feedback">{errors.username?.message}</div>
					</div>

					<div className="form-group">
						<label>Email</label>
						<input
							name="email"
							type="text"
							{...register("email")}
							className={`form-control ${errors.email ? "is-invalid" : ""}`}
						/>
						<div className="invalid-feedback">{errors.email?.message}</div>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input
							name="password"
							type="password"
							{...register("password")}
							className={`form-control ${errors.password ? "is-invalid" : ""}`}
						/>
						<div className="invalid-feedback">{errors.password?.message}</div>
					</div>

					<div className="form-group">
						<label>Confirm Password</label>
						<input
							name="confirmPassword"
							type="password"
							{...register("confirmPassword")}
							className={`form-control ${
								errors.confirmPassword ? "is-invalid" : ""
							}`}
						/>
						<div className="invalid-feedback">
							{errors.confirmPassword?.message}
						</div>
					</div>

					<div className="form-group form-check flex flex-row items-center">
						<input
							name="acceptTerms"
							type="checkbox"
							{...register("acceptTerms")}
							className={`form-check-input ${
								errors.acceptTerms ? "is-invalid" : ""
							}`}
						/>
						<label htmlFor="acceptTerms" className="form-check-label ml-2">
							I have read and agree to the Terms
							<div className="invalid-feedback">
								{errors.acceptTerms?.message}
							</div>
						</label>
					</div>

					<div className="form-group">
						<button
							type="submit"
							className="btn btn-primary bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 px-8 py-3 text-lg"
						>
							Register
						</button>
					</div>
				</form>
				<div className="login-choice flex flex-col justify-center items-center w-full lg:w-1/2">
					<p>Already have an account?</p>
					<Link to="/Login" className="flex items-center hover:text-darkpurple">
						Login here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;