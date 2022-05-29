
export function ValidateShifts(on : string, off : string) {
    let _on = new Date();
    let on_split = on.trim().split(":");
    _on.setHours(Number(on_split[0]),Number(on_split[1]),0);

    let off_split = off.trim().split(":");
    let _off = new Date();
    _off.setHours(Number(off_split[0]),Number(off_split[1]),0);

    return _on < _off;
}

export function ValidateLatitude(num : number) {
    return isFinite(num) && Math.abs(num) <= 90;
}

export function ValidateLongitude(num : number) {
    return isFinite(num) && Math.abs(num) <= 180;
}