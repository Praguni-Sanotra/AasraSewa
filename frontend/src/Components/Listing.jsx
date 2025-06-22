import React from "react";
import { motion } from "framer-motion";
import "../Styles/Listing.css";

const listings = [
	{
		title: "Neon City Loft",
		location: "Mumbai",
		price: "₹2,500/night",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Skyline Capsule",
		location: "Bangalore",
		price: "₹1,800/night",
		image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Futuristic Suite",
		location: "Delhi",
		price: "₹3,200/night",
		image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
	},
];

export default function Listings() {
	return (
		<section className="listings">
			<h2>Featured Stays</h2>
			<div className="cards">
				{listings.map((listing, idx) => (
					<motion.div
						className="card"
						key={idx}
						whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #00ffe799" }}
					>
						<img src={listing.image} alt={listing.title} />
						<div className="info">
							<h3>{listing.title}</h3>
							<span>{listing.location}</span>
							<p>{listing.price}</p>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}