import { formatCurrency } from "./formatters";

export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.sizes}</span>
            <span className="type">{item.pizza.name}</span>
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {formatCurrency(total)}</p>
      <button onClick={checkout}>checkout</button>
    </div>
  );
}
