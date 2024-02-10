import { atom } from "jotai";
import Axios from "axios";
import { TEvent } from "./types";

const URL = "https://api.hackthenorth.com/v3/events";

export const eventAtom = atom<TEvent[]>([]);

const getEvents = () => {
  return Axios.get(URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getEvents;
