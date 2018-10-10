export const propagate = (currentNode, event) => {
    currentNode.dispatchEvent(new CustomEvent(
        event.type, {
            detail: event.detail,
        }));
}

export const sumArray = arr => arr.reduce((x, y) => x + y, 0);

export const toMoneyString = number => {
    let numberString = number.toString();
    let ret = '';
    while (numberString && numberString !== '-') {
        if (ret) {
            ret = '.' + ret
        }
        ret = numberString.slice(-3) + ret;
        numberString = numberString.slice(0, -3)
    }
    return '$' + numberString + ret;
}