import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
}

const CompanyProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Presiden Indonesia tanam saham di sektor pertanian",
      content: `
        Presiden Indonesia Investasi di Sektor Pertanian: Langkah Strategis untuk Pembangunan Ekonomi Berkelanjutan
        Jakarta, 9 Agustus 2024 - Presiden Indonesia telah mengambil langkah strategis dengan menanam saham di sektor pertanian,
        sebagai bagian dari upaya untuk memperkuat ketahanan pangan nasional dan mendorong pertumbuhan ekonomi yang berkelanjutan.
        Langkah ini menunjukkan komitmen pemerintah dalam mendukung sektor yang menjadi tulang punggung perekonomian Indonesia.
        Sektor pertanian memiliki peran penting dalam perekonomian Indonesia, menyumbang lebih dari 13% dari produk domestik bruto (PDB)
        dan menyediakan lapangan kerja bagi sekitar 30% dari angkatan kerja. Dengan investasi ini, Presiden berharap dapat meningkatkan
        produktivitas dan efisiensi di sektor pertanian, serta meningkatkan kesejahteraan petani di seluruh negeri. Fokus Investasi
        Presiden menanam saham di beberapa perusahaan pertanian yang bergerak di berbagai subsektor, termasuk tanaman pangan,
        perkebunan, hortikultura, dan peternakan. Salah satu fokus utama dari investasi ini adalah pada teknologi pertanian modern,
        seperti penggunaan sistem irigasi yang lebih efisien, pengembangan benih unggul, dan adopsi teknologi digital dalam pengelolaan
        lahan dan rantai pasokan. “Investasi ini bukan hanya soal keuntungan finansial, tetapi juga soal keberlanjutan. Kita ingin
        memastikan bahwa sektor pertanian kita mampu memenuhi kebutuhan pangan nasional sambil tetap menjaga kelestarian lingkungan,”
        ujar Presiden dalam pernyataannya.
      `,
      image: "https://unsplash.com/photos/aerial-photography-of-yellow-cultivator-on-brown-field-8yHxJV5PPsA"
    },
    {
      id: 2,
      title: "Bibit unggul asli Indonesia",
      content: `
        Presiden menyoroti pentingnya pengembangan bibit unggul asli Indonesia dalam investasi ini. Menurutnya, bibit unggul lokal
        memiliki potensi besar untuk meningkatkan hasil pertanian, karena telah beradaptasi dengan kondisi iklim dan tanah di berbagai
        wilayah Indonesia. Dalam konteks ini, investasi Presiden tidak hanya difokuskan pada aspek finansial, tetapi juga pada penelitian
        dan pengembangan bibit unggul yang dapat menghasilkan varietas tanaman dengan kualitas dan produktivitas tinggi. Inovasi dan
        Teknologi untuk Mendukung Pertanian Selain pengembangan bibit unggul, investasi ini juga diarahkan pada penerapan teknologi
        modern dalam proses pertanian. Presiden menggarisbawahi pentingnya adopsi teknologi seperti sistem irigasi cerdas, drone
        untuk pemantauan lahan, dan penggunaan aplikasi digital untuk manajemen pertanian. Dengan dukungan teknologi, petani dapat
        lebih efisien dalam mengelola lahan, mengurangi kerugian pasca panen, dan meningkatkan kualitas hasil pertanian. Dampak Positif
        bagi Perekonomian dan Kesejahteraan Petani Langkah Presiden ini diprediksi akan membawa dampak positif bagi perekonomian nasional.
        Dengan meningkatnya produktivitas pertanian, Indonesia dapat mengurangi ketergantungan pada impor pangan, menjaga stabilitas harga,
        dan memperkuat posisi sebagai negara agraris yang mandiri. Selain itu, kesejahteraan petani juga akan meningkat melalui akses
        yang lebih baik ke bibit unggul, teknologi, dan pasar. Investasi di sektor pertanian ini sejalan dengan visi pemerintah untuk
        membangun ekonomi yang inklusif dan berkelanjutan. Dengan fokus pada pengembangan bibit unggul asli Indonesia dan teknologi
        pertanian, Presiden berharap sektor ini dapat menjadi motor penggerak utama dalam mencapai ketahanan pangan dan kesejahteraan
        masyarakat secara keseluruhan.
      `,
      image: "https://unsplash.com/photos/young-farmers-examing-planted-young-corn-in-spring-qwyWheO1T48"
    },
    {
      id: 3,
      title: "Inovasi Pertanian Modern",
      content: `
        Inovasi pertanian modern menjadi salah satu pilar utama dalam upaya meningkatkan produktivitas dan efisiensi sektor pertanian.
        Teknologi seperti sistem irigasi pintar, penggunaan drone untuk pemantauan lahan, dan aplikasi manajemen pertanian semakin
        banyak diadopsi oleh petani. Teknologi-teknologi ini memungkinkan petani untuk mengelola lahan dengan lebih efisien, mengurangi
        kerugian pasca panen, dan meningkatkan hasil pertanian. Pengembangan teknologi pertanian tidak hanya berfokus pada peningkatan
        hasil produksi, tetapi juga pada keberlanjutan dan perlindungan lingkungan. Dengan terus berinovasi, sektor pertanian diharapkan
        dapat memenuhi kebutuhan pangan global sambil menjaga kelestarian sumber daya alam.
      `,
      image: "https://unsplash.com/photos/closeup-photography-of-green-plant-inside-green-house-oK9EKfqv8HE"
    }
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
      <nav className="sticky top-0 z-30 bg-[#8A9A5B] p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-2xl font-bold">HarvestHub</div>
          <ul className="flex space-x-4 text-white">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#about-us">Tentang Kami</a></li>
            <li><a href="#company-policy">Kebijakan Perusahaan</a></li>
            <li><a href="#certifications">Sertifikasi & Penghargaan</a></li>
            <li><a href="#blog">Blog atau Berita</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="relative w-full h-screen">
        <div className="absolute inset-0 bg-[#8A9A5B] opacity-50 z-10"></div>
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://www.youtube.com/watch?v=nziA33FrhoI&t=29s"
            type="video/mp4"
          />
        </video>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Selamat Datang di HarvestHub E-commerce
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Pelajari lebih lanjut tentang visi, misi, dan layanan kami
          </p>
          <Button variant="default" size="lg">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </section>

      <section id="about-us" className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              HarvestHub adalah platform e-commerce terkemuka yang menawarkan berbagai produk berkualitas tinggi dari berbagai
              kategori, termasuk elektronik, pakaian, peralatan rumah tangga, dan banyak lagi. Kami berkomitmen untuk menyediakan
              pengalaman belanja online yang aman, nyaman, dan memuaskan. Tim kami bekerja keras untuk memastikan bahwa setiap produk
              yang kami tawarkan memenuhi standar kualitas tertinggi, dan kami terus memperbarui katalog kami dengan produk-produk terbaru
              dan terbaik dari berbagai merek terpercaya. Kami juga berkomitmen untuk memberikan layanan pelanggan yang luar biasa, dengan
              dukungan yang cepat dan ramah untuk membantu Anda dengan semua pertanyaan dan kebutuhan Anda.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="company-policy" className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Kebijakan Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Di HarvestHub, kami berkomitmen untuk menjaga privasi dan keamanan data pelanggan kami, serta memastikan bahwa semua
              transaksi dilakukan dengan aman dan transparan. Selain itu, kami juga memiliki kebijakan pengembalian barang yang
              fleksibel untuk memastikan kepuasan pelanggan. Tim kami selalu siap untuk membantu dan menyelesaikan setiap masalah atau
              pertanyaan yang mungkin Anda miliki.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="certifications" className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Sertifikasi & Penghargaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#8A9A5B] h-24 flex items-center justify-center">
                <img
                  src="https://unsplash.com/photos/aerial-photography-of-yellow-cultivator-on-brown-field-8yHxJV5PPsA"
                  alt="Sertifikasi"
                  className="w-1/2 h-1/2 object-cover"
                />
              </div>
              <div className="bg-[#8A9A5B] h-24 flex items-center justify-center">
                <img
                  src="https://unsplash.com/photos/pdK87ZK6uN4"
                  alt="Penghargaan"
                  className="w-1/2 h-1/2 object-cover"
                />
              </div>
              <div className="bg-[#8A9A5B] h-24 flex items-center justify-center">
                <img
                  src="https://unsplash.com/photos/7P0DK2wzMWY"
                  alt="Sertifikasi"
                  className="w-1/2 h-1/2 object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="blog" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-2">Blog atau Berita</h2>
        <p className="text-muted mb-6">Subheading</p>

        <div className="space-y-6">
          {currentPosts.map((post) => (
            <Card key={post.id}>
              <div className="flex">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-1/4 object-cover"
                />
                <CardContent className="w-3/4">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <p className="text-black">
                    {post.id === expandedArticleId ? post.content : `${post.content.slice(0, 200)}...`}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleReadMore(post.id)}
                  >
                    {post.id === expandedArticleId ? "Lihat Sedikit..." : "Lanjutkan membaca..."}
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => handlePageChange("previous")}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="default"
              onClick={() => handlePageChange("next")}
              disabled={indexOfLastPost >= blogPosts.length}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyProfile;
