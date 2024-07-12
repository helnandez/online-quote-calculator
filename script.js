// 材料数据
const materials = {
    steel: { density: 7850, price: 5 },
    aluminum: { density: 2700, price: 15 },
    copper: { density: 8960, price: 50 },
    plastic: { density: 950, price: 10 }
};

// 当选择材料时更新密度和单价
document.getElementById('material').addEventListener('change', function() {
    const material = materials[this.value];
    if (material) {
        document.getElementById('density').value = material.density;
        document.getElementById('price').value = material.price;
    } else {
        document.getElementById('density').value = '';
        document.getElementById('price').value = '';
    }
});

// 处理表单提交
document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const material = document.getElementById('material').value;
    const density = parseFloat(document.getElementById('density').value);
    const price = parseFloat(document.getElementById('price').value);
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (material && density && price && length && width && height && quantity) {
        const volume = length * width * height;
        const weight = volume * density;
        const totalPrice = weight * price * quantity;

        document.getElementById('result').innerHTML = `
            <h2>报价结果</h2>
            <p>材料：${material}</p>
            <p>体积：${volume.toFixed(2)} m³</p>
            <p>重量：${weight.toFixed(2)} kg</p>
            <p>总价：${totalPrice.toFixed(2)} 元</p>
        `;
    } else {
        document.getElementById('result').innerHTML = '<p>请填写所有字段</p>';
    }
});
