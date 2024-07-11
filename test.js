function serialize(numbers) {
    // Инициализация битовой карты
    let bit_map = new Array(300).fill(0);

    // Установка соответствующих битов
    for (let number of numbers) {
        if (1 <= number && number <= 300) {
            bit_map[number - 1] = 1;
        }
    }

    // Преобразование битовой карты в строку
    let bit_string = bit_map.join('');

    // Преобразование битовой строки в компактное представление ASCII
    let serialized_string = '';
    for (let i = 0; i < bit_string.length; i += 6) {
        let chunk = bit_string.slice(i, i + 6);
        serialized_string += String.fromCharCode(parseInt(chunk, 2) + 63);
    }

    return serialized_string;
}

function deserialize(serialized_string) {
    // Преобразование компактного представления ASCII в битовую строку
    let bit_string = '';
    for (let char of serialized_string) {
        bit_string += (char.charCodeAt(0) - 63).toString(2).padStart(6, '0');
    }

    // Преобразование битовой строки в массив чисел
    let numbers = [];
    for (let i = 0; i < bit_string.length; i++) {
        if (bit_string[i] === '1') {
            numbers.push(i + 1);
        }
    }

    return numbers;
}

// Функция для вычисления коэффициента сжатия
function compressionRatio(original, compressed) {
    return (compressed.length / original.length).toFixed(2);
}

// Тестовые данные
let tests = [
    [1, 2, 3, 4, 5],  // Простейший короткий пример
    Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1),  // Случайные числа, 50 чисел
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1),  // Случайные числа, 100 чисел
    Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1),  // Случайные числа, 500 чисел
    Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1),  // Случайные числа, 1000 чисел
    Array.from({ length: 9 }, (_, i) => i + 1),  // Все числа 1 знака
    Array.from({ length: 90 }, (_, i) => i + 10),  // Все числа из 2 знаков
    Array.from({ length: 200 }, (_, i) => i + 100),  // Все числа из 3 знаков
    Array.from({ length: 300 }, (_, i) => Math.floor(i / 3) + 1)  // Каждого числа по 3, всего чисел 900
];

// Пример использования и тестирования
tests.forEach((test, i) => {
    let serialized = serialize(test);
    let deserialized = deserialize(serialized);
    let original_string = test.join(',');
    let compressed_string = serialized;
    let ratio = compressionRatio(original_string, compressed_string);

    console.log(`Test ${i + 1}:`);
    console.log(`Original: ${original_string}`);
    console.log(`Serialized: ${compressed_string}`);
    console.log(`Compression Ratio: ${ratio}`);
    console.log(`Deserialized matches original: ${JSON.stringify(test.sort((a, b) => a - b)) === JSON.stringify(deserialized.sort((a, b) => a - b))}\n`);
});
