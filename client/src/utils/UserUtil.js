import { useContext } from "react";
import { Context } from "../index";

export const GetUser = () => {
    const {store} = useContext(Context);
    return store.user
};

export const IsAuth = () => {
    const {store} = useContext(Context);
    return store.isAuth
};

export const GetStore = () => {
    const {store} = useContext(Context);
    return store
};