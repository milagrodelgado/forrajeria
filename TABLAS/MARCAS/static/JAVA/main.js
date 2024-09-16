document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var openModalBtn = document.getElementById('openModalBtn');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var aperturaCajaForm = document.getElementById('aperturaCajaForm');

    if (openModalBtn) {
        openModalBtn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    if (aperturaCajaForm) {
        aperturaCajaForm.onsubmit = function(e) {
            e.preventDefault();
            var montoInicial = document.getElementById('montoInicial').value;
            if (montoInicial) {
                this.submit();
            } else {
                alert('Por favor, ingrese un monto inicial.');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const buscarProductoInput = document.getElementById('buscar-producto');
    const productosVentaTable = document.getElementById('productos-venta').getElementsByTagName('tbody')[0];
    const ventaForm = document.getElementById('venta-form');

    buscarProductoInput.addEventListener('input', function() {
        if (this.value.length > 2) {
            fetch(`/buscar-producto/?q=${this.value}`)
                .then(response => response.json())
                .then(data => {
                    const resultadosDiv = document.createElement('div');
                    resultadosDiv.id = 'resultados-busqueda';
                    data.forEach(producto => {
                        const productoDiv = document.createElement('div');
                        productoDiv.textContent = `${producto.nombre} - $${producto.precio}`;
                        productoDiv.addEventListener('click', () => agregarProducto(producto));
                        resultadosDiv.appendChild(productoDiv);
                    });
                    const existingResultados = document.getElementById('resultados-busqueda');
                    if (existingResultados) {
                        existingResultados.replaceWith(resultadosDiv);
                    } else {
                        buscarProductoInput.parentNode.appendChild(resultadosDiv);
                    }
                });
        }
    });

    function agregarProducto(producto) {
        const newRow = productosVentaTable.insertRow();
        newRow.innerHTML = `
            <td>${producto.nombre}
                <input type="hidden" name="producto_id" value="${producto.id}">
            </td>
            <td><input type="number" name="cantidad" value="1" min="1" max="${producto.stock}"></td>
            <td>$${producto.precio}</td>
            <td><input type="number" name="descuento" value="0" min="0" max="100"></td>
            <td class="subtotal">$${producto.precio}</td>
            <td><button type="button" class="eliminar-producto">Eliminar</button></td>
        `;
        newRow.querySelector('input[name="cantidad"]').addEventListener('change', actualizarSubtotal);
        newRow.querySelector('input[name="descuento"]').addEventListener('change', actualizarSubtotal);
        newRow.querySelector('.eliminar-producto').addEventListener('click', eliminarProducto);
        actualizarTotales();
    }

    function actualizarSubtotal(event) {
        const row = event.target.closest('tr');
        const cantidad = parseInt(row.querySelector('input[name="cantidad"]').value);
        const precio = parseFloat(row.cells[2].textContent.replace('$', ''));
        const descuento = parseInt(row.querySelector('input[name="descuento"]').value);
        const subtotal = cantidad * precio * (1 - descuento / 100);
        row.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        actualizarTotales();
    }

    function eliminarProducto(event) {
        event.target.closest('tr').remove();
        actualizarTotales();
    }

    function actualizarTotales() {
        let subtotal = 0;
        let descuentoTotal = 0;
        productosVentaTable.querySelectorAll('tr').forEach(row => {
            const cantidad = parseInt(row.querySelector('input[name="cantidad"]').value);
            const precio = parseFloat(row.cells[2].textContent.replace('$', ''));
            const descuento = parseInt(row.querySelector('input[name="descuento"]').value);
            subtotal += cantidad * precio;
            descuentoTotal += cantidad * precio * (descuento / 100);
        });
        const total = subtotal - descuentoTotal;
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('descuento-total').textContent = descuentoTotal.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    ventaForm.addEventListener('submit', function(event) {
        if (productosVentaTable.querySelectorAll('tr').length === 0) {
            event.preventDefault();
            alert('Debe agregar al menos un producto a la venta.');
        }
    });
});
//-------------------------
// main.js
function mostrarCategorias(animal) {
    const categoriasMostrar = document.getElementById('categorias-mostrar');
    categoriasMostrar.innerHTML = '<h3>Categorías disponibles:</h3>'; // Reiniciar el contenido

    // Definir las categorías
    const categorias = ['ALIMENTO', 'INDUMENTARIA', 'MEDICINA'];

    // Crear botones para las categorías
    categorias.forEach(categoria => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-light';
        button.innerText = categoria;
        button.onclick = function() {
            mostrarProductos(categoria);
        };
        categoriasMostrar.appendChild(button);
    });

    // Mostrar el contenedor de categorías
    categoriasMostrar.style.display = 'block';
}

// Función para mostrar productos según la categoría seleccionada
function mostrarProductos(categoria) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Reiniciar la lista

    let productos = [];

    // Definir productos según la categoría seleccionada
    switch (categoria) {
        case 'ALIMENTO':
            productos = ['Comida para Perros', 'Comida para Gatos', 'Heno para Conejos'];
            break;
        case 'INDUMENTARIA':
            productos = ['Collar para Perros', 'Juguete para Gatos', 'Abrigo para Conejos'];
            break;
        case 'MEDICINA':
            productos = ['Vacuna para Perros', 'Antipulgas para Gatos', 'Suplemento para Conejos'];
            break;
        default:
            productos = [];
    }

    // Agregar productos a la lista
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.innerText = producto;
        listaProductos.appendChild(li);
    });

    // Mostrar el contenedor de productos
    document.getElementById('productos-mostrar').style.display = 'block';
}
