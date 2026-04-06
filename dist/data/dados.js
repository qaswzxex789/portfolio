export const musicHighlights = [
    {
        title: "Pulso",
        description: "Ritmo é retorno com diferença.",
        detail: "É assim que o corpo reconhece o tempo."
    },
    {
        title: "Eco",
        description: "O som repete com atraso.",
        detail: "Toda distância ganha resposta."
    },
    {
        title: "Cadência",
        description: "Intervalos organizam a espera.",
        detail: "Sem pausa, não há antecipação."
    },
    {
        title: "Ressonância",
        description: "Uma vibração desperta outra.",
        detail: "O encontro amplia a presença."
    }
];
export const astronomyHighlights = [
    {
        title: "Órbita elíptica",
        description: "Nada gira por acaso.",
        detail: "Velocidade e atração entram em acordo."
    },
    {
        title: "Maré gravitacional",
        description: "A massa puxa até o que parece imóvel.",
        detail: "O espaço responde em ondas lentas."
    },
    {
        title: "Retorno orbital",
        description: "Voltar não é repetir igual.",
        detail: "Cada passagem muda o ponto de vista."
    },
    {
        title: "Centro de massa",
        description: "Toda dança precisa de um eixo.",
        detail: "Até dois corpos se curvam um ao outro."
    }
];
export const connectionHighlights = [
    {
        title: "Frequência",
        description: "Padrão que pode ser ouvido ou medido.",
        detail: "Arte e cosmos se tocam aqui."
    },
    {
        title: "Contraste",
        description: "Diferenças criam presença.",
        detail: "Sem tensão, o impacto perde força."
    },
    {
        title: "Ciclo",
        description: "O retorno organiza a memória.",
        detail: "É assim que algo passa a ser reconhecido."
    },
    {
        title: "Escala",
        description: "O mesmo princípio muda de tamanho.",
        detail: "Mas continua soando familiar."
    }
];
export const homeMetrics = [
    {
        value: "Pulso",
        label: "ritmo que retorna",
        note: "tempo com assinatura"
    },
    {
        value: "Órbita",
        label: "força em equilíbrio",
        note: "retorno sem queda"
    },
    {
        value: "Eco",
        label: "distância que responde",
        note: "presença em atraso"
    },
    {
        value: "Ressonância",
        label: "vibração compartilhada",
        note: "um corpo acorda outro"
    }
];
export const timelineItems = [
    {
        phase: "01",
        title: "Pulsar",
        description: "Uma estrela densa gira tão rápido que o sinal parece um relógio extremo.",
        outcome: "Ritmo cósmico em estado puro."
    },
    {
        phase: "02",
        title: "Supernova",
        description: "Quando uma estrela explode, matéria e energia se espalham em todas as direções.",
        outcome: "Caos que também semeia estrutura."
    },
    {
        phase: "03",
        title: "Órbita",
        description: "Corpos não caem em linha reta porque velocidade e gravidade negociam o caminho.",
        outcome: "Equilíbrio também é movimento."
    },
    {
        phase: "04",
        title: "Lente gravitacional",
        description: "A massa curva a luz e faz o universo parecer dobrar a própria imagem.",
        outcome: "A visão perde a inocência."
    },
    {
        phase: "05",
        title: "Disco de acreção",
        description: "Matéria gira, aquece e brilha no limite de regiões extremas.",
        outcome: "O perigo também produz luz."
    },
    {
        phase: "06",
        title: "Escala",
        description: "Entre poeira, estrelas e galáxias, o cosmos muda de tamanho sem perder padrão.",
        outcome: "Grandeza ainda pode ser legível."
    }
];
export const collectionItems = [
    {
        category: "Arquivo",
        title: "Voyager Golden Record",
        description: "Uma saudação enviada ao vazio em nome da Terra.",
        meta: "Faixa original.",
        highlight: "A voz humana vira cápsula de memória.",
        isWide: true,
        image: {
            src: "assets/images/voyager-golden-record.jpg",
            alt: "Exibição do disco de ouro enviado pela missão Voyager",
            caption: "Um disco para guardar voz, música e presença humana."
        },
        audio: {
            src: "assets/audio/voyager-hello-earth.wav",
            type: "audio/wav",
            label: "Ouça a saudação",
            caption: "\"Hello from the children of planet Earth\" no disco de ouro da Voyager.",
            sourceLabel: "Fonte NASA",
            sourceHref: "https://science.nasa.gov/resource/sounds-of-mars-hello-from-the-children-of-planet-earth/"
        }
    },
    {
        category: "Marte",
        title: "Vento no planeta vermelho",
        description: "O microfone da Perseverance deixa o ar marciano mais nítido ao ouvido.",
        meta: "Áudio filtrado.",
        highlight: "Não parece ficção quando o vento finalmente passa.",
        image: {
            src: "assets/images/mars-panorama.jpg",
            alt: "Panorama da superfície de Marte registrado pela missão Perseverance",
            caption: "A paisagem ajuda o ouvido a imaginar o ar raro do planeta."
        },
        audio: {
            src: "assets/audio/mars-perseverance-filtered.wav",
            type: "audio/wav",
            label: "Ouça o vento",
            caption: "Registro filtrado do ambiente em Marte feito pelo rover Perseverance.",
            sourceLabel: "Fonte NASA",
            sourceHref: "https://science.nasa.gov/resource/nasas-perseverance-rover-microphone-captures-sounds-from-mars/"
        }
    },
    {
        category: "Impacto",
        title: "Meteoro em Marte",
        description: "O som chega como um \"bloop\" por causa da atmosfera rarefeita do planeta.",
        meta: "Registro convertido.",
        highlight: "Até uma colisão distante ganha assinatura sonora.",
        isWide: true,
        image: {
            src: "assets/images/mars-meteoroid-impact.jpg",
            alt: "Visual oficial da NASA para o registro do impacto de um meteoro em Marte",
            caption: "Quando o dado bate, o ouvido percebe o evento."
        },
        audio: {
            src: "assets/audio/mars-meteoroid-impact.wav",
            type: "audio/wav",
            label: "Ouça o impacto",
            caption: "Som de um meteoro atingindo Marte a partir dos dados da missão InSight.",
            sourceLabel: "Fonte NASA",
            sourceHref: "https://science.nasa.gov/resource/listen-to-a-meteoroid-hitting-the-red-planet/"
        }
    },
    {
        category: "Pulso",
        title: "Como ouvir um pulsar",
        description: "Quando um feixe retorna em intervalos regulares, o ouvido reconhece um padrão.",
        meta: "Ideia-chave.",
        highlight: "No cosmos, repetição também vira identidade."
    },
    {
        category: "Frequência",
        title: "O padrão por trás do som",
        description: "No áudio, define altura. Em sinais do universo, revela periodicidade e energia.",
        meta: "Ponte central.",
        highlight: "É a mesma lógica em escalas diferentes.",
        image: {
            src: "assets/images/crab-nebula-sonification.jpg",
            alt: "Imagem oficial da sonificação da Nebulosa do Caranguejo",
            caption: "Quando o dado vira som, o padrão fica quase tátil."
        }
    },
    {
        category: "Silêncio",
        title: "O intervalo que faz sentido",
        description: "Sem pausa, sem escuro, sem distância, o espanto perde força.",
        meta: "Leitura final.",
        highlight: "O que falta também compõe."
    }
];
export const sessionItems = [
    {
        label: "Escuta 01",
        title: "Comece pela origem",
        description: "Ouça a saudação da Voyager como se a Terra estivesse ensaiando sua apresentação.",
        duration: "1 faixa",
        payoff: "A voz humana abre a escala."
    },
    {
        label: "Escuta 02",
        title: "Passe pelo vento",
        description: "Em Marte, o ar é raro, mas ainda assim move, raspa e deixa vestígio.",
        duration: "1 faixa",
        payoff: "O planeta ganha matéria."
    },
    {
        label: "Escuta 03",
        title: "Feche no impacto",
        description: "O som do meteoro transforma distância em evento e dado em memória.",
        duration: "1 faixa",
        payoff: "O espaço deixa de ser abstrato."
    }
];
