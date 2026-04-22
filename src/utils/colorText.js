import gradient from "gradient-string";

const limpiar = (texto) => texto.replace(/[🚀💻💚📦🔥🟣💜✅🌐📝]/g, '').replace(/\s+/g, ' ').trim();

export const textoColorido = (messages, colors = ["#09bc09", "#3cff00"], modoProduction = false) => {
    const maxLen = Math.max(...messages.map(m => m.length));
    const borde = "═".repeat(maxLen + 4);
    const grad = gradient(colors);

    if (modoProduction) {
        const msgs = messages.map(limpiar);
        msgs.forEach(m => console.log(m));
        return;
    } else {
        console.log(grad(`╔${borde}╗`));
        messages.forEach(m => console.log(grad(`║ ${m}${' '.repeat(maxLen - m.length)}   ║`)));
        console.log(grad(`╚${borde}╝`));
    }
};