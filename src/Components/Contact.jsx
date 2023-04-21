import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
function Contact({ userRef, listing }) {
	const [Landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState("");
	useEffect(() => {
		const getLandlord = async () => {
			const docRef = doc(db, "users", userRef);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setLandlord(docSnap.data());
			} else {
				toast.error("Couldn't get landlord data");
			}
		};
		getLandlord();
	}, [userRef]);
	const onChange = (e) => {
		setMessage(e.target.value);
	};
	return (
		<>
			{Landlord !== null && (
				<div className="flex flex-col w-full ">
					<p className="mt-6">
						Contact {Landlord.name} for the {listing.name.toLowerCase()}
					</p>
					<div className="mt-3 mb-6">
						<textarea
							name="message"
							id="message"
							cols=""
							rows="2"
							value={message}
							onChange={onChange}
							className="w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 ounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600"
						></textarea>
					</div>
					<a
						href={`mailto:${Landlord.email}?SUbject=${listing.name}&body = ${message}`}
						className=""
					>
						<button className="mb-6 px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center">
							Send Message
						</button>
					</a>
				</div>
			)}
		</>
	);
}

export default Contact;
