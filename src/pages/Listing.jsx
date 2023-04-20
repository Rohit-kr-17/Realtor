import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from "swiper";
import "swiper/css/bundle";

function Listing() {
	const params = useParams();
	const [listing, SetLisitng] = useState(null);
	const [loading, setLoading] = useState(true);
	SwiperCore.use([Autoplay, Navigation, Pagination]);
	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				SetLisitng(docSnap.data());

				setLoading(false);
				console.log(listing);
			}
		};
		fetchListing();
	}, [params.listingId]);
	if (loading) {
		return <Spinner />;
	}
	return (
		<main>
			<Swiper
				slidePerView={1}
				navigation
				pagination={{ type: "progressbar" }}
				effect="fade"
				modules={[EffectFade]}
				autoplay={{ delay: 3000 }}
			>
				{listing.imgUrls.map((url, index) => {
					return (
						<SwiperSlide key={index}>
							<div
								className="relative w-full overflow-hidden h-[300px]"
								style={{
									background: `url(${listing.imgUrls[index]}) center no-repeat`,
									backgroundSize: "cover",
								}}
							></div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</main>
	);
}

export default Listing;
