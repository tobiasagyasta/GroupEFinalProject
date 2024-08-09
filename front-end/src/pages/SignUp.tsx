import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaPencilAlt,
  FaStore,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsArrowRightShort } from "react-icons/bs";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  accountType: string;
  storeName: string;
  bio: string;
  address: string;
}

export default function MultiStepSignUp() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "+62",
    password: "",
    accountType: "",
    storeName: "",
    bio: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/.test(password);

  const sanitizeInput = (value: string) => value.replace(/\s+/g, "");

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    // Validasi inputan
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedPassword = sanitizeInput(formData.password);
    const sanitizedPhone = sanitizeInput(formData.phone);

    // Step 1: Validation for Email
    if (!sanitizedEmail) {
      newErrors.email = "Email tidak boleh kosong.";
      valid = false;
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = "Format email tidak valid. Contoh: dimas@gmail.com";
      valid = false;
    } else if (formData.email !== sanitizedEmail) {
      newErrors.email = "Email tidak boleh mengandung spasi.";
      valid = false;
    }

    // Step 2: Validation for Full Name, Phone, Password, and Address
    if (step === 2) {
      if (!formData.fullName) {
        newErrors.fullName = "Nama lengkap tidak boleh kosong.";
        valid = false;
      }

      if (!sanitizedPassword) {
        newErrors.password = "Kata Sandi tidak boleh kosong.";
        valid = false;
      } else if (!validatePassword(sanitizedPassword)) {
        newErrors.password =
          "Kata Sandi harus berisi huruf besar, huruf kecil, dan angka, serta antara 6-8 karakter.";
        valid = false;
      }

      if (!sanitizedPhone) {
        newErrors.phone = "Nomor handphone tidak boleh kosong.";
        valid = false;
      } else if (!/^\+62\d{1,13}$/.test(sanitizedPhone)) {
        newErrors.phone =
          "Nomor handphone harus dimulai dengan +62 dan hanya boleh berisi angka.";
        valid = false;
      }

      if (!formData.address) {
        newErrors.address = "Alamat tidak boleh kosong.";
        valid = false;
      }
    }

    // Step 3: Validation for Store Name and Bio
    if (step === 3 && formData.accountType === "Penjual") {
      if (!formData.storeName) {
        newErrors.storeName = "Nama toko tidak boleh kosong.";
        valid = false;
      }

      if (!formData.bio) {
        newErrors.bio = "Deskripsi toko tidak boleh kosong.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      if (step === 2 && formData.accountType === "Pembeli") {
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    // Hapus spasi pada email
    if (id === "email") {
      const sanitizedValue = value.replace(/\s+/g, "");
      setFormData({ ...formData, [id]: sanitizedValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, accountType: value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Selamat! Akun berhasil dibuat.");
      navigate("/signin");
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\+62\d{0,13}$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="relative w-full max-w-xl mx-auto p-6">
        <div className="absolute inset-0 bg-black opacity-30 z-[-1]"></div>
        <Card className="bg-white bg-opacity-50 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg p-6">
          {step > 1 && (
            <div className="flex justify-between items-center mb-4">
              <div
                className={`text-center py-2 ${
                  step >= 1 ? "text-black" : "text-gray-400"
                }`}
              >
                Daftar
              </div>
              <BsArrowRightShort className="text-gray-400 mx-2 text-xl" />
              <div
                className={`text-center py-2 ${
                  step >= 2 ? "text-black" : "text-gray-400"
                }`}
              >
                Detail Akun
              </div>
              {formData.accountType === "Penjual" && (
                <>
                  <BsArrowRightShort className="text-gray-400 mx-2 text-xl" />
                  <div
                    className={`text-center py-2 ${
                      step >= 3 ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Selesaikan Pendaftaran
                  </div>
                </>
              )}
            </div>
          )}
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-black">
                {step === 1 && "Daftar"}
                {step === 2 && "Detail Akun"}
                {step === 3 && "Selesaikan Pendaftaran"}
              </CardTitle>
              {step === 1 && (
                <Link
                  to="/signin"
                  className="text-green-600 underline hover:text-green-800 transition-all duration-300"
                >
                  Masuk
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="grid gap-4">
                <div className="mt-2">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-green-600 text-black"
                  >
                    <FcGoogle />
                    Daftar dengan Google
                  </Button>
                </div>
                <div className="text-center text-black my-2">atau</div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-black">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-green-600"
                    />
                    <FaEnvelope className="absolute top-3 right-3 text-gray-400" />
                  </div>
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="accountType" className="text-black">
                    Tipe Akun
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant={
                        formData.accountType === "Penjual"
                          ? "secondary"
                          : "outline"
                      }
                      onClick={() => handleSelectChange("Penjual")}
                      className={`flex items-center gap-2 border-green-600 ${
                        formData.accountType === "Penjual"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      <FaStore />
                      Penjual
                    </Button>
                    <Button
                      variant={
                        formData.accountType === "Pembeli"
                          ? "secondary"
                          : "outline"
                      }
                      onClick={() => handleSelectChange("Pembeli")}
                      className={`flex items-center gap-2 border-green-600 ${
                        formData.accountType === "Pembeli"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      <FaUser />
                      Pembeli
                    </Button>
                  </div>
                </div>
                <Button
                  variant="default"
                  onClick={handleNext}
                  className="w-full bg-green-600 text-white mt-4"
                >
                  Setuju & Daftar
                </Button>
                <div className="text-center text-gray-600 mt-4">
                  <div className="text-xs">
                    <span className="text-black">
                      Dengan mendaftar, saya menyetujui{" "}
                      <a href="#" className="text-green-700 underline">
                        Syarat & Ketentuan
                      </a>{" "}
                      serta{" "}
                      <a href="#" className="text-green-800 underline">
                        Kebijakan Privasi HarvestHub
                      </a>
                    </span>
                  </div>
                </div>
                <div className="text-center text-gray-600 mt-4">
                  <Link
                    to="/"
                    className="text-green-800 underline hover:text-green-700 transition-all duration-300"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName" className="text-black">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="border-green-600"
                    />
                    <FaPencilAlt className="absolute top-3 right-3 text-gray-400" />
                  </div>
                  {errors.fullName && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-black">
                    Nomor Handphone
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Masukkan nomor handphone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className="border-green-600"
                    />
                    <FaPhone className="absolute top-3 right-3 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-black">
                    Kata Sandi
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="border-green-600"
                    />
                    <div
                      className="absolute top-3 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className="text-black">
                    Alamat Lengkap
                  </Label>
                  <div className="relative">
                    <textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="border-green-600 w-full p-2"
                    />
                    <FaHome className="absolute top-3 right-3 text-gray-400" />
                  </div>
                  {errors.address && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="default"
                    onClick={handlePrevious}
                    className="w-1/2 bg-gray-600 text-white"
                  >
                    Kembali
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleNext}
                    className="w-1/2 bg-green-600 text-white"
                  >
                    {formData.accountType === "Pembeli"
                      ? "Daftar Sekarang"
                      : "Berikutnya"}
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storeName" className="text-black">
                    Nama Toko
                  </Label>
                  <Input
                    id="storeName"
                    type="text"
                    placeholder="Masukkan nama toko"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="border-green-600"
                  />
                  {errors.storeName && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.storeName}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio" className="text-black">
                    Deskripsi Toko
                  </Label>
                  <textarea
                    id="bio"
                    placeholder="Masukkan deskripsi toko"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="border-green-600 w-full p-2"
                  />
                  {errors.bio && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.bio}
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="default"
                    onClick={handlePrevious}
                    className="w-1/2 bg-gray-600 text-white"
                  >
                    Kembali
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    className="w-1/2 bg-green-600 text-white"
                  >
                    Daftar Sekarang
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
