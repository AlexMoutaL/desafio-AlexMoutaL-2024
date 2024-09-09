class RecintosZoo {}
    // Dados dos recintos
    let recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { macaco: 3 } },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { gazela: 1 } },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { leão: 1 } }
    ];

    // Dados dos novos animais
    let novasEspecies = [
        { especie: 'leão', quantidade: 3, bioma: 'savana' },
        { especie: 'leopardo', quantidade: 2, bioma: 'savana' },
        { especie: 'crocodilo', quantidade: 3, bioma: 'rio' },
        { especie: 'macaco', quantidade: 1, bioma: 'savana' }, // ou floresta
        { especie: 'gazela', quantidade: 2, bioma: 'savana' },
        { especie: 'hipopotamo', quantidade: 4, bioma: 'savana' } // ou rio
    ];

// Função para verificar a viabilidade de um recinto para um novo animal
function verificarRecintos(tipoAnimal, quantidadeAnimal) {
    if (!tipoAnimal || !quantidadeAnimal || quantidadeAnimal <= 0) {
        return "Quantidade inválida";
    }

    let especie = novasEspecies.find(e => e.especie === tipoAnimal);
    if (!especie) {
        return "Animal inválido";
    }

    let recintosViaveis = recintos.filter(recinto => {
        let podeAlocarAnimal = (recinto.bioma.includes(especie.bioma) || (especie.bioma === 'savana' && recinto.bioma.includes('savana e rio'))) &&
            (recinto.tamanhoTotal >= quantidadeAnimal + Object.values(recinto.animaisExistentes).reduce((a, b) => a + b, 0) + (recinto.animaisExistentes[tipoAnimal] ? 1 : 0));

        if (!podeAlocarAnimal) return false;

        // Verificação específica para hipopótamos
        if (tipoAnimal === 'hipopotamo') {
            if (!recinto.bioma.includes('savana e rio')) return false;
        }

        // Verificação específica para macacos
        if (tipoAnimal === 'macaco') {
            if (Object.keys(recinto.animaisExistentes).length === 0) return false;
        }

        // Verificação para animais carnívoros
        if (tipoAnimal === 'leão' || tipoAnimal === 'leopardo') {
            if (Object.keys(recinto.animaisExistentes).some(a => a !== tipoAnimal)) return false;
        }

        return true;
    }).map(recinto => {
        let espaçoLivre = recinto.tamanhoTotal - (quantidadeAnimal + Object.values(recinto.animaisExistentes).reduce((a, b) => a + b, 0) + (recinto.animaisExistentes[tipoAnimal] ? 1 : 0));
        return `Recinto nº ${recinto.numero} (espaço livre: ${espaçoLivre}, total: ${recinto.tamanhoTotal})`;
    });

    if (recintosViaveis.length === 0) {
        return "Não há recinto viável";
    }

    return recintosViaveis.sort((a, b) => a.localeCompare(b));
}

// Exemplo de chamada da função
console.log(verificarRecintos('leão', 3));
console.log(verificarRecintos('crocodilo', 3));
console.log(verificarRecintos('macaco', 1));
console.log(verificarRecintos('hipopotamo', 4));


analisaRecintos(animal, quantidade); {
}


export { RecintosZoo as RecintosZoo };


