// import { useState, useEffect, useCallback } from "react";
// import users from "../api/users";
// import axios from "axios";

// function useFetch(query) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [list, setList] = useState([]);
//   const access_token = localStorage.getItem("access_token");
//   const AuthStr = 'Bearer '.concat(access_token);
//   const sendQuery = useCallback(async () => {
//     try {
//       await setLoading(true);
//       await setError(false);
//       const res = users.get("/users/" + stringifiedQuery,
//         { headers: { 'Authorization': AuthStr } }
//       )
//       await setList((prev) => [...prev, ...res.data.data.payload]);
//       setLoading(false);
//     } catch (err) {
//       setError(err);
//     }
//   }, [query]);

//   useEffect(() => {
//     sendQuery(query);
//   }, [query, sendQuery]);

//   return { loading, error, list };
// }

// export default useFetch;