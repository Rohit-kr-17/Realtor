import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../Components/ListingItem";

function Home() {
	//Offers
	const [offerListings, setOfferListings] = useState(null);
	useEffect(() => {
		const fetchListings = async () => {
			try {
				//get referance
				const listingsRef = collection(db, "listings");
				//create query
				const q = query(
					listingsRef,
					where("offer", "==", true),
					orderBy("timestamp", "desc"),
					limit(4)
				);
				//execute the quey
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setOfferListings(listings);
				console.log(listings);
			} catch (error) {
				console.log(error);
			}
		};
		fetchListings();
	}, []);
	//Places for Rent
	const [rentListings, setRentListings] = useState(null);
	useEffect(() => {
		const fetchListings = async () => {
			try {
				//get referance
				const listingsRef = collection(db, "listings");
				//create query
				const q = query(
					listingsRef,
					where("type", "==", "rent"),
					orderBy("timestamp", "desc"),
					limit(4)
				);
				//execute the quey
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setRentListings(listings);
				console.log(listings);
			} catch (error) {
				console.log(error);
			}
		};
		fetchListings();
	}, []);
	//Places for sell
	const [saleListings, setSaleListings] = useState(null);
	useEffect(() => {
		const fetchListings = async () => {
			try {
				//get referance
				const listingsRef = collection(db, "listings");
				//create query
				const q = query(
					listingsRef,
					where("type", "==", "sale"),
					orderBy("timestamp", "desc"),
					limit(4)
				);
				//execute the quey
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setSaleListings(listings);
				console.log(listings);
			} catch (error) {
				console.log(error);
			}
		};
		fetchListings();
	}, []);
	return (
		<div>
			<Slider />
			<div className="max-w-6xl mx-auto pt-4 space-y-6">
				{offerListings && offerListings.length > 0 && (
					<div className="m-2 mb-4 ">
						<h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
						<Link to="/offers">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more offers
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{offerListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div className="m-2 mb-4 ">
						<h2 className="px-3 text-2xl mt-6 font-semibold">
							Places for Rent
						</h2>
						<Link to="/category/rent">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more places for rent
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{rentListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
				{saleListings && saleListings.length > 0 && (
					<div className="m-2 mb-4 ">
						<h2 className="px-3 text-2xl mt-6 font-semibold">
							Places for Sale
						</h2>
						<Link to="/category/sale">
							<p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
								Show more places for Sale
							</p>
						</Link>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{saleListings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
