
export function numberToIdrFormat(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function stringToIdrFormat(str: string): string {
    return str.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function idrToStringFormat(idr: string): string {
    return idr.replace(/\./g, '');
}

export function idrToNumberFormat(idr: string): number {
    return Number(idr.replace(/\./g, ''));
}