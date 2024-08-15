import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaSearch,
  FaInbox,
  FaCommentAlt,
  FaBoxOpen,
  FaTruckLoading,
  FaStar,
  FaHeart,
  FaUserCog,
  FaShoppingCart,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";

export default function BuyerPage() {
  const [selectedMenu, setSelectedMenu] = useState<string>("Pengaturan");

  const menuItems = [
    { label: "Pesananan Saya", icon: <FaBoxOpen /> },
    { label: "Menunggu Pembayaran", icon: <FaTruckLoading /> },
    { label: "Kotak Masuk", icon: <FaInbox /> },
    { label: "Diskusi Produk", icon: <FaCommentAlt /> },
    { label: "Pesan Bantuan", icon: <FaHeart /> },
    { label: "Pesanan Dikomplain", icon: <FaStar /> },
    { label: "Ulasan", icon: <FaStar /> },
    { label: "Wishlist", icon: <FaHeart /> },
    { label: "Favorit Saya", icon: <FaHeart /> },
    { label: "Pengaturan", icon: <FaUserCog /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold">
          <img
            src="/images/logo.png"
            alt="HarvestHub Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Cari di HarvestHub"
              className="border border-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300" />
          <FaBell className="w-6 h-6 text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300" />
          <FaEnvelope className="w-6 h-6 text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300" />
          <span className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-300">
            Saya
          </span>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md">
          <nav>
            <ul>
              {menuItems.map(({ label, icon }) => (
                <SidebarItem
                  key={label}
                  icon={icon}
                  label={label}
                  onClick={() => setSelectedMenu(label)}
                />
              ))}
            </ul>
          </nav>
        </aside>

        {/* Dashboard Widgets */}
        <main className="flex-1 p-8">
          {selectedMenu === "Pengaturan" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="biodata">Biodata Diri</TabsTrigger>
                <TabsTrigger value="alamat">Daftar Alamat</TabsTrigger>
                <TabsTrigger value="rekening">Rekening</TabsTrigger>
                <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
              </TabsList>
              <TabsContent value="biodata" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Biodata Diri</h3>
                <p>Nama: Ira Nbbn</p>
                <p>Email: ira@gmail.com</p>
                <p>Telepon: +62 83974747447</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Edit Profil</button>
              </TabsContent>
              <TabsContent value="alamat" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Daftar Alamat</h3>
                <ul>
                  <li className="border-b py-2">
                    <p>Alamat 1: Jalan Raya No. 123, Jakarta</p>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                  </li>
                  <li className="border-b py-2">
                    <p>Alamat 2: Jalan Kemenangan No. 45, Bandung</p>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Tambah Alamat</button>
              </TabsContent>
              <TabsContent value="rekening" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Rekening</h3>
                <ul>
                  <li className="border-b py-2">
                    <p>Rekening Bank: Bank Agriculture - 1234567890</p>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Tambah Rekening</button>
              </TabsContent>
              <TabsContent value="notifikasi" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Notifikasi</h3>
                <ul>
                  <li className="border-b py-2">
                    <p>Menunggu Pembayaran</p>
                  </li>
                  <li className="border-b py-2">
                    <p>Menunggu Konfirmasi</p>
                  </li>
                  <li className="border-b py-2">
                    <p>Pesanan Diproses</p>
                  </li>
                  <li className="border-b py-2">
                    <p>Pesanan Dikirim</p>
                  </li>
                  <li className="border-b py-2">
                    <p>Pesanan Selesai</p>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Kelola Notifikasi</button>
              </TabsContent>
            </Tabs>
          )}

          {/* Wishlist */}
          {selectedMenu === "Wishlist" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="semua">Semua Wishlist</TabsTrigger>
                <TabsTrigger value="terakhir">Produk Terakhir Dilihat</TabsTrigger>
              </TabsList>
              <TabsContent value="semua" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Semua Wishlist</h3>
                <p>Daftar semua item wishlist kamu.</p>
              </TabsContent>
              <TabsContent value="terakhir" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Produk Terakhir Dilihat</h3>
                <p>Produk yang terakhir dilihat.</p>
              </TabsContent>
            </Tabs>
          )}

          {/* Diskusi Produk */}
          {selectedMenu === "Diskusi Produk" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="belum">Belum Dibaca</TabsTrigger>
                <TabsTrigger value="dibaca">Sudah Dibaca</TabsTrigger>
              </TabsList>
              <TabsContent value="belum" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Belum Dibaca</h3>
                <p>Diskusi yang belum dibaca.</p>
              </TabsContent>
              <TabsContent value="dibaca" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Sudah Dibaca</h3>
                <p>Diskusi yang sudah dibaca.</p>
              </TabsContent>
            </Tabs>
          )}

          {/* Pesanan Dikomplain */}
          {selectedMenu === "Pesanan Dikomplain" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="lihat">Lihat Komplain</TabsTrigger>
                <TabsTrigger value="ajukan">Ajukan Komplain</TabsTrigger>
              </TabsList>
              <TabsContent value="lihat" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Lihat Komplain</h3>
                <p>Lihat komplain yang sudah diajukan.</p>
              </TabsContent>
              <TabsContent value="ajukan" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Ajukan Komplain</h3>
                <p>Ajukan komplain baru.</p>
              </TabsContent>
            </Tabs>
          )}

          {/* Kotak Masuk */}
          {selectedMenu === "Kotak Masuk" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                <TabsTrigger value="komplain">Komplain</TabsTrigger>
              </TabsList>
              <TabsContent value="inbox" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Inbox</h3>
                <p>Lihat Pesanmu disini</p>
              </TabsContent>
              <TabsContent value="komplain" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Lihat Komplain</h3>
                <p>Lihat komplain yang sudah diajukan.</p>
              </TabsContent>
            </Tabs>
          )}

          {/* Menunggu Pembayaran */}
          {selectedMenu === "Menunggu Pembayaran" && (
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold">Menunggu Pembayaran</h3>
              <p>Kamu punya pembayaran yang masih menunggu.</p>
            </div>
          )}

          {/* Pesananan Saya */}
          {selectedMenu === "Pesananan Saya" && (
            <Tabs>
              <TabsList>
                <TabsTrigger value="semua">Semua</TabsTrigger>
                <TabsTrigger value="berlangsung">Berlangsung</TabsTrigger>
                <TabsTrigger value="berhasil">Berhasil</TabsTrigger>
                <TabsTrigger value="tidak-berhasil">Tidak Berhasil</TabsTrigger>
              </TabsList>
              <TabsContent value="semua" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Semua Transaksi</h3>
                <p>Daftar semua pesanan kamu.</p>
              </TabsContent>
              <TabsContent value="berlangsung" className="p-4 bg-white shadow-md rounded-lg">
                <Tabs>
                  <TabsList>
                    <TabsTrigger value="menunggu-konfirmasi">Menunggu Konfirmasi</TabsTrigger>
                    <TabsTrigger value="diproses">Diproses</TabsTrigger>
                    <TabsTrigger value="dikirim">Dikirim</TabsTrigger>
                    <TabsTrigger value="tiba-tujuan">Tiba di Tujuan</TabsTrigger>
                    <TabsTrigger value="dikomplain">Dikomplain</TabsTrigger>
                  </TabsList>
                  <TabsContent value="menunggu-konfirmasi" className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">Menunggu Konfirmasi</h3>
                    <p>Transaksi yang menunggu konfirmasi.</p>
                  </TabsContent>
                  <TabsContent value="diproses" className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">Diproses</h3>
                    <p>Transaksi yang sedang diproses.</p>
                  </TabsContent>
                  <TabsContent value="dikirim" className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">Dikirim</h3>
                    <p>Transaksi yang sudah dikirim.</p>
                  </TabsContent>
                  <TabsContent value="tiba-tujuan" className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">Tiba di Tujuan</h3>
                    <p>Transaksi yang sudah tiba di tujuan.</p>
                  </TabsContent>
                  <TabsContent value="dikomplain" className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">Dikomplain</h3>
                    <p>Transaksi yang telah dikomplain.</p>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="berhasil" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Transaksi Berhasil</h3>
                <p>Transaksi yang berhasil.</p>
              </TabsContent>
              <TabsContent value="tidak-berhasil" className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Transaksi Tidak Berhasil</h3>
                <p>Transaksi yang tidak berhasil.</p>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}

// Sidebar
function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <li className="mb-4">
      <button
        onClick={onClick}
        className="flex items-center text-gray-700 hover:text-green-500 hover:bg-gray-100 p-2 rounded-lg transition-all duration-300 w-full text-left"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </button>
    </li>
  );
}
