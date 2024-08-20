import { useState, useEffect } from "react";
import { fetchCurrentUser, logout } from "@/lib/api";
import { Link } from "react-router-dom";
import { url } from "inspector";

function AgricultureEcommerce() {
	return (
		<div>
			{/* Hero Section */}
			<header
				className='w-full min-h-screen flex items-center justify-center bg-cover bg-center'
				style={{
					backgroundImage: `url('../images/background.jpg')`,
				}}
			>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-black mb-2 -mt-2'>
						Produk Terbaik, Terpercaya, Langsung dari Petani Lokal!
					</h1>
					<div className='mt-4'>
						<button className='bg-black text-white px-4 py-2 rounded mr-2 mb-20 hover:shadow-lg transition-shadow duration-300'>
							Promo
						</button>
						<button className='bg-gray-300 px-4 py-2 rounded mb-40 hover:shadow-lg transition-shadow duration-300'>
							Produk Baru
						</button>
					</div>
				</div>
			</header>

			{/* Categories */}
			<section className='py-12'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-4 gap-4'>
						<div className='text-center relative hover:shadow-lg transition-shadow duration-300'>
							<Link to='/product'>
								<img
									src='../images/all-category.jpeg'
									alt='All Category'
									className='w-full rounded'
								/>
								<h3 className='mt-4 text-lg font-semibold'>Semua Kategori</h3>
							</Link>
						</div>
						<Link
							to='/productpage1'
							className='text-center relative hover:shadow-lg transition-shadow duration-300'
						>
							<img
								src='../images/vegetables.jpeg'
								alt='Vegetables'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>Sayuran</h3>
						</Link>
						<Link
							to='/productpage2'
							className='text-center relative hover:shadow-lg transition-shadow duration-300'
						>
							<img
								src='../images/fruits.jpeg'
								alt='Fruits'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>Buah</h3>
						</Link>
						<Link
							to='/productpage3'
							className='text-center relative hover:shadow-lg transition-shadow duration-300'
						>
							<img
								src='../images/bundling-package.jpeg'
								alt='Bundling Package'
								className='w-full rounded'
							/>
							<h3 className='mt-4 text-lg font-semibold'>Bundling Package</h3>
						</Link>
					</div>
				</div>
			</section>

			{/* Today's Offers */}
			<div className='container mx-auto p-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Penawaran Hari Ini</h1>
					<a href='#' className='text-blue-500'>
						View All
					</a>
				</div>
				<div className='grid grid-cols-5 gap-4'>
					{/* Product Item */}
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/telur-asin-brebes.jpg'
							alt='Telur Asin Brebes'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 11%</h3>
						<p className='text-gray-600'>Rp 7.500</p>
						<p className='text-gray-400 text-sm'>Telur Asin Brebes</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/apel-malang.jpeg'
							alt='Apel Malang'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 7%</h3>
						<p className='text-gray-600'>Rp 14.300</p>
						<p className='text-gray-400 text-sm'>Apel Malang</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/daging-ayam.jpeg'
							alt='Daging Ayam'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 10%</h3>
						<p className='text-gray-600'>Rp 26.500</p>
						<p className='text-gray-400 text-sm'>Daging Ayam</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/nanas-pemalang.jpg'
							alt='Nanas Pemalang'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Diskon 15%</h3>
						<p className='text-gray-600'>Rp 17.800</p>
						<p className='text-gray-400 text-sm'>Nanas Pemalang</p>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/kacang-mede.jpg'
							alt='Kacang Mede'
							className='w-full h-32 object-cover rounded'
						/>
						<h3 className='mt-4 text-lg font-semibold'>Discount 20%</h3>
						<p className='text-gray-600'>Rp 65.000</p>
						<p className='text-gray-400 text-sm'>Kacang Mede</p>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className='container mx-auto p-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Paling Laris</h1>
					<a href='#' className='text-blue-500'>
						View All
					</a>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{/* Product Card */}
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/beras-merah.jpg'
							alt='Beras Merah Cianjur'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 13.000</div>
						<div className='text-gray-600'>Beras Merah Cianjur</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/pepaya-california.jpg'
							alt='Pepaya California'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 12.000</div>
						<div className='text-gray-600'>Pepaya California</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/anggur.jpg'
							alt='Anggur'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 10.500</div>
						<div className='text-gray-600'>Anggur</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/alpukat-mentega.jpg'
							alt='Alpukat Mentega'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 25.000</div>
						<div className='text-gray-600'>Alpukat Mentega</div>
					</div>
					<div className='bg-white p-4 rounded shadow'>
						<img
							src='../images/pisang-sunpride.jpg'
							alt='Pisang Sunpride'
							className='w-full h-32 object-cover mb-4'
						/>
						<div className='text-lg font-semibold'>Rp 10.000</div>
						<div className='text-gray-600'>Pisang Sunpride</div>
					</div>
				</div>

				{/* Farmer Profile */}
				<div className='bg-white p-8 rounded shadow mt-8'>
					<div className='flex flex-col md:flex-row items-center'>
						<img
							src='../images/budi-santoso.jpg'
							alt='Budi Santoso'
							className='w-48 h-48 object-cover rounded-full md:mr-8'
						/>
						<div>
							<h2 className='text-xl font-bold mb-2'>Profil Petani</h2>
							<div className='text-gray-700'>
								<p>
									<strong>Nama:</strong> Budi Santoso
								</p>
								<p>
									<strong>Usia:</strong> 45 Tahun
								</p>
								<p>
									<strong>Lokasi:</strong> Desa Sumber Agung, Kabupaten Jember
								</p>
								<p className='mt-4'>
									Saya Budi Santoso, seorang petani yang telah menggeluti dunia
									pertanian sejak usia muda. Berasal dari keluarga petani, saya
									meneruskan tradisi ini dengan penuh dedikasi. Di lahan seluas
									2 hektar, saya mengelola berbagai jenis tanaman seperti padi,
									jagung, dan sayuran. Dengan pengalaman lebih dari 20 tahun,
									saya menguasai teknik bercocok tanam yang efisien dan ramah
									lingkungan. Saya juga aktif dalam penerapan teknologi
									pertanian terbaru untuk meningkatkan hasil panen dan kualitas
									produk.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AgricultureEcommerce;
