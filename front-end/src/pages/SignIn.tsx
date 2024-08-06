import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function SignIn() {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="email@gmail.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input id="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
						<Button type="submit" className="w-full">
							Login Github
						</Button>
					</div>
					<div className="flex flex-col text-center">
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link to="#" className="underline">
								Sign up
							</Link>
						</div>
						<Link to="/" className="underline text-blue-600">
							Back to Home
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<img
					src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?"
					width="1920"
					height="1080"
					className="h-full w-full object-cover "
				/>
			</div>
		</div>
	);
}
