import { musicHighlights } from "../data/dados.js";
import { setTextContent } from "../utils/dom.js";

let musicIndex = 0;

export function mostrarMusica(): void {
    const item = musicHighlights[musicIndex % musicHighlights.length];
    musicIndex += 1;

    setTextContent("musica", item.title);
    setTextContent("musicaDetalhe", `${item.description} ${item.detail}`);
}
