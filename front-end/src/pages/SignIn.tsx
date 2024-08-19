import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { apiBaseUrl } from "@/lib/api";
import {
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
	email: Yup.string()
		.required("Data tidak boleh kosong")
		.test(
			"valid-email",
			"Email harus mengandung '@', contoh tobias@gmail.com",
			(value) => value !== undefined && value.includes("@")
		)
		.email("Email tidak valid"),
	password: Yup.string()
		.required("Data tidak boleh kosong")
		.min(6, "Kata sandi harus minimal 6 karakter")
		.matches(/[a-z]/, "Kata sandi harus mengandung huruf kecil")
		.matches(/[A-Z]/, "Kata sandi harus mengandung huruf besar")
		.matches(/[0-9]/, "Kata sandi harus mengandung angka"),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { toast } = useToast();
	const navigate = useNavigate();


	return (
		<div
			className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url('https://images.unsplash.com/photo-1720420866056-07fe15991f16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ5fHxhZ3JpY3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D`)`,
			}}
		>
			<div
				className="relative flex flex-col items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-80 shadow-lg rounded-lg border border-gray-300 mx-4 md:mx-16"
				style={{ position: "absolute", top: "20px", right: "20px" }}
			>
				<div className="relative z-10 w-full">
					<div className="flex justify-between items-center mb-8">
						{" "}
						{}
						<h1 className="text-2xl font-semibold text-gray-800">Masuk</h1>
						<Link to="/signup" className="text-sm underline text-green-600">
							Daftar
						</Link>
					</div>
					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								const response = await fetch(`${apiBaseUrl}/login`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										email: values.email,
										password: values.password,
									}),
									credentials: "include",
								});

								if (!response.ok) {
									const errorData = await response.json();
									throw new Error(errorData.message || "Login failed");
								}

								const data = await response.json();
								console.log("Login successful:", data);
								toast({
									title: "Log in sukses!",
									description: `Selamat datang kembali`,
									className: "bg-green-500",
								});
								setTimeout(() => {
									navigate("/");
								}, 3000); // Adjust the delay as needed (3000ms = 3 seconds)

								// Handle successful login, e.g., redirect, save token, etc.
							} catch (error: any) {
								console.error("Error during login:", error);
								toast({
									title: "Login failed",
									description: error.message,
									variant: "destructive",
								});
							} finally {
								setSubmitting(false);
							}
						}}
					>
						{({ setFieldValue }) => (
							<Form className="w-full">
								<div className="mb-4">
									<Label htmlFor="email" className="block mb-2 text-gray-700">
										Email/ Nomor handphone
									</Label>
									<div className="relative">
										<AiOutlineMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
										<Field
											id="email"
											name="email"
											type="text"
											placeholder="Masukkan email/ nomor handphone"
											className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-white"
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>
								</div>
								<div className="mb-4">
									<div className="flex justify-between mb-2">
										<Label htmlFor="password" className="block text-gray-700">
											Kata Sandi
										</Label>
										<Link
											to="/forgot-password"
											className="text-sm text-green-600 underline"
										>
											Lupa kata sandi?
										</Link>
									</div>
									<div className="relative">
										<AiOutlineLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
										<Field
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											placeholder="Masukkan kata sandi"
											className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-white"
										/>
										<button
											type="button"
											className="absolute right-3 top-3 text-gray-400"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<AiOutlineEye className="h-5 w-5" />
											) : (
												<AiOutlineEyeInvisible className="h-5 w-5" />
											)}
										</button>
										<ErrorMessage
											name="password"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>
								</div>
								<Button
									type="submit"
									className="w-full py-2 bg-green-600 text-white rounded-md mb-4 transition-transform transform active:scale-95 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
								>
									Masuk
								</Button>
								<div className="text-center text-gray-600 my-4">atau</div>
								<Button
									variant="outline"
									className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center transition-transform transform active:scale-95 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
								>
									<FcGoogle className="inline-block h-5 w-5 text-blue-500 mr-2" />{" "}
									Masuk dengan Google
								</Button>
								<div className="mt-6 text-center text-sm text-gray-700">
									Kembali ke{" "}
									<Link to="/" className="underline text-green-600">
										Beranda
									</Link>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);

}
