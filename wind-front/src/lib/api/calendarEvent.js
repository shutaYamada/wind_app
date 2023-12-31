import Cookies from "js-cookie";
import client from "./client";


export const getCalendarEvents = () => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
    )
        return;
        return client.get("/calendar_events", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            client: Cookies.get("_client"),
            uid: Cookies.get("_uid"),
        },
    });
}

export const createCalendarEvent = (params) => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
    )
    return;
    return client.post("/calendar_events", params, {
        headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
    },
    });
};

export const showCalendarEvent = (id) => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
      )
      return
    return client.get(`/calendar_events/${id}`, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    })
}

export const updateCalendarEvent = (params) => {
    if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
    )
        return;
    return client.put(`/calendar_events/${params.calendarEventId}`, params, {
        headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
        },
    });
};

export const deleteCalendarEvent = (id) => {
    if (
        !Cookies.get("_access_token") ||
        !Cookies.get("_client") ||
        !Cookies.get("_uid")
      )
      return
    return client.delete(`/calendar_events/${id}`, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    })
}