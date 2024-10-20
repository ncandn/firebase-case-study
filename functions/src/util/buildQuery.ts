export async function buildQuery(collection: any, query: any): Promise<FirebaseFirestore.Query> {
  let firestoreQuery = collection;
  for (let i in query) {
    if (i as string === "manager") {
      const managerRef = collection.doc(query[i] as string);
      firestoreQuery = firestoreQuery.where(i as string, "==", managerRef);
      continue;
    }

    firestoreQuery = firestoreQuery.where(i as string, "==", query[i] as string);
  }

  return firestoreQuery;
}
