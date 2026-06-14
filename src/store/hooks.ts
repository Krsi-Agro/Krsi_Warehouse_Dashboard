import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Typed versions of the React-Redux hooks (react-redux v9 / RTK 2 style).
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
