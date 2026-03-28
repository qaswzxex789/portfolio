import { connectionHighlights } from "../data/dados.js";
import { setTextContent } from "../utils/dom.js";

let connectionIndex = 0;

export function mostrarConexao(): void {
    const item = connectionHighlights[connectionIndex % connectionHighlights.length];
    connectionIndex += 1;

    setTextContent("conexao", item.title);
    setTextContent("conexaoDetalhe", `${item.description} ${item.detail}`);
}
