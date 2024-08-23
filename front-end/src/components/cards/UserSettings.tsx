import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiBaseUrl } from "@/lib/api";
import { useToast } from "../ui/use-toast";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
const phoneRegex = /^\+62\d{1,13}$/;

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters." })
		.optional()
		.refine((val) => val === undefined || val.trim() !== "", {
			message: "Name cannot be an empty string.",
		}),
	email: z
		.string()
		.min(2, { message: "Email must be at least 2 characters." })
		.email()
		.optional()
		.refine((val) => val === undefined || val.trim() !== "", {
			message: "Email cannot be an empty string.",
		}),
	password: z
		.string()
		.min(6, { message: "Your password must be at least 6 characters." })
		.regex(passwordRegex, {
			message: "Your password must have one uppercase letter and one number.",
		})
		.optional()
		.refine((val) => val === undefined || val.trim() !== "", {
			message: "Password cannot be an empty string.",
		}),
	address: z
		.string()
		.optional()
		.refine((val) => val === undefined || val.trim() !== "", {
			message: "Address cannot be an empty string.",
		}),
	phone_number: z
		.string()
		.regex(phoneRegex, { message: "Your phone number must start with +62." })
		.optional()
		.refine((val) => val === undefined || val.trim() !== "", {
			message: "Phone number cannot be an empty string.",
		}),
});

const UserSettings = () => {
	const { toast } = useToast();
	// Initialize form with default values
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	// State for image preview URL
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);

	// Dropzone configuration for handling image uploads
	const onDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		const profilePictureUrl = URL.createObjectURL(file);
		setPreviewUrl(profilePictureUrl);
		setImageFile(file);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			// Make a PUT request to the update user endpoint
			const response = await fetch(`${apiBaseUrl}/users/me`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
				credentials: "include",
			});

			// Handle the response
			if (response.ok) {
				const data = await response.json();
				console.log("User information updated successfully:", data);
				toast({
					title: "Update sukses!",
					className: "bg-green-500",
				});
			} else {
				const errorData = await response.json();
				console.error("Failed to update user information:", errorData);
			}
		} catch (error) {
			console.error("Error updating user information:", error);
		}
	};

	const handleImageUpload = async () => {
		if (!imageFile) {
			console.error("No image file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("image", imageFile);

		try {
			const response = await fetch(`${apiBaseUrl}/upload/`, {
				method: "POST",
				body: formData,
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				toast({
					title: "Upload sukses!",
					description: `Foto anda berhasil di upload`,
					className: "bg-green-500",
				});

				// Update the profile picture URL in the database
				const updateResponse = await fetch(
					`${apiBaseUrl}/users/me/profile-picture/`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ profile_picture_url: data.filename }),
						credentials: "include",
					}
				);

				if (updateResponse.ok) {
					const updateData = await updateResponse.json();
					console.log("Profile picture updated successfully:", updateData);
					// Handle the updated profile picture URL as needed
				} else {
					const updateError = await updateResponse.json();
					console.error("Failed to update profile picture:", updateError);
				}
			} else {
				const responseText = await response.text();
				console.error("Upload failed:", responseText);
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};
	return (
		<main
			className='flex-1 p-8'
			style={{
				backgroundImage: "url(../images/Background.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className='flex flex-col bg-white bg-opacity-85 p-6 rounded-lg shadow-lg w-full mx-auto'>
				<h2 className='text-2xl font-bold mb-6'>User Settings</h2>

				{/* User Information Form */}
				<Form {...form}>
					<form
						className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'
						onSubmit={() => {
							form.handleSubmit(handleSubmit);
						}}
					>
						<Card className='col-span-2'>
							<CardHeader>
								<CardTitle>User Information</CardTitle>
								<CardDescription>Update your personal details</CardDescription>
							</CardHeader>
							<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder='Enter your name' {...field} />
											</FormControl>
											<FormDescription>
												This is your public display name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type='email'
													placeholder='Enter your email'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your email address.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='Enter your password'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your password for login.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input placeholder='Enter your address' {...field} />
											</FormControl>
											<FormDescription>
												This is your current living address.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phone_number'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter your phone number'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your telephone number for contact.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter className='col-span-2 flex justify-center'>
								<Button type='submit'>Save Settings</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
				{/* Image Upload Section (outside of the form) */}
				<div className='flex justify-around text-center my-6'>
					<Card className='w-1/3'>
						<CardHeader>
							<CardTitle>Avatar Upload</CardTitle>
							<CardDescription>Update your profile picture</CardDescription>
						</CardHeader>
						<CardContent>
							<div
								{...getRootProps()}
								className='border border-dashed border-black p-4 text-center cursor-pointer'
							>
								<input {...getInputProps()} />
								<p>Drag and drop or click to upload your profile picture.</p>
							</div>
						</CardContent>
					</Card>

					{/* Avatar Preview Section */}
					<Card className='w-1/3'>
						<CardHeader>
							<CardTitle>Avatar Preview</CardTitle>
						</CardHeader>
						{previewUrl && (
							<>
								<CardContent>
									<Avatar>
										<AvatarImage
											src={previewUrl}
											alt='Profile Preview'
											className='w-[100px] h-[100px] mx-auto rounded-lg'
										/>
										<AvatarFallback>USER</AvatarFallback>
									</Avatar>
								</CardContent>
								<Button
									className='mb-3'
									onClick={() => {
										setPreviewUrl(null);
										setImageFile(null);
									}}
								>
									Clear Image
								</Button>
							</>
						)}
					</Card>
				</div>

				{/* Separate Submit Button for Image Upload */}
				<Button
					className='mb-6 w-1/6 mx-auto text-center'
					onClick={handleImageUpload}
					disabled={!imageFile}
				>
					Upload Image
				</Button>
			</div>
		</main>
	);
};

export default UserSettings;
