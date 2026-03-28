export function getElementByIdOrThrow<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);

    if (!(element instanceof HTMLElement)) {
        throw new Error(`Elemento com id "${id}" nao foi encontrado.`);
    }

    return element as T;
}

export function getOptionalElementById<T extends HTMLElement>(id: string): T | null {
    const element = document.getElementById(id);
    return element instanceof HTMLElement ? (element as T) : null;
}

export function setTextContent(id: string, text: string): void {
    const element = getOptionalElementById<HTMLElement>(id);

    if (element) {
        element.textContent = text;
    }
}
