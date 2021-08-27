const mongoose = require('mongoose');
const Product = require('./product');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.getCart = function () {
  const ids = this.cart.items.map((i) => {
    return i.productId;
  });

  return Product.find({ _id: { $in: ids } })
    .select('name price imageUrl')
    .then((products) => {
      return products.map((p) => {
        return {
          name: p.name,
          price: p.price,
          imageUrl: p.imageUrl,
          quantity: this.cart.items.find((i) => {
            return i.productId.toString() === p._id.toString();
          }).quantity,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

userSchema.methods.addToCart = function (product) {
  const index = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  console.log(index);
  const updatedCartItems = [...this.cart.items];
  let itemQuantity = 1;

  if (index >= 0) {
    itemQuantity = this.cart.items[index].quantity + 1;
    updatedCartItems[index].quantity = itemQuantity;
  } else {
    console.log(1);
    updatedCartItems.push({
      productId: product._id,
      quantity: itemQuantity,
    });
  }

  this.cart = {
    items: updatedCartItems,
  };

  return this.save();
};

module.exports = mongoose.model('User', userSchema);
/*
getCart() {
  const ids = this.cart.items.map((i) => {
    return i.productId;
  });

  const db = getDb();
  return db
    .collection('products')
    .find({ _id: { $in: ids } })
    .toArray()
    .then((products) => {
      return products.map((p) => {
        return {
          ...p,
          quantity: this.cart.items.find((i) => {
            return i.productId.toString() === p._id.toString();
          }).quantity,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

addToCart(product) {
  const index = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];
  let itemQuantity = 1;

  if (index >= 0) {
    itemQuantity = this.cart.items[index].quantity + 1;
    updatedCartItems[index].quantity = itemQuantity;
  } else {
    updatedCartItems.push({
      productId: new mongodb.ObjectId(product._id),
      quantity: itemQuantity,
    });
  }

  const db = getDb();
  return db.collection(collection).updateOne(
    {
      _id: new mongodb.ObjectId(this._id),
    },
    {
      $set: {
        cart: {
          items: updatedCartItems,
        },
      },
    }
  );
}

deleteCartItem(productId) {
  const cartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  const db = getDb();
  return db.collection(collection).updateOne(
    {
      _id: new mongodb.ObjectId(this._id),
    },
    {
      $set: {
        cart: {
          items: cartItems,
        },
      },
    }
  );
}

getOrders() {
  const db = getDb();
  return db
    .collection('orders')
    .find({ 'user._id': new mongodb.ObjectId(this._id) })
    .toArray();
}

addOrder() {
  const db = getDb();
  return this.getCart()
    .then((products) => {
      const order = {
        items: products.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            userId: item.userId,
            quantity: item.quantity,
          };
        }),
        user: {
          _id: mongodb.ObjectId(this._id),
          name: this.name,
          email: this.email,
        },
        date: new Date().toLocaleString(),
      };

      return db.collection('orders').insertOne(order);
    })
    .then(() => {
      this.cart = { items: [] };
      return db
        .collection(collection)
        .updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          { $set: { cart: { items: [] } } }
        );
    })
    .catch((err) => {
      console.log(err);
    });
}
*/
