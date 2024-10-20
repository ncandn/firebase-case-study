/**
 * Builds a Firestore query based on provided parameters.
 * @param {FirebaseFirestore.CollectionReference} collection - The Firestore collection to query.
 * @param {any} query - The query parameters to apply. For the "manager" field, it will convert the value to a document reference.
 * @return {Promise<FirebaseFirestore.Query>} - A promise that resolves to a Firestore query with the applied conditions.
 */
export async function buildQuery(collection: any, query: any): Promise<FirebaseFirestore.Query> {
  let firestoreQuery = collection;
  for (const i in query) {
    if (i as string === "manager") {
      const managerRef = collection.doc(query[i] as string);
      firestoreQuery = firestoreQuery.where(i as string, "==", managerRef);
      continue;
    }

    firestoreQuery = firestoreQuery.where(i as string, "==", query[i] as string);
  }

  return firestoreQuery;
}
