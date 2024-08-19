import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
}

const CompanyProfile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("about");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Inovasi Teknologi Pertanian: Mendorong Masa Depan Pertanian",
      content: `Teknologi pertanian telah mengalami kemajuan pesat dalam beberapa tahun terakhir. Dari drone yang memantau kesehatan tanaman hingga sistem irigasi otomatis yang menghemat air, teknologi modern menawarkan solusi inovatif untuk tantangan yang dihadapi oleh petani saat ini. Di HarvestHub, kami mengintegrasikan teknologi ini ke dalam platform kami untuk memberikan petani alat yang mereka butuhkan untuk meningkatkan hasil panen dan mengelola operasi mereka dengan lebih efisien. 
      
      Salah satu contoh teknologi yang kami implementasikan adalah sensor tanah pintar yang memantau kelembapan tanah secara real-time. Data yang dikumpulkan membantu petani membuat keputusan lebih baik tentang irigasi dan pemupukan. Kami juga bekerja sama dengan perusahaan teknologi untuk menyediakan drone yang dapat memetakan lahan dan mengidentifikasi area yang membutuhkan perhatian khusus. Dengan solusi ini, kami bertujuan untuk membantu petani meningkatkan produktivitas dan mengurangi pemborosan.`,
      image: "/images/Blog1.avif",
    },
    {
      id: 2,
      title:
        "Pertanian Berkelanjutan: Melindungi Planet Sambil Memenuhi Kebutuhan Pangan",
      content: `Pertanian berkelanjutan adalah tentang menemukan keseimbangan antara produksi pangan dan perlindungan lingkungan. Dengan mengadopsi praktik seperti rotasi tanaman, penggunaan kompos, dan pengelolaan hama secara alami, petani dapat meningkatkan kesuburan tanah dan mengurangi dampak negatif terhadap ekosistem. Kami di HarvestHub menyediakan produk dan solusi yang mendukung praktik ini, memastikan bahwa petani dapat memenuhi kebutuhan pangan dunia tanpa merusak lingkungan.
      
      Kami juga mendorong penggunaan energi terbarukan dalam pertanian, seperti panel surya untuk mengurangi ketergantungan pada sumber energi fosil. Melalui berbagai inisiatif, kami bekerja untuk mengurangi jejak karbon dan mendukung praktik yang melindungi bumi untuk generasi mendatang. Program pelatihan kami memberikan petani pengetahuan dan keterampilan yang diperlukan untuk menerapkan teknik berkelanjutan yang bermanfaat bagi lingkungan dan hasil panen mereka.`,
      image: "/images/Blog2.avif",
    },
    {
      id: 3,
      title: "Manfaat Pertanian Organik: Lebih dari Sekadar Pilihan",
      content: `Pertanian organik tidak hanya menguntungkan bagi kesehatan manusia tetapi juga untuk kesehatan planet. Dengan menghindari penggunaan pestisida sintetis dan pupuk kimia, pertanian organik membantu menjaga kualitas tanah dan air. Produk organik kami yang tersedia di platform kami memastikan bahwa konsumen mendapatkan produk yang tidak hanya lezat tetapi juga diproduksi dengan cara yang bertanggung jawab.
      
      Pertanian organik juga meningkatkan biodiversitas di lahan pertanian, yang mendukung ekosistem yang sehat dan seimbang. Kami mengedukasi petani tentang teknik organik, termasuk penggunaan pestisida alami dan pengelolaan tanah yang baik. Selain itu, produk organik sering kali memiliki nilai gizi yang lebih tinggi, memberikan manfaat kesehatan tambahan kepada konsumen. Bergabunglah dengan kami dalam mendukung pertanian organik dan nikmati manfaatnya untuk kesehatan Anda dan lingkungan.`,
      image: "/images/Blog3.avif",
    },
  ];

  const postsPerPage = 2;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReadMore = (id: number) => {
    setExpandedArticleId((prevId) => (prevId === id ? null : id));
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
    <div className="flex flex-col h-screen">
      <header className="w-full flex flex-col h-full">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <TabsList className="flex w-full bg-gray-200 border-b border-gray-300">
            <TabsTrigger
              value="about"
              className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
                activeTab === "about"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tentang Kami
            </TabsTrigger>
            <TabsTrigger
              value="policy"
              className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
                activeTab === "policy"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Kebijakan Perusahaan
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
                activeTab === "certifications"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sertifikasi & Penghargaan
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
                activeTab === "blog"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Blog atau Berita
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="about" className="h-full p-4">
              <section id="home" className="relative w-full h-full mb-6">
                <div className="absolute inset-0 bg-[#8A9A5B] opacity-30 z-10"></div>
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Produk terpercaya Langsung dari Petani Lokal
                  </h1>
                  <p className="text-lg md:text-xl mb-8">
                    Pelajari lebih lanjut tentang visi, misi, dan layanan
                    HarvestHub
                  </p>
                </div>
                <video
                  src="/images/The Farmer.mp4"
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </section>

              <section
                id="about-us"
                className="container mx-auto px-4 py-12 mb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Tentang Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-justify">
                      HarvestHub adalah lebih dari sekadar platform e-commerce;
                      kami adalah mitra strategis dalam perjalanan pertanian
                      modern. Kami berkomitmen untuk menghubungkan petani lokal
                      dengan pasar global melalui teknologi canggih dan solusi
                      inovatif.
                      <br />
                      <br />
                      Dengan latar belakang dalam pertanian organik dan ramah
                      lingkungan, kami memahami tantangan yang dihadapi petani
                      dalam menjalankan praktik yang berkelanjutan. Oleh karena
                      itu, kami menawarkan berbagai produk dan layanan yang
                      dirancang untuk meningkatkan efisiensi dan hasil panen.
                      Platform kami menyajikan teknologi terbaru seperti sensor
                      pintar, analitik data, dan sistem manajemen pertanian
                      terintegrasi, yang memungkinkan petani untuk membuat
                      keputusan yang lebih baik dan berbasis data.
                      <br />
                      <br />
                      Kami juga memiliki program pelatihan dan dukungan untuk
                      petani, memberikan mereka keterampilan dan pengetahuan
                      yang dibutuhkan untuk sukses dalam praktik pertanian
                      modern. Visi kami adalah menciptakan ekosistem di mana
                      semua orang memiliki akses ke makanan sehat dan
                      berkelanjutan, sambil memberdayakan komunitas pertanian
                      dengan alat dan sumber daya yang mereka butuhkan untuk
                      berkembang.
                      <br />
                      <br />
                      Bergabunglah dengan kami di HarvestHub untuk menjadi
                      bagian dari perubahan positif dalam industri pertanian.
                      Bersama-sama, kita dapat mencapai masa depan yang lebih
                      baik dan lebih berkelanjutan.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="policy" className="h-full p-4">
              <section
                id="company-policy"
                className="container mx-auto px-4 py-12 mb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Kebijakan Perusahaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-justify">
                      Di HarvestHub, kami memegang teguh prinsip-prinsip
                      keberlanjutan dan tanggung jawab sosial. Kami percaya
                      bahwa pertanian berkelanjutan adalah kunci untuk masa
                      depan yang lebih baik dan bahwa setiap keputusan bisnis
                      harus mempertimbangkan dampaknya terhadap masyarakat dan
                      lingkungan.
                      <br />
                      <br />
                      Kebijakan perusahaan kami mencakup:
                      <ul className="list-disc ml-6 mt-4">
                        <li>
                          Komitmen terhadap praktik pertanian berkelanjutan.
                        </li>
                        <li>
                          Penggunaan teknologi ramah lingkungan untuk mengurangi
                          jejak karbon.
                        </li>
                        <li>
                          Transparansi dalam rantai pasokan dan pengadaan.
                        </li>
                        <li>
                          Mendukung inisiatif sosial dan komunitas lokal untuk
                          kesejahteraan bersama.
                        </li>
                        <li>
                          Mematuhi standar etika dan hukum yang berlaku di
                          setiap aspek bisnis kami.
                        </li>
                      </ul>
                      <br />
                      Kami percaya bahwa keberhasilan kami bergantung pada
                      keberhasilan komunitas yang kami layani. Oleh karena itu,
                      kami selalu berusaha untuk menjalankan bisnis kami dengan
                      integritas dan tanggung jawab yang tinggi.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="certifications" className="h-full p-4">
              <section
                id="certifications"
                className="container mx-auto px-4 py-12 mb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Sertifikasi & Penghargaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center">
                        <img
                          src="/images/certificate1.jpeg"
                          alt="Sertifikasi 1"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-2 text-lg font-semibold">
                          Best E-commerce
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src="/images/certificate2.jpeg"
                          alt="Sertifikasi 2"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-2 text-lg font-semibold">
                          Sertifikasi untuk Inovasi Agriculture
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src="/images/certificate3.jpeg"
                          alt="Sertifikasi 3"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-2 text-lg font-semibold">
                          Penghargaan dari Bumi Hijau
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-justify mt-6">
                      Kami bangga dengan pencapaian kami dalam industri ini,
                      yang mencerminkan dedikasi kami terhadap kualitas dan
                      keberlanjutan. Sertifikasi dan penghargaan yang kami
                      terima adalah bukti komitmen kami untuk selalu memberikan
                      yang terbaik bagi pelanggan kami. Kami terus berinovasi
                      dan memperbaiki standar kami untuk memastikan bahwa kami
                      tetap menjadi pemimpin dalam industri pertanian
                      berkelanjutan.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="blog" className="h-full p-4">
              <section id="blog" className="container mx-auto px-4 py-12 mb-6">
                <h2 className="text-2xl font-bold mb-6">Blog atau Berita</h2>
                {currentPosts.map((post) => (
                  <Card key={post.id} className="mb-6">
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto mb-4 rounded-lg shadow-lg"
                      />
                      <p className="text-lg text-justify mb-4">
                        {expandedArticleId === post.id
                          ? post.content
                          : `${post.content.slice(0, 300)}...`}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => handleReadMore(post.id)}
                      >
                        {expandedArticleId === post.id
                          ? "Baca Lebih Sedikit"
                          : "Baca Lebih Banyak"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-end mt-6 space-x-2">
                  <Button
                    onClick={() => handlePageChange("previous")}
                    disabled={currentPage === 1}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() => handlePageChange("next")}
                    disabled={indexOfLastPost >= blogPosts.length}
                  >
                    Berikutnya
                  </Button>
                </div>
              </section>
            </TabsContent>
          </div>
        </Tabs>
      </header>
    </div>
  );
};

export default CompanyProfile;
