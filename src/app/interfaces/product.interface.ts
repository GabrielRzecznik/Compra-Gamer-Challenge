export interface Product {
    destacado: number;
    nombre: string;
    id_producto: number;
    id_subcategoria: number;
    precio: number;
    imagenes: Imagene[];
    vendible: number;
    stock: number;
    garantia: number;
    iva: number;
}
  
interface Imagene {
    nombre: string;
    id_producto_imagen: number;
    orden: number;
}