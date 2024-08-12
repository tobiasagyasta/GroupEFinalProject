import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
}

const CompanyProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Inovasi Teknologi Pertanian: Mendorong Masa Depan Pertanian",
      content: `Teknologi pertanian telah mengalami kemajuan pesat dalam beberapa tahun terakhir. Dari drone yang memantau kesehatan tanaman hingga sistem irigasi otomatis yang menghemat air, teknologi modern menawarkan solusi inovatif untuk tantangan yang dihadapi oleh petani saat ini. Di HarvestHub, kami mengintegrasikan teknologi ini ke dalam platform kami untuk memberikan petani alat yang mereka butuhkan untuk meningkatkan hasil panen dan mengelola operasi mereka dengan lebih efisien.`,
      image: "/images/Blog1.avif",
    },
    {
      id: 2,
      title: "Pertanian Berkelanjutan: Melindungi Planet Sambil Memenuhi Kebutuhan Pangan",
      content: `Pertanian berkelanjutan adalah tentang menemukan keseimbangan antara produksi pangan dan perlindungan lingkungan. Dengan mengadopsi praktik seperti rotasi tanaman, penggunaan kompos, dan pengelolaan hama secara alami, petani dapat meningkatkan kesuburan tanah dan mengurangi dampak negatif terhadap ekosistem. Kami di HarvestHub menyediakan produk dan solusi yang mendukung praktik ini, memastikan bahwa petani dapat memenuhi kebutuhan pangan dunia tanpa merusak lingkungan.`,
      image: "/images/Blog2.avif",
    },
    {
      id: 3,
      title: "Manfaat Pertanian Organik: Lebih dari Sekadar Pilihan",
      content: `Pertanian organik tidak hanya menguntungkan bagi kesehatan manusia tetapi juga untuk kesehatan planet. Dengan menghindari penggunaan pestisida sintetis dan pupuk kimia, pertanian organik membantu menjaga kualitas tanah dan air. Produk organik kami yang tersedia di platform kami memastikan bahwa konsumen mendapatkan produk yang tidak hanya lezat tetapi juga diproduksi dengan cara yang bertanggung jawab. Bergabunglah dengan kami dalam mendukung pertanian organik dan nikmati manfaatnya untuk kesehatan Anda dan lingkungan.`,
      image: "/images/Blog3.avif",
    },
  ];

  const postsPerPage = 2;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReadMore = (id: number) => {
    setExpandedArticleId(id);
  };

  const handlePageChange = (direction: "next" | "previous") => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && indexOfLastPost < blogPosts.length) {
        return prevPage + 1;
      } else if (direction === "previous" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  return (
    <div>
      <nav className="bg-white shadow p-2 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="w-16 h-auto"
          />
        </Link>
        <div className="space-x-4">
          <a
            href="#home"
            className="text-gray-700 border border-gray-300 rounded px-3 py-1 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Beranda
          </a>
          <a
            href="#about-us"
            className="text-gray-700 border border-gray-300 rounded px-3 py-1 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Tentang Kami
          </a>
          <a
            href="#company-policy"
            className="text-gray-700 border border-gray-300 rounded px-3 py-1 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Kebijakan Perusahaan
          </a>
          <a
            href="#certifications"
            className="text-gray-700 border border-gray-300 rounded px-3 py-1 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Sertifikasi & Penghargaan
          </a>
          <a
            href="#blog"
            className="text-gray-700 border border-gray-300 rounded px-3 py-1 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Blog atau Berita
          </a>
        </div>
      </nav>

      <section id="home" className="relative w-full h-screen mb-2">
        <div className="absolute inset-0 bg-[#8A9A5B] opacity-50 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Selamat Datang di HarvestHub E-commerce
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Pelajari lebih lanjut tentang visi, misi, dan layanan kami
          </p>
          <Link to="#about-us">
            <Button variant="default" size="lg">
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </div>
        <video
          src="/images/The Farmer.mp4"
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section id="about-us" className="container mx-auto px-4 py-12 mb-2">
        <Card>
          <CardHeader>
            <CardTitle>Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-justify">
              HarvestHub adalah lebih dari sekadar platform e-commerce; kami
              adalah mitra strategis dalam perjalanan pertanian modern. Kami
              berkomitmen untuk menghubungkan petani lokal dengan pasar global
              melalui teknologi canggih dan solusi inovatif.
              <br />
              <br />
              Dengan latar belakang dalam pertanian organik dan ramah
              lingkungan, kami memahami tantangan yang dihadapi petani dalam
              menjalankan praktik yang berkelanjutan. Oleh karena itu, kami
              menawarkan berbagai produk dan layanan yang dirancang untuk
              meningkatkan efisiensi dan hasil panen. Platform kami menyajikan
              teknologi terbaru seperti sensor pintar, analitik data, dan sistem
              manajemen pertanian terintegrasi, yang memungkinkan petani untuk
              membuat keputusan yang lebih baik dan berbasis data.
              <br />
              <br />
              Visi kami adalah menciptakan ekosistem di mana semua orang
              memiliki akses ke makanan sehat dan berkelanjutan, sambil
              memberdayakan komunitas pertanian dengan alat dan sumber daya yang
              mereka butuhkan untuk berkembang. Misi kami adalah menjembatani
              kesenjangan antara petani dan konsumen dengan memberikan produk
              yang berkualitas tinggi dan mempromosikan praktik pertanian yang
              bertanggung jawab.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="company-policy" className="container mx-auto px-4 py-12 mb-2">
        <Card>
          <CardHeader>
            <CardTitle>Kebijakan Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-justify">
              Di HarvestHub, kami memegang teguh prinsip-prinsip keberlanjutan
              dan tanggung jawab sosial. Kami percaya bahwa pertanian
              berkelanjutan adalah kunci untuk masa depan yang lebih baik dan
              bahwa setiap keputusan bisnis harus mempertimbangkan dampaknya
              terhadap masyarakat dan lingkungan.
              <br />
              <br />
              Kebijakan perusahaan kami mencakup:
              <ul className="list-disc ml-6 mt-4">
                <li>Komitmen terhadap praktik pertanian berkelanjutan.</li>
                <li>
                  Penggunaan teknologi ramah lingkungan untuk mengurangi jejak
                  karbon.
                </li>
                <li>Transparansi dalam rantai pasokan dan pengadaan.</li>
                <li>
                  Mendukung inisiatif sosial dan komunitas lokal untuk
                  kesejahteraan bersama.
                </li>
              </ul>
              <br />
              Kami percaya bahwa keberhasilan kami bergantung pada keberhasilan
              komunitas yang kami layani. Oleh karena itu, kami selalu
              berusaha untuk menjalankan bisnis kami dengan integritas dan
              tanggung jawab yang tinggi.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="certifications" className="container mx-auto px-4 py-12 mb-2">
        <Card>
          <CardHeader>
            <CardTitle>Sertifikasi & Penghargaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img
                src="/images/certificate1.jpeg"
                alt="Sertifikasi 1"
                className="rounded-lg"
              />
              <img
                src="/images/certificate2.jpeg"
                alt="Sertifikasi 2"
                className="rounded-lg"
              />
              <img
                src="/images/certificate3.jpeg"
                alt="Sertifikasi 3"
                className="rounded-lg"
              />
            </div>
            <p className="text-lg text-justify mt-6">
              Kami bangga dengan pencapaian kami dalam industri ini, yang
              mencerminkan dedikasi kami terhadap kualitas dan keberlanjutan.
              Sertifikasi dan penghargaan yang kami terima adalah bukti
              komitmen kami untuk selalu memberikan yang terbaik bagi pelanggan
              kami.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="blog" className="container mx-auto px-4 py-12 mb-2">
        <h2 className="text-2xl font-bold mb-8">Blog atau Berita</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPosts.map((post) => (
            <Card key={post.id} className="mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-justify">
                  {expandedArticleId === post.id
                    ? post.content
                    : post.content.slice(0, 100) + "..."}
                </p>
                {expandedArticleId !== post.id && (
                  <Button
                    variant="link"
                    onClick={() => handleReadMore(post.id)}
                    className="text-blue-500 mt-2"
                  >
                    Lanjutkan Membaca
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Button
            onClick={() => handlePageChange("previous")}
            disabled={currentPage === 1}
            className="mr-4"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={indexOfLastPost >= blogPosts.length}
          >
            Next
          </Button>
        </div>
      </section>

      <footer className="bg-white p-8 shadow mt-8">
				<div className="container mx-auto flex justify-between items-start">
					<div>
						<h3 className="text-lg font-bold mb-2">Follow Us</h3>
						<div className="space-x-4">
							<a href="#" className="text-gray-700">
								<FontAwesomeIcon icon={faFacebookF} size="lg" />
							</a>
							<a href="#" className="text-gray-700">
								<FontAwesomeIcon icon={faTwitter} size="lg" />
							</a>
							<a href="#" className="text-gray-700">
								<FontAwesomeIcon icon={faInstagram} size="lg" />
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-2">Use Cases</h3>
						<ul className="text-gray-700">
							<li>
								<a href="#">Blog</a>
							</li>
							<li>
								<a href="#">Career</a>
							</li>
							<li>
								<a href="#">Affiliate Program</a>
							</li>
							<li>
								<a href="#">Promo</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-2">Explore</h3>
						<ul className="text-gray-700">
							<li>
								<a href="#">Design</a>
							</li>
							<li>
								<a href="#">Prototyping</a>
							</li>
							<li>
								<a href="#">Development features</a>
							</li>
							<li>
								<a href="#">Design systems</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-2">Resources</h3>
						<ul className="text-gray-700">
							<li>
								<a href="#">Blog</a>
							</li>
							<li>
								<a href="#">Best practices</a>
							</li>
							<li>
								<a href="#">Support</a>
							</li>
							<li>
								<a href="#">Developers</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
    </div>
  );
};

export default CompanyProfile;
