console.log("Script is running");

// 材料数据
const materials = {
    steel: { name: "钢", density: 7850, price: 5 },
    stainlessSteel: { name: "不锈钢", density: 7900, price: 20 },
    aluminum: { name: "铝", density: 2700, price: 15 },
    copper: { name: "铜", density: 8960, price: 50 },
    brass: { name: "黄铜", density: 8500, price: 40 },
    plastic: { name: "塑料(PVC)", density: 1400, price: 10 },
    wood: { name: "木材(橡木)", density: 750, price: 8 },
    concrete: { name: "混凝土", density: 2400, price: 1 },
    glass: { name: "玻璃", density: 2500, price: 15 }
};

// 澳大利亚供应商数据
const suppliers = {
    steel: {
        NSW: ["BlueScope Steel", "OneSteel"],
        VIC: ["Liberty OneSteel", "Australian Steel Company"],
        QLD: ["Steelforce", "ShapeCUT"],
        WA: ["Midalia Steel", "InfraBuild"],
        SA: ["Axiom Steel", "Steel Supplies"],
        TAS: ["TasSteel", "Metalco Tasmania"],
        NT: ["NT Steel Supplies", "Top End Steel"],
        ACT: ["Capital Steel", "ACT Steel Suppliers"]
    },
    // 为其他材料添加示例供应商信息
    aluminum: {
        NSW: ["Capral Aluminium", "G.James Glass & Aluminium"],
        VIC: ["Alspec", "Aluminium Specialties Group"],
        QLD: ["Aluminium Industries of Australia", "Ullrich Aluminium"],
        WA: ["Aluminium Distributors", "Comalco Aluminium"],
        SA: ["Alucobond Architectural", "Altec Aluminium"],
        TAS: ["Tasmanian Aluminium", "Hobart Aluminium"],
        NT: ["Territory Aluminium", "Darwin Aluminium Supplies"],
        ACT: ["ACT Aluminium", "Canberra Aluminium"]
    }
    // 可以继续为其他材料添加供应商信息
};

// 当页面加载时初始化材料选择和州选择
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    const materialSelect = document.getElementById('material');
    for (let key in materials) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = materials[key].name;
        materialSelect.appendChild(option);
    }

    const stateSelect = document.getElementById('state');
    const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"];
    states.forEach(state => {
        let option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
});

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
    const state = document.getElementById('state').value;
    const density = parseFloat(document.getElementById('density').value);
    const price = parseFloat(document.getElementById('price').value);
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (material && state && density && price && length && width && height && quantity) {
        const volume = length * width * height;
        const weight = volume * density;
        const totalPrice = weight * price * quantity / 1000000; // 转换为立方米和吨

        let supplierInfo = '没有该材料在此州的供应商信息';
        if (suppliers[material] && suppliers[material][state]) {
            supplierInfo = `推荐供应商：${suppliers[material][state].join(', ')}`;
        }

        document.getElementById('result').innerHTML = `
            <h2>报价结果</h2>
            <p>材料：${materials[material].name}</p>
            <p>州：${state}</p>
            <p>体积：${volume.toFixed(4)} m³</p>
            <p>重量：${(weight / 1000).toFixed(2)} kg</p>
            <p>总价：${totalPrice.toFixed(2)} 元</p>
            <p>${supplierInfo}</p>
        `;
    } else {
        document.getElementById('result').innerHTML = '<p>请填写所有字段</p>';
    }
});
