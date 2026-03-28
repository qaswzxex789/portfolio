export type HighlightItem = {
    title: string;
    description: string;
    detail: string;
};

export type MetricItem = {
    value: string;
    label: string;
    note: string;
};

export type TimelineItem = {
    phase: string;
    title: string;
    description: string;
};

export type CollectionItem = {
    category: string;
    title: string;
    description: string;
    meta: string;
};

export type SessionItem = {
    label: string;
    title: string;
    description: string;
};

export const musicHighlights: HighlightItem[] = [
    {
        title: "Gustav Holst - The Planets",
        description: "Uma suite orquestral que traduz movimento e escala em texturas dramaticas.",
        detail: "Serve como referencia para o lado mais cinematografico do projeto."
    },
    {
        title: "Voyager Golden Record",
        description: "Uma coletanea enviada ao espaco para representar a diversidade sonora da Terra.",
        detail: "Mostra como musica e curiosidade cientifica podem dividir a mesma mensagem."
    },
    {
        title: "Apollo: Atmospheres and Soundtracks",
        description: "Paisagem ambient que combina silencio, espaco e sensacao de distancia.",
        detail: "Ajuda a inspirar o ritmo mais contemplativo do visual."
    },
    {
        title: "Arvo Part - Spiegel im Spiegel",
        description: "Minimalismo, repeticao e respiracao sonora em camadas delicadas.",
        detail: "A logica de repeticao lembra orbitas, ciclos e leitura lenta."
    }
];

export const astronomyHighlights: HighlightItem[] = [
    {
        title: "Sagittarius A*",
        description: "O buraco negro supermassivo no centro da Via Lactea.",
        detail: "Foi a principal referencia para imaginar massa, foco visual e gravidade."
    },
    {
        title: "Pulsares",
        description: "Estrelas de neutrons que emitem sinais regulares, quase como um metrônomo cosmico.",
        detail: "A cadencia dos pulsos inspirou o comportamento das particulas orbitais."
    },
    {
        title: "Discos de acrecao",
        description: "Materia superaquecida girando em alta velocidade ao redor de objetos extremos.",
        detail: "Aqui aparece como a faixa brilhante alaranjada ao redor do horizonte de eventos."
    },
    {
        title: "Lente gravitacional",
        description: "A gravidade curva a luz e distorce o que esta ao redor.",
        detail: "No site, isso foi recriado com deslocamento suave de estrelas e brilho."
    }
];

export const connectionHighlights: HighlightItem[] = [
    {
        title: "Frequencia e orbita",
        description: "Tanto o som quanto o movimento celeste dependem de repeticao e periodicidade.",
        detail: "Essa ponte conceitual sustenta o tema inteiro do portfolio."
    },
    {
        title: "Escala e contraste",
        description: "Na musica e na astronomia, pequenas variacoes mudam muito a percepcao.",
        detail: "Por isso o site trabalha luz intensa contra um fundo muito escuro."
    },
    {
        title: "Silencio como ferramenta",
        description: "Intervalos vazios organizam a experiencia, seja em uma composicao ou no espaco profundo.",
        detail: "As areas escuras ajudam o visitante a sentir profundidade e foco."
    },
    {
        title: "Narrativa por camadas",
        description: "Um bom arranjo musical e um bom layout conduzem a atencao em etapas.",
        detail: "As paginas foram desenhadas para abrir, explicar e aprofundar o assunto."
    }
];

export const homeMetrics: MetricItem[] = [
    {
        value: "3",
        label: "paginas obrigatorias",
        note: "Home, Sobre e Conteudo"
    },
    {
        value: "100%",
        label: "TypeScript puro",
        note: "Sem frameworks externos"
    },
    {
        value: "Canvas",
        label: "efeito principal",
        note: "Buraco negro em tempo real"
    },
    {
        value: "Responsivo",
        label: "uso em celular",
        note: "Layout adaptado para telas menores"
    }
];

export const timelineItems: TimelineItem[] = [
    {
        phase: "01",
        title: "Definicao do tema",
        description: "A ideia central foi fugir de referencias obvias e propor um portfolio com repertorio real, ligando astronomia, som e direcao visual."
    },
    {
        phase: "02",
        title: "Estrutura das paginas",
        description: "A navegacao foi organizada em tres paginas para abrir o assunto, explicar o conceito e reunir conteudos de apoio."
    },
    {
        phase: "03",
        title: "Camada visual",
        description: "O CSS ganhou gradientes, paineis translucidos, tipografia mais elegante e hierarquia forte para parecer um site publicado."
    },
    {
        phase: "04",
        title: "Animacao do fundo",
        description: "O Canvas foi tratado como uma cena cinematografica com horizonte de eventos, disco de acrecao, particulas e glow."
    },
    {
        phase: "05",
        title: "Interatividade",
        description: "Cards, listas e secoes dinamicas passaram a ser renderizados com TypeScript para evitar repeticao e manter o codigo organizado."
    },
    {
        phase: "06",
        title: "Entrega e hospedagem",
        description: "O resultado final foi preparado para compilar em `dist/` e ser publicado em hospedagem estatica com link publico."
    }
];

export const collectionItems: CollectionItem[] = [
    {
        category: "Escuta guiada",
        title: "Trilhas para uma noite de observacao",
        description: "Uma selecao de obras ambient, classicas e experimentais que funciona bem enquanto o visitante navega pelo tema.",
        meta: "Objetivo: reforcar concentracao, escala e atmosfera."
    },
    {
        category: "Astronomia",
        title: "Fenomenos usados como referencia visual",
        description: "Buracos negros, pulsares, discos de acrecao e lente gravitacional foram escolhidos por terem movimento, contraste e potencia imagetica.",
        meta: "Objetivo: justificar o fundo animado com base em ciencia real."
    },
    {
        category: "Design",
        title: "Paleta de calor contra profundidade",
        description: "O visual combina tons quentes no centro energetico com azuis quase pretos ao redor, criando um palco dramatico para o conteudo.",
        meta: "Objetivo: tornar o portfolio memoravel sem perder legibilidade."
    },
    {
        category: "Narrativa",
        title: "Abertura, explicacao e aprofundamento",
        description: "Cada pagina cumpre um papel: convidar, contextualizar e sustentar a argumentacao com repertorio.",
        meta: "Objetivo: ajudar na apresentacao ao vivo e na avaliacao do projeto."
    },
    {
        category: "Tecnologia",
        title: "Site estatico com comportamento dinamico",
        description: "Mesmo sem frameworks, o projeto usa TypeScript para modularidade, tipagem forte e componentes de interface montados por codigo.",
        meta: "Objetivo: mostrar dominio tecnico com ferramentas basicas."
    },
    {
        category: "Publicacao",
        title: "Pensado para link real na internet",
        description: "Os arquivos foram organizados para que o deploy em GitHub Pages ou outro host estatico seja simples e confiavel.",
        meta: "Objetivo: transformar o trabalho em algo acessivel remotamente."
    }
];

export const sessionItems: SessionItem[] = [
    {
        label: "Rota 01",
        title: "Entrar pela Home",
        description: "Apresente o conceito geral, mostre o fundo em movimento e use os cards interativos para introduzir o tema rapidamente."
    },
    {
        label: "Rota 02",
        title: "Abrir a pagina Sobre",
        description: "Explique por que o assunto foi escolhido, destaque a parte tecnica e use a linha do tempo como guia da sua fala."
    },
    {
        label: "Rota 03",
        title: "Fechar em Conteudo",
        description: "Mostre que o projeto nao depende so do efeito visual: existe curadoria, repertorio e organizacao por secoes."
    }
];
