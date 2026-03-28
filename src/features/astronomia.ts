import { astronomyHighlights } from "../data/dados.js";
import { setTextContent } from "../utils/dom.js";

let astronomyIndex = 0;

export function mostrarPlaneta(): void {
    const item = astronomyHighlights[astronomyIndex % astronomyHighlights.length];
    astronomyIndex += 1;

    setTextContent("planeta", item.title);
    setTextContent("planetaDetalhe", `${item.description} ${item.detail}`);
}
