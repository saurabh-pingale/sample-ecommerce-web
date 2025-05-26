import { Product } from "../models/Product.js";

export class ProductService {
    static getProducts() {
        return [
            new Product(1, 'T-Shirt', 300, 'https://static.zara.net/assets/public/8f94/92a9/7a5f49bb9816/0936e1b4929b/01887455500-p/01887455500-p.jpg?ts=1740396784922&w=1024'),
            new Product(2, 'Shoes', 800, 'https://m.media-amazon.com/images/I/81R6YbNKOzL._SY695_.jpg'),
            new Product(3, 'Backpack', 1000, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQxmISeBtCXvW1snBQ9dXb2oMBVsDAT9ufsnJRNAhl-3Hjbv-5ESkrh6cjCG_2iysprVTodG6VHpQgP8M6YGVy8jxo2ggsm6Zy7GViQg20vQyLKIs5fJ-h-YA'),
        ]
    }
}