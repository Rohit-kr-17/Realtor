import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function UseAuthStatus() {
	const [loggedIn, setLoggedin] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) setLoggedin(true);
			setCheckingStatus(false);
		});
	}, []);
	return { loggedIn, checkingStatus };
}

export { UseAuthStatus };
