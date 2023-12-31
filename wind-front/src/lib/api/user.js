import Cookies from "js-cookie";
import client from "./client";

export const getUserAll = () => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
    )
        return;
      return client.get("/users", {
        headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
        },
    });
}