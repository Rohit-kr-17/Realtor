import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import ListingItem from "../Components/ListingItem";
import { useParams } from "react-router";
function Category() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(false);
	const [lastFetchedListing, setlastFetchedListing] = useState(null);
	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingRef = collection(db, "listings");
				const q = query(
					listingRef,
					where("type", "==", params.categoryName),
					orderBy("timestamp", "desc"),
					limit(8)
				);
				const querySnap = await getDocs(q);
				const lastVisible = [querySnap.docs.length - 1];
				setlastFetchedListing(lastVisible);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				console.log(error);
				toast.error("Couldn't fetch listing");
			}
		};
		fetchListings();
	}, [params.categoryName]);
	const onFetchMoreListings = async () => {
		try {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(4)
			);
			const querySnap = await getDocs(q);
			const lastVisible = [querySnap.docs.length - 1];
			setlastFetchedListing(lastVisible);
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings((prevState) => [...prevState, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error("Couldn't add listing");
		}
	};
	return (
		<div className="max-w-6xl mx-auto px-3">
			<h1 className="text-3xl text-center mt-6 font-bold mb-6">
				Places for {params.categoryName}
			</h1>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
								/>
							))}
						</ul>
					</main>
					{lastFetchedListing && (
						<div className="flex justify-center items-center ">
							<button
								className="bg-white py-1.5 text-gray-700 border border-gray-30 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
								onClick={onFetchMoreListings}
							>
								Load More
							</button>
						</div>
					)}
				</>
			) : (
				<p>There are no current offers</p>
			)}
		</div>
	);
}

export default Category;
