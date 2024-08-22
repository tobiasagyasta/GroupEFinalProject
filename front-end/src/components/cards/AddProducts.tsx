import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCurrentUser, apiBaseUrl } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useDropzone } from "react-dropzone";
import { User } from "@/lib/types";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Nama produk harus lebih dari 2 karakter." }),
	price: z.number().positive({ message: "Harga harus lebih dari 0." }),
	description: z.string().optional(),
	unit: z.string().optional(),
	quantity: z.number().positive({ message: "Jumlah harus lebih dari 0." }),
	category: z.string().nonempty({ message: "Kategori tidak boleh kosong." }),
});

const AddProduct = () => {
	const { toast } = useToast();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [sellerId, setSellerId] = useState<number | null>(null);
	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			price: 0,
			description: "",
			unit: "kg",
			quantity: 1,
			category: "", // Default value
		},
	});

	const onDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		setPreviewUrl(URL.createObjectURL(file));
		setImageFile(file);
		setImageName(file.name);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("Form Values:", values); // Debugging

		if (user) {
			// Fetch the seller ID
			const response = await fetch(
				`${apiBaseUrl}/users/get-seller-id/${user.id}`
			);
			const data = await response.json();

			if (response.ok) {
				setSellerId(data.seller_id);
			} else {
				console.error("Failed to fetch seller ID:", data.error);
			}
		}

		const productData = {
			seller_id: sellerId,
			name: values.name,
			price: values.price.toString(),
			description: values.description || "",
			unit: values.unit || "",
			quantity: values.quantity.toString(),
			category: values.category,
			product_picture_url: imageName || "",
		};
		if (sellerId !== null) {
			try {
				const response = await fetch(`${apiBaseUrl}/product/post`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(productData),
					credentials: "include",
				});

				if (response.ok) {
					const data = await response.json();
					toast({
						title: "Product Created Successfully",
						description: `Your product "${data.name}" has been added.`,
						className: "bg-green-500",
					});
				} else {
					const error = await response.text();
					console.error("Failed to create product:", error);
					toast({
						title: "Error",
						description: "Failed to create product.",
						className: "bg-red-500",
					});
				}
			} catch (error) {
				console.error("Error creating product:", error);
				toast({
					title: "Error",
					description: "There was an error creating the product.",
					className: "bg-red-500",
				});
			}
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
			const response = await fetch(`${apiBaseUrl}/upload/products`, {
				method: "POST",
				body: formData,
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				toast({
					title: "Upload Successful!",
					description: `Your image has been uploaded successfully.`,
					className: "bg-green-500",
				});
			} else {
				const responseText = await response.text();
				console.error("Upload failed:", responseText);
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<main className='p-8 w-full'>
			<div className='flex flex-col bg-white bg-opacity-85 p-6 rounded-lg shadow-lg w-full mx-auto'>
				<h2 className='text-2xl font-bold mb-6'>Add New Product</h2>

				<Form {...form}>
					<form
						className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<Card className='col-span-2'>
							<CardHeader>
								<CardTitle>Product Information</CardTitle>
								<CardDescription>
									Enter the details for your new product
								</CardDescription>
							</CardHeader>
							<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Name</FormLabel>
											<FormControl>
												<Input placeholder='Enter product name' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter product price'
													{...field}
													value={field.value ?? ""}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter product description'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='unit'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Unit</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter product unit (e.g., kg)'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='quantity'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter product quantity'
													{...field}
													value={field.value ?? ""}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter product category'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter className='col-span-2 flex justify-center'>
								<Button type='submit'>Create Product</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>

				<div className='flex justify-around text-center my-6'>
					<Card className='w-1/3'>
						<CardHeader>
							<CardTitle>Image Upload</CardTitle>
							<CardDescription>Upload a product image</CardDescription>
						</CardHeader>
						<CardContent>
							<div
								{...getRootProps()}
								className='border border-dashed p-4 cursor-pointer'
							>
								<input {...getInputProps()} />
								<p>Drag and drop or click to select an image.</p>
							</div>
						</CardContent>
					</Card>

					<Card className='w-1/3'>
						<CardHeader>
							<CardTitle>Image Preview</CardTitle>
						</CardHeader>
						{previewUrl && (
							<>
								<CardContent>
									<Avatar>
										<AvatarImage src={previewUrl} alt='Product Preview' />
										<AvatarFallback>Preview</AvatarFallback>
									</Avatar>
								</CardContent>
								<Button
									className='mb-3'
									onClick={() => {
										setPreviewUrl(null);
										setImageFile(null);
										setImageName(null);
									}}
								>
									Clear Image
								</Button>
							</>
						)}
					</Card>
				</div>

				<Button
					className='mb-6 w-1/6 mx-auto'
					onClick={handleImageUpload}
					disabled={!imageFile}
				>
					Upload Image
				</Button>
			</div>
		</main>
	);
};

export default AddProduct;
