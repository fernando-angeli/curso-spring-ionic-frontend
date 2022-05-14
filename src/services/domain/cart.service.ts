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

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position, 1);
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    total() : number{
        let cart = this.getCart();
        let sum = 0;
        for(var i = 0; i<cart.items.length; i++){
            sum += cart.items[i].quantidade * cart.items[i].produto.preco;
        }
        return sum;
    }

}