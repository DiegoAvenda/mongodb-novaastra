import { writable } from 'svelte/store';

export const paraLlevar = writable([]);

export function addToBag(product) {
	paraLlevar.update((items) => {
		const existingItem = items.find((item) => item.nombre === product.nombre);

		if (existingItem) {
			return items.map((item) =>
				item.nombre === product.nombre ? { ...item, quantity: item.quantity + 1 } : item
			);
		} else {
			return [...items, { ...product, quantity: 1 }];
		}
	});
}

export function decreaseQuantity(bagItem) {
	paraLlevar.update((items) => {
		const updatedItems = items.map((item) => {
			if (item.nombre === bagItem.nombre) {
				if (item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 };
				} else {
					return null; // Eliminar el item si la cantidad es 1
				}
			} else {
				return item;
			}
		});

		return updatedItems.filter(Boolean); // Eliminar los items nulos
	});
}

export function removeProduct(bagItem) {
	paraLlevar.update((items) => items.filter((item) => item.nombre !== bagItem.nombre));
}

export function emptyBag() {
	paraLlevar.set([]);
}
