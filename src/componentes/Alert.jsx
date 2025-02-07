export function Alert({tipo, children}){
    const tipos = {
        info: {etiqueta: "Información", estilo: " bg-blue-50 text-blue-800"},
        exito: {etiqueta: "Éxito", estilo: " bg-green-50 text-green-800"},
        advertencia: {etiqueta: "Advertencia", estilo: " bg-yellow-50 text-yellow-800"},
        error: {etiqueta: "Error", estilo: " bg-red-50 text-red-800"},
    };

    return <div className={`p-4 mb-4 text-sm text-center rounded-lg${tipos[tipo].estilo}`} role="alert">
        <span className="font-medium">{tipos[tipo].etiqueta}:</span> {children}
    </div>
}