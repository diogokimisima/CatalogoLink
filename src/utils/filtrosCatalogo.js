import { removeDiacritics } from './formatarValores';

export const filteredCatalogo = (catalogo, { selectedCategory, searchQuery, sortByCriteria, selectedSizes, selectedColors }) => {
    let filteredItems = catalogo;

    if (selectedCategory !== 'Todos') {
        filteredItems = filteredItems.filter(item => item.categoria === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
        const query = removeDiacritics(searchQuery.trim().toLowerCase());
        filteredItems = filteredItems.filter(item =>
            removeDiacritics(item.title.toLowerCase()).includes(query) ||
            removeDiacritics(item.id_produto.toLowerCase()).includes(query) ||
            removeDiacritics(item.cor.toLowerCase()).includes(query)
        );
    }

    if (sortByCriteria === 'highPrice') {
        filteredItems = [...filteredItems].sort((a, b) => b.valor - a.valor);
    } else if (sortByCriteria === 'lowPrice') {
        filteredItems = [...filteredItems].sort((a, b) => a.valor - b.valor);
    } else if (sortByCriteria === 'highDiscount') {
        filteredItems = filteredItems.filter(item => item.valor_antigo);
        filteredItems = [...filteredItems].sort((a, b) => {
            const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
            const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
            return discountPercentB - discountPercentA;
        });
    } else if (sortByCriteria === 'lowDiscount') {
        filteredItems = filteredItems.filter(item => item.valor_antigo);
        filteredItems = [...filteredItems].sort((a, b) => {
            const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
            const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
            return discountPercentA - discountPercentB;
        });
    }

    if (selectedColors.length > 0) {
        filteredItems = filteredItems.filter(item => selectedColors.includes(item.cor.toLowerCase()));
    }

    if (selectedSizes.length > 0) {
        filteredItems = filteredItems.filter(item => selectedSizes.some(size => item.tamanho.includes(size)));
    }

    return filteredItems;
};
