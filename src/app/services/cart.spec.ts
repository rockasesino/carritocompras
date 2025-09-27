import { TestBed } from '@angular/core/testing';
import { CartService, Product } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    // limpiar localStorage antes de cada test
    localStorage.clear();
  });

  it('✅ debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('✅ debería agregar un producto al carrito', () => {
    const product: Product = { id: 1, name: 'Laptop', price: 1000, quantity: 1, image: 'laptop.jpg' };

    service.addProduct(product);
    const cart = service.getCart();

    expect(cart.length).toBe(1);
    expect(cart[0].name).toBe('Laptop');
  });

  it('✅ debería incrementar la cantidad si el producto ya existe', () => {
    const product: Product = { id: 1, name: 'Laptop', price: 1000, quantity: 1, image: 'laptop.jpg' };

    service.addProduct(product);
    service.addProduct({ ...product, quantity: 2 });

    const cart = service.getCart();
    expect(cart[0].quantity).toBe(3);
  });

  it('✅ debería calcular el total correctamente', () => {
    service.addProduct({ id: 1, name: 'Laptop', price: 1000, quantity: 1, image: 'laptop.jpg' });
    service.addProduct({ id: 2, name: 'Mouse', price: 50, quantity: 2, image: 'mouse.jpg' });

    const total = service.getTotal();
    expect(total).toBe(1100);
  });

  it('✅ debería eliminar un producto', () => {
    service.addProduct({ id: 1, name: 'Laptop', price: 1000, quantity: 1, image: 'laptop.jpg' });

    service.removeProduct(1);
    expect(service.getCart().length).toBe(0);
  });

  it('✅ debería limpiar el carrito', () => {
    service.addProduct({ id: 1, name: 'Laptop', price: 1000, quantity: 1, image: 'laptop.jpg' });
    service.addProduct({ id: 2, name: 'Mouse', price: 50, quantity: 2, image: 'mouse.jpg' });

    service.clearCart();
    expect(service.getCart().length).toBe(0);
  });
});
