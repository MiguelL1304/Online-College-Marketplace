import React from "react";
import { firestoreDB } from "../../../../Firebase/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, getDoc, Timestamp } from "firebase/firestore";

export const addToBag = async (userEmail, itemDetails) => {

    // referencing SUBCOLLECTION "bag" under user's document in "profile" collection
    const bagRef = collection(firestoreDB, "profile", userEmail, "bag");

    // itemRef points to specific doc in user's "bag" subcollection corresponding to the item being added
    const itemRef = doc(bagRef, itemDetails.id);

    try {
        await setDoc(itemRef, {
            ...itemDetails,
            addedAt: Timestamp.fromDate(new Date()),
        });
        console.log("ITEM ADDED");
    } catch (error) {
        console.error("Error adding item to bag: ", error);
    }
};


export const removeFromBag = async (userEmail, itemID) => {
    const itemRef = doc(firestoreDB, "profile", userEmail, "bag", itemID);
    try {
        await deleteDoc(itemRef);
        console.log("ITEM REMOVED");
    } catch (error) {
        console.error("Problem removing item from bag: ", error);
    }
}

const fetchSellerDetails = async (sellerEmail) => {
    const sellerDocRef = doc(firestoreDB, "profile", sellerEmail);
    const sellerDocSnap = await getDoc(sellerDocRef);
    if (sellerDocSnap.exists()) {
        return sellerDocSnap.data();
    } else {
        console.error("Seller profile NOT FOUND for: ", sellerEmail);
        return null;
    }
}

export const getBagItems = async (userEmail) => {
    const bagRef = collection(firestoreDB, "profile", userEmail, "bag");
    try {
        const snapshot = await getDocs(bagRef);
        const items = snapshot.docs.map(async(doc) => {
            const data = doc.data();
            const sellerEmail = doc.id.split("_")[0];
            const sellerDetails = await fetchSellerDetails(sellerEmail);

            return {
                id: doc.id,
                sellerEmail,
                sellerImg: sellerDetails?.profilePic,
                sellerFirstName: sellerDetails?.firstName,
                sellerLastName: sellerDetails?.lastName,
                ...data
            }
        });

        return Promise.all(items);

    } catch (error) {
        console.error("CAN'T FETCH ITEMS :(", error);
        return [];
    }
}
