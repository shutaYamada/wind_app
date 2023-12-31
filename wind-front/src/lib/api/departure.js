import Cookies from "js-cookie";
import client from "./client";


export const getDeparture = () => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
      )
        return;
    return client.get("/departures", {
            headers: {
            "access-token": Cookies.get("_access_token"),
            client: Cookies.get("_client"),
            uid: Cookies.get("_uid"),
        },
    });
}

export const createDeparture = (params) => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
    )
        return;
    return client.post("/departures", params, {
            headers: {
            "access-token": Cookies.get("_access_token"),
            client: Cookies.get("_client"),
            uid: Cookies.get("_uid"),
        },
    });
}

