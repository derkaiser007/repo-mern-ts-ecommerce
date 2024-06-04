import { FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import axios from "axios";
import { server } from "../../../redux/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [size, setSize] = useState<number>(12);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  // const [isCopied, setIsCopied] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(100);
  const [couponText, setCouponText] = useState<string>("");

  /*
  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };
  */

  const submitHandlerForCouponText = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCouponText(result);
  };

  /*
  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);
  */

    
  const submitHandlerToGenerateCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !user._id) {
      return toast.error("User is not logged in");
    }

    try {
      await axios.post(
        `${server}/api/v1/payment/coupon/new?id=${user._id}`,
        {
          coupon: couponText,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Coupon generated successfully");

    } catch (error: any) {
      console.error("Error generating coupon:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
  }
};

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandlerForCouponText}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>

            </fieldset>
            <button type="submit">Generate Text For Coupon</button>
          </form>

          
          <form className="coupon-form" onSubmit={submitHandlerToGenerateCoupon}>
          {/*
          {coupon && (
            <code>
              {coupon}
               
              <span onClick={() => copyText(coupon)}> 
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
          */}

          {couponText && (
            <p>Coupon: {couponText}</p>
          )}      

          <p>Amount:  
            <input 
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </p>
          <button type="submit">Generate Coupon</button>
        </form>
        </section>
      </main>
    </div>
  );
};

export default Coupon;
