import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {
    
    constructor(public storage: StorageService){
    }

    creatOrClearCart() : Cart {
        let cart: Cart = {items: []}
        this.storage.setLocalCart(cart)
        return cart;
    }

    getCart() : Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.creatOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1, produto : produto});
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

}