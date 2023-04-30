import * as Redux from "react-redux";
import { AppState } from "@/store";

export function useSelector<T>(
  selector: (state: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  return Redux.useSelector(selector, equalityFn);
}
