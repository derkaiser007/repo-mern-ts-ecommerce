import { useEffect, useState } from "react"
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const subtotal = 50000
const shippingCharges = 150
const tax = subtotal * 0.18
const discount = 500

const cartItems = [
    {
        productId: "erd564erdf6785tfg",
        photo: "https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Pro-M2-Pro-and-M2-Max-hero-230117.jpg.landing-big_2x.jpg",
        name: "MacBook",
        price: 125000,
        quantity: 1
    },
    {
        productId: "rtyf675tfgr787uhy",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5y4pO8WC0UeUdqfcf5SL-sN7mxZhuQNu9yy60q_ReXQ&s",
        name: "IPhone",
        price: 95000,
        quantity: 1
    },
    {
        productId: "dret567yt54erfnj879jn",
        photo: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/imac-24-no-id-blue-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1701459101618",
        name: "IMac",
        price: 110000,
        quantity: 1
    }
]

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>('')
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if(Math.random() > 0.5) setIsValidCouponCode(true)
            else setIsValidCouponCode(false)
        }, 1000)

        return () => {
            clearTimeout(timeOutId);
        }
    }, [couponCode])

    return(
        <div className="cart">
            <main>
                {cartItems.length > 0 ? (
                    cartItems.map((i, idx) => (
                      <CartItem
                        key={idx}
                        cartItem={i}
                      />
                    ))
                  ) : (
                    <h1>No Items Added</h1>
                  )
                }
            </main>
            
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    {couponCode &&
                        (isValidCouponCode ? (
                            <p>Discount: <em className="red"> - ₹{discount}</em></p>
                        ) : '')
                    }
                </p>
                <p>
                    {couponCode &&
                        (isValidCouponCode ? (
                            <b>Total: ₹{subtotal + shippingCharges + tax - discount}</b>
                        ) : <b>Total: ₹{subtotal + shippingCharges + tax}</b>
                        )
                    }
                </p>

                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                  (isValidCouponCode ? (
                    <span className="green">
                      ₹{discount} off using the <code>{couponCode}</code>
                    </span>
                  ) : (
                    <span className="red">
                      Invalid Coupon <VscError />
                    </span>
                  ))}

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    )
}

export default Cart;