import { db } from '../firebase'; // This will be updated once firebase is initialized
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchWords = async (mode: string) => {
  try {
    const wordsRef = collection(db, 'words');
    const q = query(wordsRef, where('mode', '==', mode));
    const querySnapshot = await getDocs(q);
    const words = querySnapshot.docs.map(doc => doc.data().word);
    return words;
  } catch (error) {
    console.error('Error fetching words:', error);
    return [];
  }
};
