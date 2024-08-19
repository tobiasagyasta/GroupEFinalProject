import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/lib/Header";
import Footer from "@/lib/Footer";
import { FaCartPlus, FaHeart, FaDollarSign } from "react-icons/fa";
import { Review, reviewsData } from "@/lib/ReviewsData";

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  additionalImages: string[];
  sellerName: string;
  sellerLocation: string;
  quantity: number;
}

const fetchProductById = async (id: string): Promise<Product> => {
  const products: Record<string, Product> = {
    "1": {
      id: "1",
      name: "Beras Merah",
      image: "../images/Beras Merah.jpg",
      price: "10000",
      description:
        "Nikmati kelezatan dan manfaat kesehatan dari Beras Merah kami! Dengan kandungan serat tinggi dan nutrisi alami, beras ini adalah pilihan ideal untuk hidangan sehat. Memiliki rasa nutty dan tekstur kenyal, beras merah kami sempurna sebagai pengganti beras putih. Dikemas dalam kemasan kedap udara untuk menjaga kesegaran, beras ini bebas pestisida dan ramah lingkungan. Ideal untuk berbagai hidangan, dari nasi goreng hingga sushi.",
      additionalImages: [
        "../images/Beras Merah.jpg",
        "../images/Beras Merah.jpg",
      ],
      sellerName: "HarvestHub",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "2": {
      id: "2",
      name: "Kacang Mede",
      image: "../images/Kacang Mede.jpg",
      price: "12000",
      description:
        "Rasakan kelezatan kacang mede premium kami yang renyah dan lezat! Kacang mede ini dipilih dengan cermat untuk memastikan kualitas terbaik dan rasa yang tiada tanding. Kaya akan protein, serat, dan lemak sehat, kacang mede kami adalah camilan ideal atau bahan tambahan yang sempurna untuk berbagai hidangan. Dapat dinikmati langsung, sebagai topping salad, atau dalam berbagai resep memasak. Kemasan kedap udara menjaga kesegaran dan kerenyahan setiap kacang. Nikmati camilan sehat dan bergizi setiap hari dengan kacang mede premium kami!",
      additionalImages: [
        "../images/Kacang Mede.jpg",
        "../images/Kacang Mede.jpg",
      ],
      sellerName: "HarvestHub",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "3": {
      id: "3",
      name: "Kol",
      image: "../images/Kol.jpg",
      price: "15000",
      description:
        "Tambahkan kelezatan dan kesegaran pada hidangan Anda dengan kol segar kami! Dipilih dari ladang terbaik, kol ini memiliki daun yang renyah dan rasa yang segar. Ideal untuk berbagai masakan, dari salad yang menyegarkan hingga sup dan tumisan yang menggugah selera. Kaya akan vitamin dan serat, kol ini memberikan manfaat kesehatan yang optimal. Kemasan kami menjaga kesegaran dan kualitas setiap kepala kol. Ciptakan hidangan sehat dan lezat dengan kol segar berkualitas kami!",
      additionalImages: ["../images/Kol.jpg", "../images/Kol.jpg"],
      sellerName: "GreenEarth",
      sellerLocation: "Yogyakarta",
      quantity: 210,
    },
    "4": {
      id: "4",
      name: "Wortel Segar",
      image: "../images/Terong.jpg",
      price: "20000",
      description:
        "Rasakan kelezatan terong segar kami, pilihan ideal untuk berbagai hidangan lezat! Terong kami memiliki kulit yang halus dan daging yang lembut, sempurna untuk dipanggang, ditumis, atau dibuat dalam hidangan khas seperti capcay dan moussaka. Dipilih dengan teliti untuk memastikan kualitas terbaik, terong ini menawarkan rasa yang kaya dan tekstur yang memuaskan. Tambahkan sentuhan istimewa pada masakan Anda dengan terong segar kami, kaya akan nutrisi dan penuh cita rasa!",
      additionalImages: ["../images/Terong.jpg", "../images/Terong.jpg"],
      sellerName: "VeggieDelight",
      sellerLocation: "Semarang",
      quantity: 10,
    },
    "5": {
      id: "5",
      name: "Tomat",
      image: "../images/Tomat.jpg",
      price: "18000",
      description:
        "Tomat segar kami, ideal untuk menambah rasa pada berbagai hidangan! Tomat kami memiliki warna cerah, daging yang juicy, dan rasa yang manis-pedas, cocok untuk salad, saus, atau sebagai bahan pelengkap masakan. Dipilih dari kebun terbaik, tomat ini mengandung nutrisi penting dan antioksidan yang bermanfaat untuk kesehatan. Segar dan lezat, tomat ini akan meningkatkan setiap hidangan Anda!",
      additionalImages: ["../images/Tomat.jpg", "../images/Tomat.jpg"],
      sellerName: "HerbMaster",
      sellerLocation: "Surabaya",
      quantity: 100,
    },
    "6": {
      id: "6",
      name: "Tomat Ceri",
      image: "../images/Tomat Ceri.jpg",
      price: "25000",
      description:
        "Dengan ukuran yang kompak dan rasa yang manis, tomat ceri ini adalah pilihan sempurna untuk camilan sehat, salad segar, atau tambahan pada hidangan favorit Anda. Dipetik dengan tangan dari kebun kami, tomat ceri ini kaya akan vitamin dan antioksidan, menjadikannya tidak hanya lezat tetapi juga bermanfaat untuk kesehatan. Ideal untuk dinikmati langsung atau sebagai garnish untuk hidangan yang lebih menarik!",
      additionalImages: [
        "../images/Tomat Ceri.jpg",
        "../images/Tomat Ceri.jpg",
      ],
      sellerName: "SpiceWorld",
      sellerLocation: "Medan",
      quantity: 50,
    },
    "7": {
      id: "7",
      name: "Cabe Merah Keriting",
      image: "../images/Cabe Merah Keriting.jpg",
      price: "30000",
      description:
        "Tambahkan sentuhan pedas dan warna cerah ke hidangan Anda dengan cabe merah keriting kami! Cabe ini memiliki tekstur keriting khas yang memberikan intensitas rasa dan aroma pedas yang kuat. Ideal untuk bumbu masakan, sambal, atau sebagai bahan tambahan dalam berbagai resep, cabe merah keriting ini dipilih dengan cermat untuk memastikan kesegaran dan kualitas tinggi. Dengan kandungan vitamin C yang tinggi, cabe ini juga baik untuk meningkatkan daya tahan tubuh. Nikmati rasa pedas yang autentik dan manfaat kesehatan dari cabe merah keriting kami!",
      additionalImages: [
        "../images/Cabe Merah Keriting.jpg",
        "../images/Cabe Merah Keriting.jpg",
      ],
      sellerName: "TropicalFruits",
      sellerLocation: "Bali",
      quantity: 15,
    },
    "8": {
      id: "8",
      name: "Cabe Rawit",
      image: "../images/Cabe Rawit.jpg",
      price: "28000",
      description:
        "Rasakan sensasi pedas yang menggigit dengan cabe merah rawit kami! Cabe ini terkenal karena rasa pedasnya yang intens dan aromanya yang khas. Cocok untuk menambah cita rasa pada sambal, bumbu masakan, atau hidangan favorit Anda, cabe merah rawit kami dipilih secara teliti untuk memastikan kualitas dan kesegarannya. Dengan kandungan vitamin dan antioksidan yang tinggi, cabe merah rawit juga memberikan manfaat kesehatan tambahan. Pilihan sempurna untuk penggemar pedas yang mencari bahan berkualitas untuk masakan mereka!",
      additionalImages: [
        "../images/Cabe Rawit.jpg",
        "../images/Cabe Rawit.jpg",
      ],
      sellerName: "SpiceKing",
      sellerLocation: "Bandung",
      quantity: 150,
    },
    "9": {
      id: "9",
      name: "Paprika",
      image: "../images/Paprika.jpg",
      price: "22000",
      description: "Description for Paprika.",
      additionalImages: ["../images/Paprika.jpg", "../images/Paprika.jpg"],
      sellerName: "GourmetStore",
      sellerLocation: "Jakarta",
      quantity: 155,
    },
    "10": {
      id: "10",
      name: "Lada Hitam",
      image: "../images/Lada Hitam.jpg",
      price: "14000",
      description:
        "Tambahkan warna dan rasa pada hidangan Anda dengan paprika segar kami! Paprika ini memiliki tekstur renyah dan rasa manis yang lembut, menjadikannya bahan yang sempurna untuk salad, tumisan, atau sebagai tambahan pada berbagai masakan. Kaya akan vitamin C dan antioksidan, paprika tidak hanya mempercantik piring Anda tetapi juga memberikan manfaat kesehatan. Pilihan ideal untuk menciptakan hidangan yang lezat dan bergizi, paprika kami dipilih dengan cermat untuk kualitas dan kesegaran yang optimal.",
      additionalImages: [
        "../images/Lada Hitam.jpg",
        "../images/Lada Hitam.jpg",
      ],
      sellerName: "FarmFresh",
      sellerLocation: "Bogor",
      quantity: 110,
    },
    "11": {
      id: "11",
      name: "Seledri",
      image: "../images/Seledri.jpg",
      price: "35000",
      description:
        "Seledri segar kami adalah pilihan sempurna untuk menambah kerenyahan dan rasa pada hidangan Anda! Dengan tekstur yang renyah dan rasa yang menyegarkan, seledri ideal untuk salad, sup, atau sebagai camilan sehat. Mengandung vitamin K dan berbagai nutrisi penting, seledri juga bermanfaat untuk kesehatan tubuh. Dipilih secara cermat untuk memastikan kualitas dan kesegaran terbaik, seledri kami akan membuat hidangan Anda lebih lezat dan bergizi.",
      additionalImages: ["../images/Seledri.jpg", "../images/Seledri.jpg"],
      sellerName: "VeggieFarm",
      sellerLocation: "Cirebon",
      quantity: 154,
    },
    "12": {
      id: "12",
      name: "Wortel",
      image: "../images/Wortel.jpg",
      price: "40000",
      description:
        "Wortel segar kami adalah pilihan ideal untuk menambah rasa manis alami dan nutrisi pada hidangan Anda! Dengan tekstur renyah dan rasa yang alami, wortel cocok untuk salad, sup, atau sebagai camilan sehat. Kaya akan vitamin A, serat, dan antioksidan, wortel mendukung kesehatan mata dan sistem pencernaan. Dipilih dengan cermat untuk memastikan kualitas dan kesegaran terbaik, wortel kami akan membuat setiap hidangan lebih lezat dan bergizi.",
      additionalImages: ["../images/Wortel.jpg", "../images/Wortel.jpg"],
      sellerName: "HarvestKing",
      sellerLocation: "Makassar",
      quantity: 1230,
    },
    "13": {
      id: "13",
      name: "Jahe",
      image: "../images/Jahe.jpg",
      price: "25000",
      description:
        "Jahe segar kami adalah bahan dapur yang wajib ada untuk menambahkan cita rasa pedas dan aroma khas pada hidangan Anda. Dengan rasa hangat dan menyegarkan, jahe ideal untuk digunakan dalam berbagai masakan, teh, atau minuman kesehatan. Jahe juga dikenal memiliki sifat anti-inflamasi dan antioksidan, mendukung pencernaan dan meningkatkan sistem kekebalan tubuh. Pilih jahe segar kami untuk kualitas dan kesegaran yang terbaik.",
      additionalImages: ["../images/Jahe.jpg", "../images/Jahe.jpg"],
      sellerName: "OrganicVeg",
      sellerLocation: "Bali",
      quantity: 1110,
    },
    "14": {
      id: "14",
      name: "Bawang Bombai",
      image: "../images/Bawang Bombai.jpg",
      price: "13000",
      description:
        "Bawang bombai kami adalah pilihan sempurna untuk menambah cita rasa gurih dan sedikit manis pada masakan Anda. Dengan tekstur yang renyah dan rasa yang lebih lembut dibandingkan bawang merah, bawang bombai ideal untuk digunakan dalam sup, tumisan, atau sebagai bahan dasar saus. Setiap bawang bombai segar kami memberikan aroma yang harum dan rasa yang menggugah selera, menjadikannya bahan penting di dapur Anda. Dapatkan bawang bombai berkualitas tinggi kami untuk meningkatkan setiap hidangan dengan rasa yang lezat.",
      additionalImages: [
        "../images/Bawang Bombai.jpg",
        "../images/Bawang Bombai.jpg",
      ],
      sellerName: "GreenMarket",
      sellerLocation: "Surabaya",
      quantity: 1500,
    },
    "15": {
      id: "15",
      name: "Bawang Putih",
      image: "../images/Bawang Putih.jpg",
      price: "18000",
      description:
        "Bawang putih segar kami adalah bumbu serbaguna yang wajib ada di setiap dapur. Dengan aroma yang tajam dan rasa yang kuat, bawang putih memberikan kelezatan dan kedalaman rasa pada berbagai hidangan, mulai dari tumisan hingga saus dan marinades. Selain meningkatkan cita rasa masakan, bawang putih juga dikenal dengan manfaat kesehatan alaminya, termasuk sifat antioksidan dan anti-inflamasi. Pilih bawang putih kami untuk menambahkan sentuhan khas dan manfaat kesehatan pada setiap hidangan Anda.",
      additionalImages: [
        "../images/Bawang Putih.jpg",
        "../images/Bawang Putih.jpg",
      ],
      sellerName: "HealthyVeg",
      sellerLocation: "Jakarta",
      quantity: 2345,
    },
    "16": {
      id: "16",
      name: "Bawang Merah",
      image: "../images/Bawang Merah.jpg",
      price: "32000",
      description:
        "Dengan tekstur yang renyah dan rasa yang lebih manis dibandingkan bawang putih, bawang merah adalah bahan penting dalam berbagai resep, mulai dari salad, tumisan, hingga hidangan berkuah. Kaya akan vitamin dan mineral, bawang merah juga menawarkan manfaat kesehatan, termasuk sifat antioksidan dan anti-inflamasi. Tambahkan bawang merah ke dapur Anda untuk meningkatkan kualitas dan rasa masakan Anda.",
      additionalImages: [
        "../images/Bawang Merah.jpg",
        "../images/Bawang Merah.jpg",
      ],
      sellerName: "VeggieWorld",
      sellerLocation: "Bandung",
      quantity: 133,
    },
    "17": {
      id: "17",
      name: "Almond",
      image: "../images/Almond.jpg",
      price: "22000",
      description:
        "Almond premium kami adalah camilan yang sempurna untuk meningkatkan kesehatan Anda. Dengan rasa yang kaya dan renyah, almond kaya akan protein, serat, serta vitamin dan mineral penting seperti vitamin E, magnesium, dan kalsium. Ideal untuk dikonsumsi langsung, dijadikan topping salad, atau dicampur dalam smoothie. Almond juga dapat membantu menjaga kesehatan jantung, mengontrol gula darah, dan memberikan energi sepanjang hari. Nikmati kelezatan dan manfaat kesehatan dari almond berkualitas tinggi ini.",
      additionalImages: ["../images/Almond.jpg", "../images/Almond.jpg"],
      sellerName: "FarmersMarket",
      sellerLocation: "Yogyakarta",
      quantity: 1534,
    },
    "18": {
      id: "18",
      name: "Bayam",
      image: "../images/Bayam.jpg",
      price: "28000",
      description:
        "Temukan kelezatan dan manfaat kesehatan dari bayam segar kami. Bayam ini kaya akan vitamin A, vitamin C, zat besi, dan kalsium, menjadikannya tambahan sempurna untuk diet sehat Anda. Daunnya yang hijau cerah dan renyah cocok untuk berbagai hidangan, mulai dari salad segar hingga tumisan lezat. Bayam juga dikenal dapat membantu meningkatkan kesehatan mata, memperkuat sistem kekebalan tubuh, dan memberikan energi. Dapatkan bayam berkualitas tinggi ini untuk menambah kelezatan dan gizi pada setiap hidangan Anda.",
      additionalImages: ["../images/Bayam.jpg", "../images/Bayam.jpg"],
      sellerName: "RootVeg",
      sellerLocation: "Semarang",
      quantity: 213,
    },
    "19": {
      id: "19",
      name: "Timun",
      image: "../images/Timun.jpg",
      price: "26000",
      description:
        "Timun ini dikenal karena kandungan airnya yang tinggi dan tekstur yang crisp, membuatnya ideal untuk salad, sandwich, atau sebagai camilan sehat. Kaya akan vitamin K dan serat, timun membantu mendukung pencernaan dan menjaga hidrasi tubuh. Dengan rasa yang ringan dan menyegarkan, timun ini adalah pilihan sempurna untuk meningkatkan nilai gizi dan kelezatan makanan Anda.",
      additionalImages: ["../images/Timun.jpg", "../images/Timun.jpg"],
      sellerName: "TropicalVeg",
      sellerLocation: "Medan",
      quantity: 456,
    },
    "20": {
      id: "20",
      name: "Jagung",
      image: "../images/Jagung.jpg",
      price: "45000",
      description:
        "Pilihan sempurna untuk hidangan yang lezat dan bergizi. Jagung ini memiliki rasa manis yang khas dan tekstur yang renyah, cocok untuk direbus, dipanggang, atau ditambahkan ke salad dan sup. Kaya akan vitamin B, serat, dan antioksidan, jagung ini mendukung kesehatan pencernaan dan memberikan energi tambahan. Dengan kualitas premium dan kesegaran yang terjaga, jagung ini adalah tambahan yang ideal untuk setiap dapur.",
      additionalImages: ["../images/Jagung.jpg", "../images/Jagung.jpg"],
      sellerName: "GreenHarvest",
      sellerLocation: "Bali",
      quantity: 887,
    },
    "21": {
      id: "21",
      name: "Kentang",
      image: "../images/Kentang.jpg",
      price: "7500",
      description:
        "Kentang segar kami yang dihasilkan dari proses penanaman yang cermat. Kentang ini memiliki bentuk bulat atau oval dengan kulit yang halus dan daging yang lembut, siap untuk diolah menjadi berbagai hidangan lezat. Ditanam di tanah yang subur dan dirawat dengan teknik yang ramah lingkungan, kentang kami kaya akan nutrisi dan cita rasa yang menggugah selera. Ideal untuk dipanggang, direbus, atau digoreng, kentang ini menjamin hasil yang sempurna setiap kali. Pilih kentang kami untuk pengalaman kuliner yang memuaskan dan penuh rasa!",
      additionalImages: ["../images/Kentang.jpg", "../images/Kentang.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Jakarta",
      quantity: 987,
    },
    "22": {
      id: "22",
      name: "Brokoli",
      image: "../images/Brokoli.jpg",
      price: "35000",
      description:
        "Sayuran hijau berbentuk seperti kepala kecil yang padat dan kaya akan nutrisi. Dengan tangkai yang kokoh dan kuntum-kuntum kecil yang penuh dengan vitamin dan mineral, brokoli ini merupakan pilihan ideal untuk menjaga kesehatan Anda. Ditanam dengan teknik organik di tanah subur, brokoli kami menawarkan rasa yang renyah dan segar, serta warna hijau yang cerah. Cocok untuk berbagai masakan, dari tumisan hingga sup, brokoli ini akan menambah nilai gizi dan rasa pada setiap hidangan Anda. Pilih brokoli kami untuk mendapatkan kualitas terbaik dan manfaat kesehatan yang optimal!",
      additionalImages: ["../images/Brokoli.jpg", "../images/Brokoli.jpg"],
      sellerName: "SoyFarm",
      sellerLocation: "Bandung",
      quantity: 932,
    },
    "23": {
      id: "23",
      name: "Kol Merah",
      image: "../images/Kol Merah.jpg",
      price: "15000",
      description:
        "Kol merah kami yang segar dan berkualitas tinggi, sayuran dengan warna ungu kemerahan yang mencolok dan bentuk bulat yang padat. Kol merah ini ditanam dengan penuh perhatian menggunakan metode pertanian organik di tanah yang kaya nutrisi, memastikan hasil panen yang segar dan penuh rasa. Dengan tekstur renyah dan rasa sedikit manis, kol merah sangat ideal untuk berbagai hidangan, dari salad segar yang menggugah selera hingga acar yang lezat. Tambahkan kol merah ke dalam dapur Anda dan nikmati kombinasi warna yang menarik dan manfaat gizi yang melimpah!",
      additionalImages: ["../images/Kol Merah.jpg", "../images/Kol Merah.jpg"],
      sellerName: "OrganicVeggie",
      sellerLocation: "Yogyakarta",
      quantity: 346,
    },
    "24": {
      id: "24",
      name: "Daun Bawang",
      image: "../images/Daun Bawang.jpg",
      price: "35000",
      description:
        "dengan batang hijau cerah yang ramping dan bertekstur renyah. Ditanam dengan metode pertanian organik, daun bawang ini tumbuh di tanah subur yang memberikan rasa yang segar dan aromatik. Ideal untuk menambah rasa pada berbagai hidangan, mulai dari sup, tumisan, hingga salad, daun bawang kami menawarkan sentuhan rasa yang khas dan meningkatkan kelezatan masakan Anda. Nikmati kualitas dan kesegaran daun bawang yang dipilih secara teliti untuk memenuhi kebutuhan kuliner Anda.",
      additionalImages: [
        "../images/Daun Bawang.jpg",
        "../images/Daun Bawang.jpg",
      ],
      sellerName: "FruitHarvest",
      sellerLocation: "Surabaya",
      quantity: 333,
    },
    "25": {
      id: "25",
      name: "Labu",
      image: "../images/Labu.jpg",
      price: "15000",
      description:
        "Memiliki kulit berwarna oranye cerah dan daging yang lembut. Dengan bentuk yang bulat dan sedikit bertekstur, labu ini adalah pilihan ideal untuk berbagai kreasi kuliner. Ditanam dengan teknik pertanian yang berkelanjutan, labu kami tumbuh di tanah yang kaya nutrisi, memastikan kualitas dan rasa yang optimal. Cocok untuk dibuat sup, pie, atau bahkan hidangan panggang, labu ini menawarkan kelezatan yang tidak hanya menggugah selera tetapi juga memberikan nilai gizi tambahan untuk setiap sajian.",
      additionalImages: ["../images/Labu.jpg", "../images/Labu.jpg"],
      sellerName: "TropicalFruit",
      sellerLocation: "Jakarta",
      quantity: 13,
    },
    "26": {
      id: "26",
      name: "Apel Malang",
      image: "../images/Apel Malang.jpeg",
      price: "10000",
      description:
        "Apel Malang tumbuh subur di dataran tinggi Malang, Jawa Timur, dengan iklim sejuk dan tanah yang subur. Ditumbuhkan dengan perawatan intensif oleh petani lokal, apel ini dipanen dengan penuh hati-hati untuk memastikan kualitas terbaik sampai ke tangan konsumen. Apel Malang adalah pilihan tepat untuk menikmati buah-buahan yang segar dan berkualitas tinggi. Cocok untuk dikonsumsi langsung atau sebagai bahan tambahan dalam hidangan favorit Anda. Dapatkan kesegaran Apel Malang sekarang juga dan rasakan kenikmatannya!",
      additionalImages: [
        "../images/Apel Malang.jpeg",
        "../images/Apel Malang.jpeg",
      ],
      sellerName: "HarvestHub",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "27": {
      id: "27",
      name: "Anggur",
      image: "../images/Anggur.jpg",
      price: "12000",
      description:
        "Ditumbuhkan dengan perawatan intensif di kebun-kebun yang terletak di dataran tinggi, anggur kami mendapatkan asupan sinar matahari yang cukup dan irigasi alami yang melimpah. Setiap buah dipetik pada saat matang sempurna untuk menjaga kesegaran dan kualitasnya. Anggur segar ini sempurna untuk dinikmati langsung atau digunakan sebagai bahan dalam berbagai hidangan dan minuman. Rasakan sensasi manis yang menyegarkan dari anggur berkualitas tinggi ini sekarang juga. Segera pesan dan nikmati kebaikan alam dalam setiap gigitannya!",
      additionalImages: ["../images/Anggur.jpg", "../images/Anggur.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Bandung",
      quantity: 200,
    },
    "28": {
      id: "28",
      name: "Nanas Pemalang",
      image: "../images/Nanas Pemalang.jpg",
      price: "15000",
      description:
        "Nanas ini diperlakukan dengan penuh kasih sayang dari tahap awal hingga panen. Proses penanaman yang organik dan alami memastikan setiap buah nanas tumbuh dengan rasa yang maksimal dan kualitas yang prima. Dipetik pada waktu yang tepat untuk memastikan kematangan dan kesegaran terbaik. Nanas Pemalang adalah pilihan sempurna untuk dinikmati segar, dijadikan jus, atau sebagai tambahan dalam berbagai hidangan. Dengan rasa manis yang khas dan tekstur yang lembut, nanas ini pasti akan memanjakan lidah Anda. Pesan sekarang dan rasakan kelezatan tropis yang autentik!",
      additionalImages: [
        "../images/Nanas Pemalang.jpg",
        "../images/Nanas Pemalang.jpg",
      ],
      sellerName: "GreenEarth",
      sellerLocation: "Yogyakarta",
      quantity: 210,
    },
    "29": {
      id: "29",
      name: "Pepaya California",
      image: "../images/Pepaya California.jpg",
      price: "20000",
      description:
        "Pepaya California memiliki bentuk lonjong dengan kulit halus berwarna hijau kekuningan saat matang. Buah ini memiliki daging yang tebal dan berwarna oranye kemerahan, menawarkan rasa manis yang lezat dan tekstur yang lembut. Buah ini juga dikenal akan biji hitamnya yang kaya akan enzim papain. Ditanam di lahan dengan kualitas tanah yang unggul dan iklim tropis yang ideal, pepaya California dirawat dengan baik sejak masa tanam hingga panen. Proses penanaman menggunakan metode organik, bebas dari pestisida dan bahan kimia berbahaya, memastikan buah yang dihasilkan aman dan sehat untuk dikonsumsi. Dipetik saat matang untuk memberikan rasa dan kualitas terbaik. Pepaya California tidak hanya lezat, tetapi juga kaya akan vitamin A, C, dan serat, menjadikannya pilihan yang sempurna untuk konsumsi sehari-hari atau sebagai campuran dalam salad dan jus. Dapatkan pepaya California segar dengan kualitas terbaik dan rasakan manfaat kesehatan serta kenikmatannya!",
      additionalImages: [
        "../images/Pepaya California.jpg",
        "../images/Pepaya California.jpg",
      ],
      sellerName: "VeggieDelight",
      sellerLocation: "Semarang",
      quantity: 10,
    },
    "30": {
      id: "30",
      name: "Pisang Sunpride",
      image: "../images/Pisang Sunpride.jpg",
      price: "18000",
      description:
        "Buah ini dikenal dengan bentuknya yang melengkung sempurna, kulit kuning cerah, dan daging buah yang lembut serta manis. Pisang ini merupakan pilihan ideal untuk camilan sehat, sarapan cepat, atau sebagai tambahan pada sereal dan smoothie. Ditanam di kebun beriklim tropis dengan tanah yang subur, buah ini dipanen dengan standar kualitas tinggi. Proses penanamannya mengutamakan metode ramah lingkungan, memastikan pisang yang Anda konsumsi bebas dari bahan kimia berbahaya dan pestisida. Pisang ini kaya akan vitamin B6, vitamin C, serat, dan potasium, membantu meningkatkan energi, mendukung sistem pencernaan yang sehat, dan menjaga keseimbangan elektrolit dalam tubuh. Nikmati pisang yang lezat dan sehat setiap hari!",
      additionalImages: [
        "../images/Pisang Sunpride.jpg",
        "../images/Pisang Sunpride.jpg",
      ],
      sellerName: "HerbMaster",
      sellerLocation: "Surabaya",
      quantity: 100,
    },
    "31": {
      id: "31",
      name: "Belimbing",
      image: "../images/Belimbing.jpg",
      price: "25000",
      description:
        "Belimbing dikenal dengan bentuknya yang unik menyerupai bintang saat diiris, kulit halus berwarna kuning kehijauan, dan daging buah yang renyah serta segar. Belimbing menawarkan rasa manis asam yang menyegarkan, menjadikannya pilihan sempurna untuk camilan sehat atau tambahan pada salad dan hidangan penutup. Ditanam di kebun tropis dengan teknik budidaya berkelanjutan, belimbing dipanen dengan cermat untuk memastikan kualitas dan kesegaran optimal. Setiap buah diperlakukan dengan penuh perhatian agar bebas dari residu pestisida, sehingga Anda dapat menikmatinya tanpa khawatir. Belimbing kaya akan vitamin C, serat, dan antioksidan, yang baik untuk meningkatkan kekebalan tubuh, menjaga kesehatan kulit, dan melancarkan pencernaan. Nikmati belimbing segar kami untuk pengalaman rasa yang unik dan menyehatkan!",
      additionalImages: ["../images/Belimbing.jpg", "../images/Belimbing.jpg"],
      sellerName: "SpiceWorld",
      sellerLocation: "Medan",
      quantity: 50,
    },
    "32": {
      id: "32",
      name: "Blueberry",
      image: "../images/Blueberry.jpg",
      price: "30000",
      description:
        "Nikmati manisnya blueberry segar dengan rasa yang lezat dan warna biru keunguan yang memikat. Setiap buah dipilih secara cermat untuk memberikan kualitas terbaik, menawarkan kombinasi sempurna antara manis dan sedikit asam. Teksturnya yang lembut dan berair membuatnya ideal untuk dikonsumsi langsung, ditambahkan ke sereal, yogurt, atau dibuat smoothie. Ditanam di kebun yang subur dengan teknik pertanian berkelanjutan, blueberry kami dipetik pada puncak kematangannya untuk memastikan kesegaran dan rasa terbaik. Proses pemanenan dan pengemasan dilakukan dengan teliti untuk mempertahankan nutrisi dan integritas buah. Blueberry adalah sumber antioksidan, vitamin C, dan serat yang tinggi, menjadikannya pilihan sempurna untuk meningkatkan kesehatan jantung, fungsi otak, dan menjaga sistem kekebalan tubuh. Tambahkan blueberry segar ke dalam menu harian Anda dan rasakan manfaat sehatnya!",
      additionalImages: ["../images/Blueberry.jpg", "../images/Blueberry.jpg"],
      sellerName: "TropicalFruits",
      sellerLocation: "Bali",
      quantity: 15,
    },
    "33": {
      id: "33",
      name: "Buah Naga",
      image: "../images/Buah Naga.jpg",
      price: "28000",
      description:
        "Temukan keajaiban buah naga dengan kulit berwarna cerah dan daging berwarna putih atau merah yang memikat. Dengan tekstur yang renyah dan rasa manis yang segar, buah naga adalah pilihan ideal untuk menambah keunikan pada hidangan Anda. Rasakan kelezatannya langsung, atau tambahkan ke dalam salad, smoothie, atau sebagai hiasan eksotis pada dessert. Ditanam dengan hati-hati di lingkungan yang optimal, buah naga kami dibudidayakan menggunakan metode pertanian yang ramah lingkungan untuk menghasilkan buah yang berkualitas tinggi. Proses pemanenan yang tepat memastikan bahwa setiap buah dipetik pada saat puncaknya untuk mendapatkan kesegaran maksimal. Buah naga kaya akan vitamin C, antioksidan, dan serat, menjadikannya pilihan yang tidak hanya lezat tetapi juga menyehatkan. Nikmati sensasi eksotis dari buah naga yang penuh warna dan manfaat sehatnya dalam setiap gigitan!",
      additionalImages: ["../images/Buah Naga.jpg", "../images/Buah Naga.jpg"],
      sellerName: "SpiceKing",
      sellerLocation: "Bandung",
      quantity: 150,
    },
    "34": {
      id: "34",
      name: "Cherry",
      image: "../images/Cherry.jpg",
      price: "22000",
      description:
        "Nikmati kelezatan ceri yang segar dengan rasa manis alami dan tekstur juicy yang menyegarkan. Ceri kami menawarkan warna merah cerah yang menggugah selera dan bisa dinikmati langsung sebagai camilan sehat, ditambahkan ke salad, atau digunakan dalam berbagai resep dessert dan hidangan manis lainnya. Ditanam dengan penuh perhatian di kebun kami, ceri dipetik pada saat kematangan optimal untuk memastikan setiap buah mencapai puncak rasa dan kualitas. Metode budidaya kami memprioritaskan teknik ramah lingkungan dan pengendalian kualitas yang ketat untuk memberikan ceri yang terbaik. Kaya akan vitamin C, antioksidan, dan serat, ceri tidak hanya lezat tetapi juga menyehatkan. Tambahkan ceri segar ke dalam kehidupan Anda untuk sensasi manis yang alami dan manfaat kesehatan yang menyegarkan!",
      additionalImages: ["../images/Cherry.jpg", "../images/Cherry.jpg"],
      sellerName: "GourmetStore",
      sellerLocation: "Jakarta",
      quantity: 155,
    },
    "35": {
      id: "35",
      name: "Durian",
      image: "../images/Durian.jpg",
      price: "14000",
      description:
        "Temukan kelezatan durian premium yang memikat, dikenal sebagai Raja Buah dengan rasa yang unik dan aroma yang khas. Daging durian ini lembut, creamy, dan beraroma kuat, menawarkan pengalaman rasa yang tidak terlupakan. Dengan warna kuning keemasan dan tekstur yang kaya, durian ini sempurna untuk dinikmati langsung, ditambahkan ke dessert, atau dijadikan bahan dalam berbagai resep kuliner eksotis. Ditanam dengan hati-hati di kebun kami menggunakan metode organik, durian dipetik saat matang sempurna untuk memastikan kualitas dan rasa terbaik. Kami menerapkan teknik perawatan yang cermat dan berkelanjutan untuk menghasilkan buah yang segar dan berkualitas tinggi. Nikmati durian premium kami yang penuh dengan vitamin, mineral, dan energi, menjadikannya pilihan yang menggugah selera dan bergizi untuk pencinta buah yang mencari sensasi rasa yang istimewa.",
      additionalImages: ["../images/Durian.jpg", "../images/Durian.jpg"],
      sellerName: "FarmFresh",
      sellerLocation: "Bogor",
      quantity: 110,
    },
    "36": {
      id: "36",
      name: "Jambu",
      image: "../images/Jambu.jpg",
      price: "35000",
      description:
        "Nikmati kesegaran jambu yang menggiurkan dengan rasa manis yang alami dan tekstur yang renyah. Buah jambu ini memiliki daging berwarna putih atau merah yang juicy, dan aroma harum yang menyegarkan. Ideal untuk dimakan langsung, dijadikan jus, atau ditambahkan ke salad dan dessert. Kaya akan vitamin C dan antioksidan, jambu adalah pilihan sehat yang enak untuk setiap hidangan. Ditanam di kebun kami dengan teknik organik dan perawatan yang teliti, memastikan buah jambu dipetik pada puncak kematangannya untuk kualitas dan rasa terbaik. Proses penanaman yang ramah lingkungan menjamin buah yang segar dan berkualitas tinggi. Rasakan manfaat kesehatan dan kelezatan alami dari jambu kami, buah yang sempurna untuk memperkaya diet harian Anda dengan rasa segar dan nutrisi.",
      additionalImages: ["../images/Jambu.jpg", "../images/Jambu.jpg"],
      sellerName: "VeggieFarm",
      sellerLocation: "Cirebon",
      quantity: 154,
    },
    "37": {
      id: "37",
      name: "Jeruk",
      image: "../images/Jeruk.jpg",
      price: "40000",
      description:
        "Rasakan kelezatan jeruk kami yang segar dengan rasa manis yang seimbang dan sentuhan asam yang menyegarkan. Setiap buah jeruk memiliki kulit berwarna cerah dan daging juicy yang penuh dengan vitamin C. Cocok untuk dimakan langsung, dijadikan jus, atau digunakan dalam berbagai resep. Jeruk kami tidak hanya memanjakan lidah tetapi juga memberikan manfaat kesehatan dengan antioksidan dan nutrisi yang melimpah. Ditanam dengan penuh perhatian dalam kebun kami yang terawat, jeruk kami tumbuh dengan teknik pertanian yang ramah lingkungan dan tanpa penggunaan pestisida berbahaya. Proses pemetikan yang tepat memastikan buah jeruk tiba dalam kondisi segar dan berkualitas tinggi. Nikmati kesegaran alami dan manfaat kesehatan dari jeruk kami, pilihan ideal untuk setiap hidangan dan sebagai tambahan yang sempurna untuk gaya hidup sehat Anda.",
      additionalImages: ["../images/Jeruk.jpg", "../images/Jeruk.jpg"],
      sellerName: "HarvestKing",
      sellerLocation: "Makassar",
      quantity: 1230,
    },
    "38": {
      id: "38",
      name: "Alpukat Mentega",
      image: "../images/Alpukat Mentega.jpg",
      price: "25000",
      description:
        "Temukan kelezatan alpukat mentega kami yang creamy dan kaya rasa! Dengan tekstur yang lembut dan rasa buttery yang khas, alpukat ini ideal untuk berbagai hidangan. Nikmati kelezatan alami saat disajikan sebagai topping salad, bahan dalam smoothie, atau diolah menjadi guacamole. Kaya akan vitamin, mineral, dan lemak sehat, alpukat mentega kami memberikan manfaat gizi yang luar biasa untuk diet Anda. Ditanam dengan teknik pertanian modern dalam kebun yang terkelola dengan baik, alpukat mentega kami tumbuh dengan perawatan yang optimal. Tanpa bahan kimia berbahaya dan dengan proses pemetikan yang hati-hati, memastikan buah tiba dalam kondisi prima dan siap untuk dinikmati. Manjakan diri Anda dengan alpukat mentega kami, pilihan ideal untuk menambahkan kelezatan dan nutrisi pada setiap hidangan.",
      additionalImages: [
        "../images/Alpukat Mentega.jpg",
        "../images/Alpukat Mentega.jpg",
      ],
      sellerName: "OrganicVeg",
      sellerLocation: "Bali",
      quantity: 1110,
    },
    "39": {
      id: "39",
      name: "Kelapa",
      image: "../images/Kelapa.jpg",
      price: "13000",
      description:
        "Rasakan kesegaran kelapa kami yang baru dipetik langsung dari pohonnya! Dengan kulit yang tebal dan daging kelapa yang kaya, buah ini menawarkan rasa yang manis dan segar. Cocok untuk berbagai penggunaan, mulai dari bahan dasar minuman tropis hingga campuran hidangan penutup dan masakan. Selain itu, kelapa juga kaya akan nutrisi penting seperti serat, vitamin, dan mineral, memberikan manfaat kesehatan tambahan. Kelapa kami ditanam di kebun kelapa yang terawat dengan baik menggunakan metode organik, tanpa penggunaan pestisida kimia. Proses panen yang hati-hati memastikan kelapa tiba dalam kondisi terbaik, siap untuk memberikan cita rasa tropis yang autentik dan manfaat kesehatan yang optimal. Nikmati kelapa kami dalam berbagai bentuk dan rasakan kelezatannya langsung dari sumbernya!",
      additionalImages: ["../images/Kelapa.jpg", "../images/Kelapa.jpg"],
      sellerName: "GreenMarket",
      sellerLocation: "Surabaya",
      quantity: 1500,
    },
    "40": {
      id: "40",
      name: "Lemon",
      image: "../images/Lemon.jpg",
      price: "18000",
      description:
        "Nikmati kelezatan lemon segar kami yang menambah cita rasa asam yang menyegarkan pada setiap hidangan! Buah lemon ini memiliki kulit kuning cerah dan daging yang juicy, ideal untuk digunakan dalam minuman, salad, saus, atau sebagai bahan penyedap alami. Kaya akan vitamin C, lemon juga memberikan manfaat kesehatan yang luar biasa, termasuk meningkatkan sistem kekebalan tubuh dan mendukung pencernaan. Lemon kami ditanam dengan teknik pertanian yang ramah lingkungan, memastikan buah yang berkualitas tinggi dan bebas dari bahan kimia berbahaya. Setiap lemon dipanen pada puncak kematangan untuk memastikan rasa yang optimal dan kesegaran yang tak tertandingi. Tambahkan sentuhan segar dan cerah pada masakan Anda dengan lemon kami yang berkualitas!",
      additionalImages: ["../images/Lemon.jpg", "../images/Lemon.jpg"],
      sellerName: "HealthyVeg",
      sellerLocation: "Jakarta",
      quantity: 2345,
    },
    "41": {
      id: "41",
      name: "Mangga",
      image: "../images/Mangga.jpg",
      price: "32000",
      description:
        "Rasakan kelezatan mangga segar kami yang memanjakan lidah dengan rasa manis dan tekstur yang lembut! Buah mangga ini memiliki daging berwarna oranye cerah yang juicy dan aroma harum yang menggugah selera. Ideal untuk dinikmati langsung, dibuat jus, atau sebagai tambahan dalam salad dan dessert. Mangga kami kaya akan vitamin A dan C, serta serat yang mendukung kesehatan pencernaan. Mangga kami ditanam di lahan yang subur dengan perawatan yang teliti, memastikan buah yang matang sempurna dan bebas dari bahan kimia. Setiap mangga dipanen pada waktu yang tepat untuk mendapatkan rasa dan kesegaran terbaik. Tambahkan sentuhan tropis pada hidangan Anda dengan mangga kami yang berkualitas tinggi!",
      additionalImages: ["../images/Mangga.jpg", "../images/Mangga.jpg"],
      sellerName: "VeggieWorld",
      sellerLocation: "Bandung",
      quantity: 133,
    },
    "42": {
      id: "42",
      name: "Manggis",
      image: "../images/Manggis.jpg",
      price: "22000",
      description:
        "Dengan kulit berwarna ungu tua yang tebal dan daging putih yang lembut di dalamnya, manggis ini menawarkan rasa manis dan sedikit asam yang sangat menyegarkan. Setiap gigitan memberikan sensasi yang lembut dan juicy, menjadikannya pilihan sempurna untuk dinikmati langsung, ditambahkan dalam salad, atau digunakan dalam dessert. Manggis kami tumbuh di kebun yang terawat dengan baik dan dipanen pada puncak kematangan untuk memastikan kualitas dan kesegaran terbaik. Proses penanaman kami mengutamakan praktik pertanian yang ramah lingkungan untuk menghasilkan buah yang lezat dan berkualitas tinggi. Rasakan kelezatan tropis dari manggis kami dan tambahkan keunikan pada hidangan Anda!",
      additionalImages: ["../images/Manggis.jpg", "../images/Manggis.jpg"],
      sellerName: "FarmersMarket",
      sellerLocation: "Yogyakarta",
      quantity: 1534,
    },
    "43": {
      id: "43",
      name: "Melon",
      image: "../images/Melon.jpg",
      price: "28000",
      description:
        "Buah melon kami memiliki daging yang lembut dan juicy dengan rasa yang manis dan segar. Dengan kulit yang halus dan warna cerah, melon ini adalah pilihan sempurna untuk hidangan penutup, salad, atau dinikmati langsung sebagai camilan sehat. Setiap potong melon memberikan rasa kesegaran tropis yang menyegarkan. Melon kami dibudidayakan dengan teknik pertanian terbaik di kebun yang terjaga dengan baik. Kami memastikan buah ini dipanen pada puncaknya untuk memberikan kualitas terbaik dan rasa yang maksimal. Proses penanaman kami ramah lingkungan untuk menghasilkan melon berkualitas tinggi dan lezat. Rasakan kelezatan melon kami dan tambahkan kesegaran tropis dalam setiap hidangan Anda!",
      additionalImages: ["../images/Melon.jpg", "../images/Melon.jpg"],
      sellerName: "RootVeg",
      sellerLocation: "Semarang",
      quantity: 213,
    },
    "44": {
      id: "44",
      name: "Nangka",
      image: "../images/Nangka.jpg",
      price: "26000",
      description:
        "Buah nangka kami menawarkan daging yang lembut dengan rasa manis dan aroma tropis yang khas. Dengan tekstur yang serbaguna, nangka ini cocok untuk berbagai hidangan, mulai dari camilan segar hingga bahan dalam masakan dan dessert. Setiap potong nangka memberikan sensasi rasa yang kaya dan memuaskan. Nangka kami ditanam dengan metode pertanian berkualitas tinggi di kebun yang terawat dengan baik. Kami memastikan setiap buah dipanen pada kematangan optimal untuk memastikan rasa dan kualitas terbaik. Proses penanaman kami memprioritaskan praktik ramah lingkungan untuk hasil yang optimal dan berkelanjutan. Nikmati kelezatan dan kesegaran nangka kami dalam setiap gigitan!",
      additionalImages: ["../images/Nangka.jpg", "../images/Nangka.jpg"],
      sellerName: "TropicalVeg",
      sellerLocation: "Medan",
      quantity: 456,
    },
    "45": {
      id: "45",
      name: "Pir",
      image: "../images/Pir.jpg",
      price: "45000",
      description:
        "Buah pir ini memiliki daging yang lembut dan juicy dengan rasa manis yang menyegarkan. Setiap gigitan memberikan kombinasi ideal antara rasa manis dan sedikit keasaman yang membuatnya cocok sebagai camilan sehat, bahan tambahan dalam salad, atau bahan utama dalam berbagai dessert. Pir kami ditanam di kebun yang dikelola dengan hati-hati, memastikan setiap buah dipanen pada waktu yang tepat untuk mencapai kematangan sempurna. Kami menggunakan teknik pertanian berkelanjutan untuk menghasilkan pir berkualitas tinggi dengan rasa yang konsisten dan memuaskan. Rasakan kualitas dan kelezatan pir kami yang segar dalam setiap buah!",
      additionalImages: ["../images/Pir.jpg", "../images/Pir.jpg"],
      sellerName: "GreenHarvest",
      sellerLocation: "Bali",
      quantity: 887,
    },
    "46": {
      id: "46",
      name: "Semangka",
      image: "../images/Semangka.jpg",
      price: "7500",
      description:
        "Segarkan hari Anda dengan semangka kami yang juicy dan manis! Dengan daging buah yang merah cerah dan penuh air, semangka ini menawarkan rasa yang lezat dan menyegarkan. Cocok untuk dinikmati langsung sebagai camilan, ditambahkan ke salad buah, atau dibuat jus segar. Semangka kami ditanam dengan teknik pertanian modern dan berkelanjutan, memastikan buah yang dipanen memiliki kualitas terbaik dan rasa yang optimal. Ditanam di tanah yang subur dan dirawat dengan penuh perhatian, semangka ini mencapai kematangan sempurna untuk pengalaman rasa yang maksimal. Nikmati kesegaran dan rasa manis semangka kami dalam setiap potongnya!",
      additionalImages: ["../images/Semangka.jpg", "../images/Semangka.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Jakarta",
      quantity: 987,
    },
    "47": {
      id: "47",
      name: "Strawberry",
      image: "../images/Strawberry.jpg",
      price: "35000",
      description:
        "Dengan warna merah cerah dan rasa manis yang menggugah selera, stroberi ini adalah pilihan sempurna untuk camilan sehat, topping salad, atau bahan utama dalam dessert dan smoothies. Setiap buah menawarkan tekstur renyah dan aroma yang menggoda. Stroberi kami ditanam dengan teknik berkualitas tinggi, di lahan yang dirawat secara cermat untuk memastikan buah yang berkualitas terbaik. Ditanam dalam kondisi optimal, stroberi ini tumbuh subur dan dipanen pada puncak kematangan untuk memastikan rasa yang menyenangkan dan kesegaran yang maksimal. Rasakan kelezatan stroberi segar kami dan tambahkan sentuhan manis pada setiap hidangan!",
      additionalImages: [
        "../images/Strawberry.jpg",
        "../images/Strawberry.jpg",
      ],
      sellerName: "SoyFarm",
      sellerLocation: "Bandung",
      quantity: 932,
    },
    "48": {
      id: "48",
      name: "Lychee",
      image: "../images/Lychee.jpg",
      price: "15000",
      description:
        "Dengan kulit merah-merah cerah yang menawan dan daging buah yang lembut, leci ini menawarkan pengalaman rasa yang eksotis dan menyegarkan. Ideal untuk camilan, salad buah, atau sebagai tambahan pada berbagai hidangan penutup. Leci kami dibudidayakan dengan perhatian dan teknik pertanian yang cermat. Tanaman leci dirawat dalam kondisi optimal untuk memastikan buah yang berkualitas tinggi dan rasa yang maksimal. Dipanen pada puncak kematangan, leci ini menjanjikan kesegaran yang tiada tara. Nikmati kelezatan leci segar dan berikan sentuhan tropis pada setiap hidangan Anda!",
      additionalImages: ["../images/Lychee.jpg", "../images/Lychee.jpg"],
      sellerName: "OrganicVeggie",
      sellerLocation: "Yogyakarta",
      quantity: 346,
    },
    "49": {
      id: "49",
      name: "Kiwi",
      image: "../images/Kiwi.jpg",
      price: "35000",
      description:
        "Rasakan kelezatan kiwi premium kami yang kaya rasa dan bergizi! Dengan kulit berwarna coklat keabu-abuan yang berbulu halus dan daging buah hijau cerah yang penuh dengan biji kecil, kiwi ini menawarkan kombinasi rasa manis dan asam yang menyegarkan. Ideal sebagai camilan sehat, tambahan dalam smoothie, atau sebagai topping salad buah. Kiwi kami ditanam dengan penuh perhatian di kebun-kebun yang memiliki iklim ideal untuk memastikan buah yang berkualitas tinggi. Dipanen pada saat kematangan optimal, kiwi ini menawarkan rasa dan tekstur yang terbaik untuk dinikmati. Nikmati kiwi segar kami dan berikan sentuhan eksotis pada hidangan Anda!",
      additionalImages: ["../images/Kiwi.jpg", "../images/Kiwi.jpg"],
      sellerName: "FruitHarvest",
      sellerLocation: "Surabaya",
      quantity: 333,
    },
    "50": {
      id: "50",
      name: "Jambu Air",
      image: "../images/Jambu Air.jpg",
      price: "15000",
      description:
        "Dengan kulit berwarna merah muda cerah dan daging buah yang juicy, jambu air ini memberikan rasa manis dan segar dalam setiap gigitan. Ideal untuk camilan sehat, salad buah, atau sebagai tambahan menyegarkan pada hidangan Anda. Jambu air kami dibudidayakan dengan cermat di kebun yang terawat dengan baik untuk memastikan buah yang berkualitas. Dipanen pada puncak kematangan untuk memberikan rasa dan tekstur terbaik, jambu air ini siap memanjakan lidah Anda. Tambahkan jambu air segar kami ke keranjang belanja Anda dan rasakan kenikmatan alami yang menyegarkan!",
      additionalImages: ["../images/Jambu Air.jpg", "../images/Jambu Air.jpg"],
      sellerName: "TropicalFruit",
      sellerLocation: "Jakarta",
      quantity: 13,
    },
  };

  return products[id];
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await fetchProductById(id);
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.additionalImages[0]);
        } catch (error) {
          console.error("Failed to fetch product", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const productReviews = id ? reviewsData[id] : [];

  const handleBackClick = () => {
    if (id) {
      const productId = parseInt(id, 10);
      if (productId >= 1 && productId <= 25) {
        navigate("/productpage1");
      } else if (productId >= 26 && productId <= 50) {
        navigate("/productpage2");
      } else {
        navigate("/");
      }
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > Math.min(product?.quantity || 0, 10))
        return Math.min(product?.quantity || 0, 10);
      return newQuantity;
    });
  };

  useEffect(() => {
    if (product) {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(price)) {
        setTotalPrice(price * quantity);
      } else {
        console.error("Invalid price format");
      }
    }
  }, [quantity, product]);

  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBackClick}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Back
        </button>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 lg:mr-8">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-md"
            />
            <div className="flex space-x-2 mt-4">
              {product.additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>
          <div className="flex-none lg:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4">
              <p className="text-xl font-semibold mb-4">
                Stok Total: {product.quantity}
              </p>
              <p className="text-lg font-semibold mb-2">Jumlah</p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <p className="text-xl font-semibold mb-4">
                Harga Total: {rupiahFormatter.format(totalPrice)}
              </p>
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
                onClick={() => {}}
              >
                <FaDollarSign className="text-white mr-2" />
                Beli Langsung
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex items-center justify-center"
                onClick={() => {}}
              >
                <FaCartPlus className="text-white mr-2" />
                Keranjang
              </button>
              <button
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 flex items-center justify-center"
                onClick={() => {}}
              >
                <FaHeart className="text-white mr-2" />
                Tambah ke Wishlist
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">
            <span className="text-xl font-bold"></span>{" "}
            {rupiahFormatter.format(parseFloat(product.price))}
          </h2>
          <h3 className="text-lg font-semibold mb-4">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">
            Nama Penjual: {product.sellerName}
          </p>
          <p className="text-lg font-semibold mb-2">
            Dikirim dari: {product.sellerLocation}
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Foto & Video Pembeli</h3>
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 text-sm flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  {review.image && (
                    <img
                      src={review.image}
                      alt={`Ulasan dari ${review.reviewerName}`}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">
                    {review.reviewerName}
                  </p>
                  <div className="text-yellow-500 mb-2">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <Link
                    to={`/review/${review.id}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Lihat Detail Ulasan
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">
              Belum ada ulasan untuk produk ini.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
