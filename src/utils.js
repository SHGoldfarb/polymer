export const propagate = (currentNode, event) => {
    currentNode.dispatchEvent(new CustomEvent(
        event.type, {
            detail: event.detail,
        }));
}