import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiBaseUrl } from "@/lib/api";

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

// Form schema for user information
const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().min(2, {
		message: "Email must be at least 2 characters.",
	}),
});

const UserSettings = () => {
	// Initialize form with default values
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
		},
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

	// Form submission handler for user information
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("User Info Submitted:", values);
		// Handle user info submission (e.g., send to API)
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
			className="flex-1 p-8"
			style={{
				backgroundImage: "url(../images/Background.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="flex flex-col bg-white bg-opacity-85 p-6 rounded-lg shadow-lg w-full mx-auto">
				<h2 className="text-2xl font-bold mb-6">User Settings</h2>

				{/* User Information Form */}
				<Form {...form}>
					<form
						className="flex flex-col"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<Card className="mb-4">
							<CardHeader>
								<CardTitle>User Information</CardTitle>
								<CardDescription>Update your personal details</CardDescription>
							</CardHeader>
							<CardContent>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="Enter your username" {...field} />
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Enter your email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter>
								<div className="mt-2 mx-auto">
									<Button type="submit" className="text-center">
										Save Settings
									</Button>
								</div>
							</CardFooter>
						</Card>
					</form>
				</Form>
				{/* Image Upload Section (outside of the form) */}
				<div className="flex justify-around text-center mb-6">
					<Card className="w-1/3">
						<CardHeader>
							<CardTitle>Avatar Upload</CardTitle>
							<CardDescription>Update your profile picture</CardDescription>
						</CardHeader>
						<CardContent>
							<div
								{...getRootProps()}
								className="border border-dashed border-black p-4 text-center cursor-pointer"
							>
								<input {...getInputProps()} />
								<p>Drag and drop or click to upload your profile picture.</p>
							</div>
						</CardContent>
					</Card>

					{/* Avatar Preview Section */}
					<Card className="w-1/3">
						<CardHeader>
							<CardTitle>Avatar Preview</CardTitle>
						</CardHeader>
						{previewUrl && (
							<>
								<CardContent>
									<Avatar>
										<AvatarImage
											src={previewUrl}
											alt="Profile Preview"
											className="w-[100px] h-[100px] mx-auto rounded-lg"
										/>
										<AvatarFallback>USER</AvatarFallback>
									</Avatar>
								</CardContent>
								<Button
									className="mb-3"
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
					className="mb-6 w-1/6 mx-auto text-center"
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
