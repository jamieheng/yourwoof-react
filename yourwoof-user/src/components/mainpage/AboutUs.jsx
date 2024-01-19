import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";

import Footer from "./Footer";
export default function AboutUs() {
	return (
		<div className="relative mt-40 font-raleway">
			<div className="relative">
				<div className="absolute h-full w-full bg-black opacity-30"></div>
				<img
					className="h-full w-full object-cover object-center"
					src="../images/aboutusdog.jpg"
					alt="About us dog"
				/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
					<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">ABOUT YOURWOOF</h1>
					<p className="text-xl font-raleway">Learn more about our story and mission.</p>
				</div>
			</div>
			<p className="p-6 mt-4 text-3xl font-bold text-center">WHAT DO WE DO</p>
			<Typography
				variant="lead"
				className=" w-3/4 text-center mx-auto justify-center pb-8 font-raleway"
		
			>
				At the core of our mission lies a passionate commitment to enhancing the
				lives of stray animals in Cambodia. Stray animals face unique
				challenges, navigating the streets and urban environments without a
				stable home or reliable source of care. Our primary objective is to
				alleviate their hardships and create a positive impact on their
				well-being.
			</Typography>

			<div className="work-list flex flex-wrap justify-center bg-light-purple">
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
							<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center font-raleway">
									<Typography variant="h5" color="blue-gray">
										
										<p className="font-raleway">Rescue and Rehabilitation</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-full sm:w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								When we rescue stray animals, our first priority is their
								immediate well-being. We provide them with necessary medical
								attention, nutrition, and a safe environment to recover. Our
								team of veterinary professionals ensures that each animal is in
								optimal health before beginning the process of finding them a
								new home.
							</Typography>
						</CardBody>
					</Card>
				</div>

				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
							<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>


								<div className="flex items-center justify-center font-raleway">
									<Typography variant="h5" color="blue-gray">
										
										<p className="font-raleway">Collaboration with Adoption Agencies</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								Collaborating with adoption agencies and animal welfare
								organizations expands our reach and increases the likelihood of
								finding suitable homes for the stray animals. These partnerships
								enable us to tap into a larger pool of potential adopters and
								enhance the overall success of our adoption efforts.
							</Typography>
						</CardBody>
					</Card>
				</div>
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
								<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center font-raleway">
									<Typography
										variant="h5"
										color="blue-gray"
										className="text-center sm:text-left"
									>
										
										<p className="font-raleway">Utilizing Social Media and Online Platforms</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-ralway"
								style={{ letterSpacing: "1.5px" }}
							>
								In the digital age, social media plays a crucial role in
								connecting lost animals with their owners. We leverage various
								online platforms to share pictures, stories, and information
								about the stray animals under our care. This not only reaches a
								wide audience but also facilitates quick communication and
								collaboration.
							</Typography>
						</CardBody>
					</Card>
				</div>
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
								<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center ">
									<Typography variant="h5" color="blue-gray">
										<p className="font-raleway">	Adoption Events and Outreach Programs</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								We organize adoption events and outreach programs to showcase
								the lovable qualities of our rescued animals. These events serve
								as opportunities for potential adopters to meet and interact
								with the animals in a friendly and relaxed environment. It also
								allows us to share valuable information about responsible pet
								ownership.
							</Typography>
						</CardBody>
					</Card>
				</div>
			</div>

			<div className="p-6 mt-4 text-3xl font-bold text-center">
				MEET THE YOURWOOF TEAM
			</div>
			<div className="flex flex-col items-center lg:flex-row lg:space-x-20 justify-center">
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
							src="https://i.pinimg.com/736x/c6/2e/b9/c62eb9236eaf179f3987cb062aa1bff9.jpg"
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
							Taehyung Kim
						</Typography>
						<Typography color="blue-gray" className="font-medium" textGradient>
							CEO / Co-Founder
						</Typography>
					</CardBody>
					<CardFooter className="flex justify-center gap-7 pt-2">
						<Typography
							as="a"
							href="#"
							className="opacity-80 transition-opacity hover:opacity-100"
						>
							<svg
								className="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
									clip-rule="evenodd"
								/>
							</svg>
						</Typography>
						<Typography
							as="a"
							href="#"
							className="opacity-80 transition-opacity hover:opacity-100"
						>
							<svg
								className="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
									clip-rule="evenodd"
								/>
							</svg>
						</Typography>
					</CardFooter>
				</Card>
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
							src="https://preview.redd.it/230312-wonwoo-instagram-update-v0-2oaljj9bgbna1.jpg?width=640&crop=smart&auto=webp&s=230d4a9be71243065f3673443d69d22f9ece7fce"
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
							Wonwoo Jeon
						</Typography>
						<Typography color="blue-gray" className="font-medium" textGradient>
							Chairman
						</Typography>
					</CardBody>
					<CardFooter className="flex justify-center gap-7 pt-2">
						<Typography
							as="a"
							href="#"
							className="opacity-80 transition-opacity hover:opacity-100"
						>
							<svg
								className="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
									clip-rule="evenodd"
								/>
							</svg>
						</Typography>
						<Typography
							as="a"
							href="#"
							className="opacity-80 transition-opacity hover:opacity-100"
						>
							<svg
								className="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
									clip-rule="evenodd"
								/>
							</svg>
						</Typography>
					</CardFooter>
				</Card>
			</div>

			<div className="flex justify-center items-center mx-auto"></div>
			{/* footer */}
			<Footer/>
		</div>
	);
}
