import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { db } from "../scripts/firebase.config";
// import { User } from "../data/types";
import { User } from "firebase/auth";




//GENERAL DATABASE ACTIONS

export async function addDocument(data: any, myCollection: string): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, myCollection), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

export async function updateDocument(myCollection: string, id: string, data: any): Promise<void> {

  try {
    const docRef = doc(db, myCollection, id);
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function checkIfDocumentExists(myCollection: string, id: string): Promise<boolean> {
  try {
    const docRef = doc(db, myCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking document:', error);
    throw error;
  }
}



export async function fetchDocument(myCollection: string, id: string): Promise<any> {
  try {
    const docRef = doc(db, myCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

export async function deleteDocument(myCollection: string, id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, myCollection, id));
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}


// COLLECTION ACTIONS

export async function fetchCollectionData(myCollection: string): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, myCollection));
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,          // Include document ID
      ...doc.data(),       // Spread the document data
    }));

    console.log('Data fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

// ✅ Check if Collection Has Documents
export const checkIfCollectionHasDocuments = async (myCollection: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, myCollection));
    const hasDocuments = !querySnapshot.empty;
    console.log(`Collection '${myCollection}' has documents: ${hasDocuments}`);
    return hasDocuments;
  } catch (error) {
    console.error("Error checking collection:", error);
    throw error;
  }
};

// ✅ Delete All Documents in a Collection
export const deleteAllDocuments = async (myCollection: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, myCollection));

    if (querySnapshot.empty) {
      console.log(`Collection '${myCollection}' is already empty.`);
      return;
    }

    const deletePromises = querySnapshot.docs.map((docItem) =>
      deleteDoc(doc(db, myCollection, docItem.id))
    );

    await Promise.all(deletePromises); // ✅ Delete all documents in parallel
    console.log(`✅ All documents in '${myCollection}' have been deleted.`);
  } catch (error) {
    console.error(`🚨 Error deleting documents from '${myCollection}':`, error);
    throw error;
  }
};


// USER ACTIONS

export async function fetchUserData(userId: string): Promise<Partial<User> | void> {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return data;
  }
  return undefined;
};
