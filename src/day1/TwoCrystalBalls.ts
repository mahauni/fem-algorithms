export default function two_crystal_balls(breaks: boolean[]): number {
    const jmp_amount = Math.floor(Math.sqrt(breaks.length));

    let i = jmp_amount;
    
    for (; i < breaks.length; i += jmp_amount) {
        if (breaks[i]) {
            break;
        }
    }

    i -= jmp_amount;

    for (let j = 0; j < jmp_amount && i < breaks.length; j++, i++) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
