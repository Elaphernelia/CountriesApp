// This context is used so that we can access the fetched API data from anywhere, that way we only need one API call and we avoid prop drilling
import { createContext } from "react";

export const CountriesContext = createContext(undefined); 