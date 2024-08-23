import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckoutPage from "./CheckOutPage";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: any;
  price: string;
  description: string;
}

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  product: Product | null;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  isOpen,
  onClose,
  onCheckout,
  product,
  quantity,
  onQuantityChange,
}) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [voucher, setVoucher] = useState("");
  const [orderStatus, setOrderStatus] = useState("Menunggu Pembayaran");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPaymentMethod(e.target.value);
  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVoucher(e.target.value);

  if (!product) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    console.log(`Change: ${change}, New Quantity: ${newQuantity}`);
    if (newQuantity > 0) {
      onQuantityChange(newQuantity);
    }
  };

  const totalPrice =
    parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * quantity;
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handleBuyNow = () => {
    setShowCheckoutPage(true);
  };

  const handleCheckoutClick = () => {
    onCheckout();
    navigate(`/checkout/${product.id}`, {
      state: { address, product, quantity },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl p-6 bg-gray-50">
        <div className="relative bg-white rounded-lg shadow-xl p-6">
          <DialogTitle className="text-2xl font-bold mb-4">
            Beli Langsung
          </DialogTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detail Produk */}
            <div className="flex flex-col">
              <div className="mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg font-semibold">
                  Harga:{" "}
                  {rupiahFormatter.format(
                    parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
                  )}
                </p>
                <p className="text-lg font-semibold">
                  Total Harga: {rupiahFormatter.format(totalPrice)}
                </p>
              </div>
            </div>

            {/* Form Checkout */}
            <div className="flex flex-col space-y-4">
              {/* Tambah Produk */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  min="1"
                  className="w-16 text-center border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              {/* Alamat Pengiriman */}
              <div className="mb-4">
                <Label htmlFor="address">Alamat Pengiriman</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Masukkan alamat pengiriman"
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Metode Pembayaran */}
              <div className="mb-4">
                <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="mb-4 border border-gray-300 rounded-lg"
                >
                  <option value="creditCard">Kartu Kredit</option>
                  <option value="gopay">Kartu Debit</option>
                  <option value="shopeepay"></option>
                  <option value="bankTransfer">Transfer Bank</option>
                </select>
              </div>

              {/* Voucher */}
              <div className="mb-4">
                <Label htmlFor="voucher">Kode Voucher</Label>
                <Input
                  id="voucher"
                  type="text"
                  value={voucher}
                  onChange={handleVoucherChange}
                  placeholder="Masukkan kode voucher"
                  className="mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Status Pembelian */}
              <div className="mb-4">
                <Label>Status Pembelian</Label>
                <p className="text-lg font-semibold mt-2">{orderStatus}</p>
              </div>

              {/* Tanggal Pembelian */}
              {orderDate && (
                <div className="mb-4">
                  <Label>Tanggal Pembelian</Label>
                  <p className="text-lg font-semibold mt-2">
                    {orderDate.toLocaleDateString("id-ID")}{" "}
                    {orderDate.toLocaleTimeString("id-ID")}
                  </p>
                </div>
              )}

              {/* Tombol Checkout */}
              <button
                onClick={handleCheckoutClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Checkout
              </button>
              <button onClick={onClose} className="mt-2 text-blue-500">
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
