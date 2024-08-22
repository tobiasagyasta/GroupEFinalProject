import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import type { Product } from "@/pages/ProductDetailPage";
import { fetchProductById } from "@/pages/ProductDetailPage";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [address, setAddress] = useState(
    location.state?.address || "Alamat belum diisi"
  );
  const [newAddress, setNewAddress] = useState(address);

  useEffect(() => {
    if (productId) {
      const loadProduct = async () => {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct || null);
      };

      loadProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (location.state) {
      const { product, quantity } = location.state as {
        product?: Product;
        quantity?: number;
      };
      if (product) setProduct(product);
      if (quantity) setQuantity(quantity);
    }
  }, [location.state]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const openAddressDialog = () => {
    setNewAddress(address);
    setIsDialogOpen(true);
  };

  const closeAddressDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddressUpdate = () => {
    setAddress(newAddress);
    closeAddressDialog();
  };

  const handlePaymentClick = () => {
    alert("Pembayaran berhasil");
  };

  if (!product) return null;

  const unitPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
  const totalProductPrice = unitPrice * quantity;

  const shippingCost = 8000;
  const insuranceCost = 500;
  const serviceFee = 1000;

  const totalCost =
    totalProductPrice + shippingCost + insuranceCost + serviceFee;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Left Section: Alamat Pengiriman dan Detail Produk */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1 md:w-3/4 gap-4">
            {/* Alamat Pengiriman */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Pengiriman</h2>
              <div className="mb-4">
                <h3 className="text-sm font-semibold">ALAMAT PENGIRIMAN</h3>
                <p>{address}</p>
                <div className="flex space-x-4 mt-2">
                  <button className="text-blue-500" onClick={openAddressDialog}>
                    Ganti Alamat
                  </button>
                </div>
              </div>
            </div>

            {/* Detail Produk */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex">
              <div className="flex-shrink-0 w-36 h-36 mr-6">
                {product && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Dilayani HarvestHub
                  </h3>
                  {product && (
                    <>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {product.sellerName}
                      </p>
                      <p className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </p>
                      <div className="flex justify-between items-center text-gray-700 mb-1">
                        Total Harga:
                        {quantity} x {formatPrice(unitPrice)} ={" "}
                        <span className="text-lg font-medium">
                          {formatPrice(totalProductPrice)}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 mb-1">
                        Instant 3 Jam
                      </p>
                    </>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span className="text-base">Ongkos Kirim:</span>
                    <span className="text-base">
                      {formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-base">
                      Dilindungi Asuransi Pengiriman:
                    </span>
                    <span className="text-base">
                      {formatPrice(insuranceCost)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ringkasan Pembelian */}
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 md:max-w-md">
            <h3 className="text-sm font-semibold">Ringkasan Belanja</h3>
            <div className="flex justify-between">
              <p>Total Harga ({quantity} Barang)</p>
              <p>{formatPrice(totalProductPrice)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Ongkos Kirim</p>
              <p>{formatPrice(shippingCost)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Asuransi Pengiriman</p>
              <p>{formatPrice(insuranceCost)}</p>
            </div>
            <div className="flex justify-between">
              <p>Biaya Jasa Aplikasi</p>
              <p className="line-through text-gray-400">Rp2.000</p>
              <p>{formatPrice(serviceFee)}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total Belanja</p>
              <p>{formatPrice(totalCost)}</p>
            </div>
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 w-full"
              onClick={handlePaymentClick}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>

      {/* Edit Alamat */}
      <Dialog open={isDialogOpen} onOpenChange={closeAddressDialog}>
        <DialogContent className="w-full max-w-lg p-6 bg-gray-50">
          <div className="relative bg-white rounded-lg shadow-xl p-6">
            <DialogTitle className="text-2xl font-bold mb-4">
              Edit Alamat Pengiriman
            </DialogTitle>

            <div className="mb-4">
              <Label htmlFor="newAddress">Alamat Pengiriman</Label>
              <Input
                id="newAddress"
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Masukkan alamat baru"
                className="mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleAddressUpdate}
                className="bg-green-500 text-white"
              >
                Simpan
              </Button>
              <Button
                onClick={closeAddressDialog}
                className="bg-green-500 text-white"
              >
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
