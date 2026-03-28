export function getElementByIdOrThrow(id) {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLElement)) {
        throw new Error(`Elemento com id "${id}" nao foi encontrado.`);
    }
    return element;
}
export function getOptionalElementById(id) {
    const element = document.getElementById(id);
    return element instanceof HTMLElement ? element : null;
}
export function setTextContent(id, text) {
    const element = getOptionalElementById(id);
    if (element) {
        element.textContent = text;
    }
}
