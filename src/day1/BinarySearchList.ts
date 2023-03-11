export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        const v = haystack[mid];

        if (v == needle) {
            return true;
        } else if (v > needle) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return false;
}
