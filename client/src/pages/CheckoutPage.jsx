import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(null);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    // Validate cart items
    if (!cartItemsList || cartItemsList.length === 0) {
      toast.error("Please add some products to your cart before placing an order.");
      return;
    }

    // Validate address selection and completeness
    if (selectAddress === null || selectAddress === undefined) {
      toast.error("Please select a delivery address before placing an order.");
      return;
    }
    
    const selectedAddr = addressList[selectAddress];
    if (!selectedAddr?._id) {
      toast.error("Please select a delivery address before placing an order.");
      return;
    }
    
    if (!selectedAddr.address_line || !selectedAddr.city || !selectedAddr.state || !selectedAddr.pincode || !selectedAddr.country || !selectedAddr.mobile) {
      toast.error("Selected address is incomplete. Please add a complete address with all required fields.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrder) {
          fetchOrder();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    // Validate cart items
    if (!cartItemsList || cartItemsList.length === 0) {
      toast.error("Please add some products to your cart before placing an order.");
      return;
    }

    // Validate address selection and completeness
    if (selectAddress === null || selectAddress === undefined) {
      toast.error("Please select a delivery address before placing an order.");
      return;
    }
    
    const selectedAddr = addressList[selectAddress];
    if (!selectedAddr?._id) {
      toast.error("Please select a delivery address before placing an order.");
      return;
    }
    
    if (!selectedAddr.address_line || !selectedAddr.city || !selectedAddr.state || !selectedAddr.pincode || !selectedAddr.country || !selectedAddr.mobile) {
      toast.error("Selected address is incomplete. Please add a complete address with all required fields.");
      return;
    }

    try {
      toast.loading("Loading...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      console.log('Stripe public key:', stripePublicKey);
      
      const stripePromise = await loadStripe(stripePublicKey);
      console.log('Stripe loaded:', !!stripePromise);

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;
      console.log('Payment response:', responseData);

      toast.dismiss();
      
      if (responseData.id) {
        const result = await stripePromise.redirectToCheckout({ sessionId: responseData.id });
        if (result.error) {
          console.error('Stripe redirect error:', result.error);
          toast.error(result.error.message);
        }
      } else {
        console.error('No session ID received from server');
        toast.error('Payment session could not be created');
      }
    } catch (error) {
      toast.dismiss();
      AxiosToastError(error);
    }
  };
  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          {/***address***/}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList?.length === 0 && (
              <div className="text-center p-4 text-gray-500">
                <p>No delivery address found</p>
                <p className="text-sm text-gray-400">Please add an address to continue</p>
              </div>
            )}
            {addressList.map((address, index) => {
              return (
                <label
                  key={address._id || index}
                  htmlFor={"address" + index}
                  className={!address.status ? "hidden" : undefined}
                >
                  <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectAddress(Number(e.target.value))}
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          {/**summary**/}
          <h3 className="text-lg font-semibold">Summary</h3>
          {!cartItemsList?.length ? (
            <div className="bg-white p-4 text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <p className="text-sm text-gray-400">Please add some products to continue</p>
            </div>
          ) : (
            <div className="bg-white p-4">
              <h3 className="font-semibold">Bill details</h3>
              <div className="flex gap-4 justify-between ml-1">
                <p>Items total</p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-neutral-400">
                    {DisplayPriceInRupees(notDiscountTotalPrice)}
                  </span>
                  <span>{DisplayPriceInRupees(totalPrice)}</span>
                </p>
              </div>
              <div className="flex gap-4 justify-between ml-1">
                <p>Quntity total</p>
                <p className="flex items-center gap-2">{totalQty} item</p>
              </div>
              <div className="flex gap-4 justify-between ml-1">
                <p>Delivery Charge</p>
                <p className="flex items-center gap-2">Free</p>
              </div>
              <div className="font-semibold flex items-center justify-between gap-4">
                <p>Grand total</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-4">
            <button
              className={`py-2 px-4 rounded font-semibold ${
                !cartItemsList?.length || selectAddress === null || !addressList[selectAddress]?._id || !addressList[selectAddress]?.address_line || !addressList[selectAddress]?.city || !addressList[selectAddress]?.state || !addressList[selectAddress]?.pincode || !addressList[selectAddress]?.country || !addressList[selectAddress]?.mobile
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={handleOnlinePayment}
              disabled={!cartItemsList?.length || selectAddress === null || !addressList[selectAddress]?._id || !addressList[selectAddress]?.address_line || !addressList[selectAddress]?.city || !addressList[selectAddress]?.state || !addressList[selectAddress]?.pincode || !addressList[selectAddress]?.country || !addressList[selectAddress]?.mobile}
            >
              Online Payment
            </button>

            <button
              className={`py-2 px-4 border-2 font-semibold ${
                !cartItemsList?.length || selectAddress === null || !addressList[selectAddress]?._id || !addressList[selectAddress]?.address_line || !addressList[selectAddress]?.city || !addressList[selectAddress]?.state || !addressList[selectAddress]?.pincode || !addressList[selectAddress]?.country || !addressList[selectAddress]?.mobile
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              }`}
              onClick={handleCashOnDelivery}
              disabled={!cartItemsList?.length || selectAddress === null || !addressList[selectAddress]?._id || !addressList[selectAddress]?.address_line || !addressList[selectAddress]?.city || !addressList[selectAddress]?.state || !addressList[selectAddress]?.pincode || !addressList[selectAddress]?.country || !addressList[selectAddress]?.mobile}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
