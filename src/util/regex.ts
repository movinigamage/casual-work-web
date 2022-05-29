
export function validateEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateTime(time : string) {
    const re = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(String(time).toLowerCase());
}

export function validateDateFormat(date : string) {
    const re = /^\d{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    return re.test(String(date).toLowerCase());
}
