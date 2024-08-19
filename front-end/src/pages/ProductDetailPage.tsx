import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart, FaDollarSign, FaStar } from "react-icons/fa";
import { reviewsData } from "@/components/HarvestHub/ReviewsData";
import CheckoutDialog from "@/components/HarvestHub/CheckOut";

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

const fetchProductById = async (id: string): Promise<Product | undefined> => {
  const products: Record<string, Product> = {
    "1": {
      id: "1",
      name: "Beras Merah",
      image: "../images/beras-merah.jpg",
      price: "10000",
      description:
        "Nikmati kelezatan dan manfaat kesehatan dari Beras Merah kami! Dengan kandungan serat tinggi dan nutrisi alami, beras ini adalah pilihan ideal untuk hidangan sehat. Memiliki rasa nutty dan tekstur kenyal, beras merah kami sempurna sebagai pengganti beras putih. Dikemas dalam kemasan kedap udara untuk menjaga kesegaran, beras ini bebas pestisida dan ramah lingkungan. Ideal untuk berbagai hidangan, dari nasi goreng hingga sushi.",
      additionalImages: [
        "../images/beras-merah.jpg",
        "../images/beras-merah.jpg",
      ],
      sellerName: "HarvestMoon",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "2": {
      id: "2",
      name: "Kacang Mede",
      image: "../images/kacang-mede.jpg",
      price: "12000",
      description:
        "Rasakan kelezatan kacang mede premium kami yang renyah dan lezat! Kacang mede ini dipilih dengan cermat untuk memastikan kualitas terbaik dan rasa yang tiada tanding. Kaya akan protein, serat, dan lemak sehat, kacang mede kami adalah camilan ideal atau bahan tambahan yang sempurna untuk berbagai hidangan. Dapat dinikmati langsung, sebagai topping salad, atau dalam berbagai resep memasak. Kemasan kedap udara menjaga kesegaran dan kerenyahan setiap kacang. Nikmati camilan sehat dan bergizi setiap hari dengan kacang mede premium kami!",
      additionalImages: [
        "../images/kacang-mede.jpg",
        "../images/kacang-mede.jpg",
      ],
      sellerName: "HarvestMoon",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "3": {
      id: "3",
      name: "Kol",
      image: "../images/kol.jpg",
      price: "15000",
      description:
        "Tambahkan kelezatan dan kesegaran pada hidangan Anda dengan kol segar kami! Dipilih dari ladang terbaik, kol ini memiliki daun yang renyah dan rasa yang segar. Ideal untuk berbagai masakan, dari salad yang menyegarkan hingga sup dan tumisan yang menggugah selera. Kaya akan vitamin dan serat, kol ini memberikan manfaat kesehatan yang optimal. Kemasan kami menjaga kesegaran dan kualitas setiap kepala kol. Ciptakan hidangan sehat dan lezat dengan kol segar berkualitas kami!",
      additionalImages: ["../images/kol.jpg", "../images/kol.jpg"],
      sellerName: "GreenEarth",
      sellerLocation: "Yogyakarta",
      quantity: 210,
    },
    "4": {
      id: "4",
      name: "Wortel Segar",
      image: "../images/terong.jpg",
      price: "20000",
      description:
        "Rasakan kelezatan terong segar kami, pilihan ideal untuk berbagai hidangan lezat! Terong kami memiliki kulit yang halus dan daging yang lembut, sempurna untuk dipanggang, ditumis, atau dibuat dalam hidangan khas seperti capcay dan moussaka. Dipilih dengan teliti untuk memastikan kualitas terbaik, terong ini menawarkan rasa yang kaya dan tekstur yang memuaskan. Tambahkan sentuhan istimewa pada masakan Anda dengan terong segar kami, kaya akan nutrisi dan penuh cita rasa!",
      additionalImages: ["../images/terong.jpg", "../images/terong.jpg"],
      sellerName: "VeggieDelight",
      sellerLocation: "Semarang",
      quantity: 10,
    },
    "5": {
      id: "5",
      name: "Tomat",
      image: "../images/tomat.jpg",
      price: "18000",
      description:
        "Tomat segar kami, ideal untuk menambah rasa pada berbagai hidangan! Tomat kami memiliki warna cerah, daging yang juicy, dan rasa yang manis-pedas, cocok untuk salad, saus, atau sebagai bahan pelengkap masakan. Dipilih dari kebun terbaik, tomat ini mengandung nutrisi penting dan antioksidan yang bermanfaat untuk kesehatan. Segar dan lezat, tomat ini akan meningkatkan setiap hidangan Anda!",
      additionalImages: ["../images/tomat.jpg", "../images/tomat.jpg"],
      sellerName: "HerbMaster",
      sellerLocation: "Surabaya",
      quantity: 100,
    },
    "6": {
      id: "6",
      name: "Tomat Ceri",
      image: "../images/tomat-ceri.jpg",
      price: "25000",
      description:
        "Dengan ukuran yang kompak dan rasa yang manis, tomat ceri ini adalah pilihan sempurna untuk camilan sehat, salad segar, atau tambahan pada hidangan favorit Anda. Dipetik dengan tangan dari kebun kami, tomat ceri ini kaya akan vitamin dan antioksidan, menjadikannya tidak hanya lezat tetapi juga bermanfaat untuk kesehatan. Ideal untuk dinikmati langsung atau sebagai garnish untuk hidangan yang lebih menarik!",
      additionalImages: [
        "../images/tomat-ceri.jpg",
        "../images/tomat-ceri.jpg",
      ],
      sellerName: "SpiceWorld",
      sellerLocation: "Medan",
      quantity: 50,
    },
    "7": {
      id: "7",
      name: "Cabe Merah Keriting",
      image: "../images/cabe-merah-keriting.jpg",
      price: "30000",
      description:
        "Tambahkan sentuhan pedas dan warna cerah ke hidangan Anda dengan cabe merah keriting kami! Cabe ini memiliki tekstur keriting khas yang memberikan intensitas rasa dan aroma pedas yang kuat. Ideal untuk bumbu masakan, sambal, atau sebagai bahan tambahan dalam berbagai resep, cabe merah keriting ini dipilih dengan cermat untuk memastikan kesegaran dan kualitas tinggi. Dengan kandungan vitamin C yang tinggi, cabe ini juga baik untuk meningkatkan daya tahan tubuh. Nikmati rasa pedas yang autentik dan manfaat kesehatan dari cabe merah keriting kami!",
      additionalImages: [
        "../images/cabe-merah-keriting.jpg",
        "../images/cabe-merah-keriting.jpg",
      ],
      sellerName: "TropicalFruits",
      sellerLocation: "Bali",
      quantity: 15,
    },
    "8": {
      id: "8",
      name: "Cabe Rawit",
      image: "../images/cabe-rawit.jpg",
      price: "28000",
      description:
        "Rasakan sensasi pedas yang menggigit dengan cabe merah rawit kami! Cabe ini terkenal karena rasa pedasnya yang intens dan aromanya yang khas. Cocok untuk menambah cita rasa pada sambal, bumbu masakan, atau hidangan favorit Anda, cabe merah rawit kami dipilih secara teliti untuk memastikan kualitas dan kesegarannya. Dengan kandungan vitamin dan antioksidan yang tinggi, cabe merah rawit juga memberikan manfaat kesehatan tambahan. Pilihan sempurna untuk penggemar pedas yang mencari bahan berkualitas untuk masakan mereka!",
      additionalImages: [
        "../images/cabe-rawit.jpg",
        "../images/cabe-rawit.jpg",
      ],
      sellerName: "SpiceKing",
      sellerLocation: "Bandung",
      quantity: 150,
    },
    "9": {
      id: "9",
      name: "Paprika",
      image: "../images/paprika.jpg",
      price: "22000",
      description: "Description for Paprika.",
      additionalImages: ["../images/paprika.jpg", "../images/paprika.jpg"],
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
        "../images/lada-hitam.jpg",
        "../images/lada-hitam.jpg",
      ],
      sellerName: "FarmFresh",
      sellerLocation: "Bogor",
      quantity: 110,
    },
    "11": {
      id: "11",
      name: "Seledri",
      image: "../images/seledri.jpg",
      price: "35000",
      description:
        "Seledri segar kami adalah pilihan sempurna untuk menambah kerenyahan dan rasa pada hidangan Anda! Dengan tekstur yang renyah dan rasa yang menyegarkan, seledri ideal untuk salad, sup, atau sebagai camilan sehat. Mengandung vitamin K dan berbagai nutrisi penting, seledri juga bermanfaat untuk kesehatan tubuh. Dipilih secara cermat untuk memastikan kualitas dan kesegaran terbaik, seledri kami akan membuat hidangan Anda lebih lezat dan bergizi.",
      additionalImages: ["../images/seledri.jpg", "../images/seledri.jpg"],
      sellerName: "VeggieFarm",
      sellerLocation: "Cirebon",
      quantity: 154,
    },
    "12": {
      id: "12",
      name: "Wortel",
      image: "../images/wortel.jpg",
      price: "40000",
      description:
        "Wortel segar kami adalah pilihan ideal untuk menambah rasa manis alami dan nutrisi pada hidangan Anda! Dengan tekstur renyah dan rasa yang alami, wortel cocok untuk salad, sup, atau sebagai camilan sehat. Kaya akan vitamin A, serat, dan antioksidan, wortel mendukung kesehatan mata dan sistem pencernaan. Dipilih dengan cermat untuk memastikan kualitas dan kesegaran terbaik, wortel kami akan membuat setiap hidangan lebih lezat dan bergizi.",
      additionalImages: ["../images/wortel.jpg", "../images/wortel.jpg"],
      sellerName: "HarvestKing",
      sellerLocation: "Makassar",
      quantity: 1230,
    },
    "13": {
      id: "13",
      name: "Jahe",
      image: "../images/jahe.jpg",
      price: "25000",
      description:
        "Jahe segar kami adalah bahan dapur yang wajib ada untuk menambahkan cita rasa pedas dan aroma khas pada hidangan Anda. Dengan rasa hangat dan menyegarkan, jahe ideal untuk digunakan dalam berbagai masakan, teh, atau minuman kesehatan. Jahe juga dikenal memiliki sifat anti-inflamasi dan antioksidan, mendukung pencernaan dan meningkatkan sistem kekebalan tubuh. Pilih jahe segar kami untuk kualitas dan kesegaran yang terbaik.",
      additionalImages: ["../images/jahe.jpg", "../images/jahe.jpg"],
      sellerName: "OrganicVeg",
      sellerLocation: "Bali",
      quantity: 1110,
    },
    "14": {
      id: "14",
      name: "Bawang Bombai",
      image: "../images/bawang-bombai.jpg",
      price: "13000",
      description:
        "Bawang bombai kami adalah pilihan sempurna untuk menambah cita rasa gurih dan sedikit manis pada masakan Anda. Dengan tekstur yang renyah dan rasa yang lebih lembut dibandingkan bawang merah, bawang bombai ideal untuk digunakan dalam sup, tumisan, atau sebagai bahan dasar saus. Setiap bawang bombai segar kami memberikan aroma yang harum dan rasa yang menggugah selera, menjadikannya bahan penting di dapur Anda. Dapatkan bawang bombai berkualitas tinggi kami untuk meningkatkan setiap hidangan dengan rasa yang lezat.",
      additionalImages: [
        "../images/bawang-bombai.jpg",
        "../images/bawang-bombai.jpg",
      ],
      sellerName: "GreenMarket",
      sellerLocation: "Surabaya",
      quantity: 1500,
    },
    "15": {
      id: "15",
      name: "Bawang Putih",
      image: "../images/bawang-putih.jpg",
      price: "18000",
      description:
        "Bawang putih segar kami adalah bumbu serbaguna yang wajib ada di setiap dapur. Dengan aroma yang tajam dan rasa yang kuat, bawang putih memberikan kelezatan dan kedalaman rasa pada berbagai hidangan, mulai dari tumisan hingga saus dan marinades. Selain meningkatkan cita rasa masakan, bawang putih juga dikenal dengan manfaat kesehatan alaminya, termasuk sifat antioksidan dan anti-inflamasi. Pilih bawang putih kami untuk menambahkan sentuhan khas dan manfaat kesehatan pada setiap hidangan Anda.",
      additionalImages: [
        "../images/bawang-putih.jpg",
        "../images/Bawang Putih.jpg",
      ],
      sellerName: "HealthyVeg",
      sellerLocation: "Jakarta",
      quantity: 2345,
    },
    "16": {
      id: "16",
      name: "Bawang Merah",
      image: "../images/bawang-merah.jpg",
      price: "32000",
      description:
        "Dengan tekstur yang renyah dan rasa yang lebih manis dibandingkan bawang putih, bawang merah adalah bahan penting dalam berbagai resep, mulai dari salad, tumisan, hingga hidangan berkuah. Kaya akan vitamin dan mineral, bawang merah juga menawarkan manfaat kesehatan, termasuk sifat antioksidan dan anti-inflamasi. Tambahkan bawang merah ke dapur Anda untuk meningkatkan kualitas dan rasa masakan Anda.",
      additionalImages: [
        "../images/bawang-merah.jpg",
        "../images/bawang-merah.jpg",
      ],
      sellerName: "VeggieWorld",
      sellerLocation: "Bandung",
      quantity: 133,
    },
    "17": {
      id: "17",
      name: "Almond",
      image: "../images/almond.jpg",
      price: "22000",
      description:
        "Almond premium kami adalah camilan yang sempurna untuk meningkatkan kesehatan Anda. Dengan rasa yang kaya dan renyah, almond kaya akan protein, serat, serta vitamin dan mineral penting seperti vitamin E, magnesium, dan kalsium. Ideal untuk dikonsumsi langsung, dijadikan topping salad, atau dicampur dalam smoothie. Almond juga dapat membantu menjaga kesehatan jantung, mengontrol gula darah, dan memberikan energi sepanjang hari. Nikmati kelezatan dan manfaat kesehatan dari almond berkualitas tinggi ini.",
      additionalImages: ["../images/almond.jpg", "../images/almond.jpg"],
      sellerName: "FarmersMarket",
      sellerLocation: "Yogyakarta",
      quantity: 1534,
    },
    "18": {
      id: "18",
      name: "Bayam",
      image: "../images/bayam.jpg",
      price: "28000",
      description:
        "Temukan kelezatan dan manfaat kesehatan dari bayam segar kami. Bayam ini kaya akan vitamin A, vitamin C, zat besi, dan kalsium, menjadikannya tambahan sempurna untuk diet sehat Anda. Daunnya yang hijau cerah dan renyah cocok untuk berbagai hidangan, mulai dari salad segar hingga tumisan lezat. Bayam juga dikenal dapat membantu meningkatkan kesehatan mata, memperkuat sistem kekebalan tubuh, dan memberikan energi. Dapatkan bayam berkualitas tinggi ini untuk menambah kelezatan dan gizi pada setiap hidangan Anda.",
      additionalImages: ["../images/bayam.jpg", "../images/bayam.jpg"],
      sellerName: "RootVeg",
      sellerLocation: "Semarang",
      quantity: 213,
    },
    "19": {
      id: "19",
      name: "Timun",
      image: "../images/timun.jpg",
      price: "26000",
      description:
        "Timun ini dikenal karena kandungan airnya yang tinggi dan tekstur yang crisp, membuatnya ideal untuk salad, sandwich, atau sebagai camilan sehat. Kaya akan vitamin K dan serat, timun membantu mendukung pencernaan dan menjaga hidrasi tubuh. Dengan rasa yang ringan dan menyegarkan, timun ini adalah pilihan sempurna untuk meningkatkan nilai gizi dan kelezatan makanan Anda.",
      additionalImages: ["../images/timun.jpg", "../images/timun.jpg"],
      sellerName: "TropicalVeg",
      sellerLocation: "Medan",
      quantity: 456,
    },
    "20": {
      id: "20",
      name: "Jagung",
      image: "../images/jagung.jpg",
      price: "45000",
      description:
        "Pilihan sempurna untuk hidangan yang lezat dan bergizi. Jagung ini memiliki rasa manis yang khas dan tekstur yang renyah, cocok untuk direbus, dipanggang, atau ditambahkan ke salad dan sup. Kaya akan vitamin B, serat, dan antioksidan, jagung ini mendukung kesehatan pencernaan dan memberikan energi tambahan. Dengan kualitas premium dan kesegaran yang terjaga, jagung ini adalah tambahan yang ideal untuk setiap dapur.",
      additionalImages: ["../images/jagung.jpg", "../images/jagung.jpg"],
      sellerName: "GreenHarvest",
      sellerLocation: "Bali",
      quantity: 887,
    },
    "21": {
      id: "21",
      name: "Kentang",
      image: "../images/kentang.jpg",
      price: "7500",
      description:
        "Kentang segar kami yang dihasilkan dari proses penanaman yang cermat. Kentang ini memiliki bentuk bulat atau oval dengan kulit yang halus dan daging yang lembut, siap untuk diolah menjadi berbagai hidangan lezat. Ditanam di tanah yang subur dan dirawat dengan teknik yang ramah lingkungan, kentang kami kaya akan nutrisi dan cita rasa yang menggugah selera. Ideal untuk dipanggang, direbus, atau digoreng, kentang ini menjamin hasil yang sempurna setiap kali. Pilih kentang kami untuk pengalaman kuliner yang memuaskan dan penuh rasa!",
      additionalImages: ["../images/kentang.jpg", "../images/kentang.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Jakarta",
      quantity: 987,
    },
    "22": {
      id: "22",
      name: "Brokoli",
      image: "../images/brokoli.jpg",
      price: "35000",
      description:
        "Sayuran hijau berbentuk seperti kepala kecil yang padat dan kaya akan nutrisi. Dengan tangkai yang kokoh dan kuntum-kuntum kecil yang penuh dengan vitamin dan mineral, brokoli ini merupakan pilihan ideal untuk menjaga kesehatan Anda. Ditanam dengan teknik organik di tanah subur, brokoli kami menawarkan rasa yang renyah dan segar, serta warna hijau yang cerah. Cocok untuk berbagai masakan, dari tumisan hingga sup, brokoli ini akan menambah nilai gizi dan rasa pada setiap hidangan Anda. Pilih brokoli kami untuk mendapatkan kualitas terbaik dan manfaat kesehatan yang optimal!",
      additionalImages: ["../images/brokoli.jpg", "../images/brokoli.jpg"],
      sellerName: "SoyFarm",
      sellerLocation: "Bandung",
      quantity: 932,
    },
    "23": {
      id: "23",
      name: "Kol Merah",
      image: "../images/kol-merah.jpg",
      price: "15000",
      description:
        "Kol merah kami yang segar dan berkualitas tinggi, sayuran dengan warna ungu kemerahan yang mencolok dan bentuk bulat yang padat. Kol merah ini ditanam dengan penuh perhatian menggunakan metode pertanian organik di tanah yang kaya nutrisi, memastikan hasil panen yang segar dan penuh rasa. Dengan tekstur renyah dan rasa sedikit manis, kol merah sangat ideal untuk berbagai hidangan, dari salad segar yang menggugah selera hingga acar yang lezat. Tambahkan kol merah ke dalam dapur Anda dan nikmati kombinasi warna yang menarik dan manfaat gizi yang melimpah!",
      additionalImages: ["../images/kol-merah.jpg", "../images/kol-merah.jpg"],
      sellerName: "OrganicVeggie",
      sellerLocation: "Yogyakarta",
      quantity: 346,
    },
    "24": {
      id: "24",
      name: "Daun Bawang",
      image: "../images/daun-bawang.jpg",
      price: "35000",
      description:
        "dengan batang hijau cerah yang ramping dan bertekstur renyah. Ditanam dengan metode pertanian organik, daun bawang ini tumbuh di tanah subur yang memberikan rasa yang segar dan aromatik. Ideal untuk menambah rasa pada berbagai hidangan, mulai dari sup, tumisan, hingga salad, daun bawang kami menawarkan sentuhan rasa yang khas dan meningkatkan kelezatan masakan Anda. Nikmati kualitas dan kesegaran daun bawang yang dipilih secara teliti untuk memenuhi kebutuhan kuliner Anda.",
      additionalImages: [
        "../images/daun-bawang.jpg",
        "../images/daun-bawang.jpg",
      ],
      sellerName: "FruitHarvest",
      sellerLocation: "Surabaya",
      quantity: 333,
    },
    "25": {
      id: "25",
      name: "Labu",
      image: "../images/labu.jpg",
      price: "15000",
      description:
        "Memiliki kulit berwarna oranye cerah dan daging yang lembut. Dengan bentuk yang bulat dan sedikit bertekstur, labu ini adalah pilihan ideal untuk berbagai kreasi kuliner. Ditanam dengan teknik pertanian yang berkelanjutan, labu kami tumbuh di tanah yang kaya nutrisi, memastikan kualitas dan rasa yang optimal. Cocok untuk dibuat sup, pie, atau bahkan hidangan panggang, labu ini menawarkan kelezatan yang tidak hanya menggugah selera tetapi juga memberikan nilai gizi tambahan untuk setiap sajian.",
      additionalImages: ["../images/labu.jpg", "../images/labu.jpg"],
      sellerName: "TropicalFruit",
      sellerLocation: "Jakarta",
      quantity: 13,
    },
    "26": {
      id: "26",
      name: "Apel Malang",
      image: "../images/apel-malang.jpeg",
      price: "10000",
      description:
        "Apel Malang tumbuh subur di dataran tinggi Malang, Jawa Timur, dengan iklim sejuk dan tanah yang subur. Ditumbuhkan dengan perawatan intensif oleh petani lokal, apel ini dipanen dengan penuh hati-hati untuk memastikan kualitas terbaik sampai ke tangan konsumen. Apel Malang adalah pilihan tepat untuk menikmati buah-buahan yang segar dan berkualitas tinggi. Cocok untuk dikonsumsi langsung atau sebagai bahan tambahan dalam hidangan favorit Anda. Dapatkan kesegaran Apel Malang sekarang juga dan rasakan kenikmatannya!",
      additionalImages: [
        "../images/apel-malang.jpeg",
        "../images/apel-malang.jpeg",
      ],
      sellerName: "HarvestMoon",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "27": {
      id: "27",
      name: "Anggur",
      image: "../images/anggur.jpg",
      price: "12000",
      description:
        "Ditumbuhkan dengan perawatan intensif di kebun-kebun yang terletak di dataran tinggi, anggur kami mendapatkan asupan sinar matahari yang cukup dan irigasi alami yang melimpah. Setiap buah dipetik pada saat matang sempurna untuk menjaga kesegaran dan kualitasnya. Anggur segar ini sempurna untuk dinikmati langsung atau digunakan sebagai bahan dalam berbagai hidangan dan minuman. Rasakan sensasi manis yang menyegarkan dari anggur berkualitas tinggi ini sekarang juga. Segera pesan dan nikmati kebaikan alam dalam setiap gigitannya!",
      additionalImages: ["../images/anggur.jpg", "../images/anggur.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Bandung",
      quantity: 200,
    },
    "28": {
      id: "28",
      name: "Nanas Pemalang",
      image: "../images/nanas-pemalang.jpg",
      price: "15000",
      description:
        "Nanas ini diperlakukan dengan penuh kasih sayang dari tahap awal hingga panen. Proses penanaman yang organik dan alami memastikan setiap buah nanas tumbuh dengan rasa yang maksimal dan kualitas yang prima. Dipetik pada waktu yang tepat untuk memastikan kematangan dan kesegaran terbaik. Nanas Pemalang adalah pilihan sempurna untuk dinikmati segar, dijadikan jus, atau sebagai tambahan dalam berbagai hidangan. Dengan rasa manis yang khas dan tekstur yang lembut, nanas ini pasti akan memanjakan lidah Anda. Pesan sekarang dan rasakan kelezatan tropis yang autentik!",
      additionalImages: [
        "../images/nanas-pemalang.jpg",
        "../images/nanas-pemalang.jpg",
      ],
      sellerName: "GreenEarth",
      sellerLocation: "Yogyakarta",
      quantity: 210,
    },
    "29": {
      id: "29",
      name: "Pepaya California",
      image: "../images/pepaya-california.jpg",
      price: "20000",
      description:
        "Pepaya California memiliki bentuk lonjong dengan kulit halus berwarna hijau kekuningan saat matang. Buah ini memiliki daging yang tebal dan berwarna oranye kemerahan, menawarkan rasa manis yang lezat dan tekstur yang lembut. Buah ini juga dikenal akan biji hitamnya yang kaya akan enzim papain. Ditanam di lahan dengan kualitas tanah yang unggul dan iklim tropis yang ideal, pepaya California dirawat dengan baik sejak masa tanam hingga panen. Proses penanaman menggunakan metode organik, bebas dari pestisida dan bahan kimia berbahaya, memastikan buah yang dihasilkan aman dan sehat untuk dikonsumsi. Dipetik saat matang untuk memberikan rasa dan kualitas terbaik. Pepaya California tidak hanya lezat, tetapi juga kaya akan vitamin A, C, dan serat, menjadikannya pilihan yang sempurna untuk konsumsi sehari-hari atau sebagai campuran dalam salad dan jus. Dapatkan pepaya California segar dengan kualitas terbaik dan rasakan manfaat kesehatan serta kenikmatannya!",
      additionalImages: [
        "../images/pepaya-california.jpg",
        "../images/pepaya-california.jpg",
      ],
      sellerName: "VeggieDelight",
      sellerLocation: "Semarang",
      quantity: 10,
    },
    "30": {
      id: "30",
      name: "Pisang Sunpride",
      image: "../images/pisang-sunpride.jpg",
      price: "18000",
      description:
        "Buah ini dikenal dengan bentuknya yang melengkung sempurna, kulit kuning cerah, dan daging buah yang lembut serta manis. Pisang ini merupakan pilihan ideal untuk camilan sehat, sarapan cepat, atau sebagai tambahan pada sereal dan smoothie. Ditanam di kebun beriklim tropis dengan tanah yang subur, buah ini dipanen dengan standar kualitas tinggi. Proses penanamannya mengutamakan metode ramah lingkungan, memastikan pisang yang Anda konsumsi bebas dari bahan kimia berbahaya dan pestisida. Pisang ini kaya akan vitamin B6, vitamin C, serat, dan potasium, membantu meningkatkan energi, mendukung sistem pencernaan yang sehat, dan menjaga keseimbangan elektrolit dalam tubuh. Nikmati pisang yang lezat dan sehat setiap hari!",
      additionalImages: [
        "../images/pisang-sunpride.jpg",
        "../images/pisang-sunpride.jpg",
      ],
      sellerName: "HerbMaster",
      sellerLocation: "Surabaya",
      quantity: 100,
    },
    "31": {
      id: "31",
      name: "Belimbing",
      image: "../images/belimbing.jpg",
      price: "25000",
      description:
        "Belimbing dikenal dengan bentuknya yang unik menyerupai bintang saat diiris, kulit halus berwarna kuning kehijauan, dan daging buah yang renyah serta segar. Belimbing menawarkan rasa manis asam yang menyegarkan, menjadikannya pilihan sempurna untuk camilan sehat atau tambahan pada salad dan hidangan penutup. Ditanam di kebun tropis dengan teknik budidaya berkelanjutan, belimbing dipanen dengan cermat untuk memastikan kualitas dan kesegaran optimal. Setiap buah diperlakukan dengan penuh perhatian agar bebas dari residu pestisida, sehingga Anda dapat menikmatinya tanpa khawatir. Belimbing kaya akan vitamin C, serat, dan antioksidan, yang baik untuk meningkatkan kekebalan tubuh, menjaga kesehatan kulit, dan melancarkan pencernaan. Nikmati belimbing segar kami untuk pengalaman rasa yang unik dan menyehatkan!",
      additionalImages: ["../images/belimbing.jpg", "../images/belimbing.jpg"],
      sellerName: "SpiceWorld",
      sellerLocation: "Medan",
      quantity: 50,
    },
    "32": {
      id: "32",
      name: "Blueberry",
      image: "../images/blueberry.jpg",
      price: "30000",
      description:
        "Nikmati manisnya blueberry segar dengan rasa yang lezat dan warna biru keunguan yang memikat. Setiap buah dipilih secara cermat untuk memberikan kualitas terbaik, menawarkan kombinasi sempurna antara manis dan sedikit asam. Teksturnya yang lembut dan berair membuatnya ideal untuk dikonsumsi langsung, ditambahkan ke sereal, yogurt, atau dibuat smoothie. Ditanam di kebun yang subur dengan teknik pertanian berkelanjutan, blueberry kami dipetik pada puncak kematangannya untuk memastikan kesegaran dan rasa terbaik. Proses pemanenan dan pengemasan dilakukan dengan teliti untuk mempertahankan nutrisi dan integritas buah. Blueberry adalah sumber antioksidan, vitamin C, dan serat yang tinggi, menjadikannya pilihan sempurna untuk meningkatkan kesehatan jantung, fungsi otak, dan menjaga sistem kekebalan tubuh. Tambahkan blueberry segar ke dalam menu harian Anda dan rasakan manfaat sehatnya!",
      additionalImages: ["../images/blueberry.jpg", "../images/blueberry.jpg"],
      sellerName: "TropicalFruits",
      sellerLocation: "Bali",
      quantity: 15,
    },
    "33": {
      id: "33",
      name: "Buah Naga",
      image: "../images/buah-naga.jpg",
      price: "28000",
      description:
        "Temukan keajaiban buah naga dengan kulit berwarna cerah dan daging berwarna putih atau merah yang memikat. Dengan tekstur yang renyah dan rasa manis yang segar, buah naga adalah pilihan ideal untuk menambah keunikan pada hidangan Anda. Rasakan kelezatannya langsung, atau tambahkan ke dalam salad, smoothie, atau sebagai hiasan eksotis pada dessert. Ditanam dengan hati-hati di lingkungan yang optimal, buah naga kami dibudidayakan menggunakan metode pertanian yang ramah lingkungan untuk menghasilkan buah yang berkualitas tinggi. Proses pemanenan yang tepat memastikan bahwa setiap buah dipetik pada saat puncaknya untuk mendapatkan kesegaran maksimal. Buah naga kaya akan vitamin C, antioksidan, dan serat, menjadikannya pilihan yang tidak hanya lezat tetapi juga menyehatkan. Nikmati sensasi eksotis dari buah naga yang penuh warna dan manfaat sehatnya dalam setiap gigitan!",
      additionalImages: ["../images/buah-naga.jpg", "../images/buah-naga.jpg"],
      sellerName: "SpiceKing",
      sellerLocation: "Bandung",
      quantity: 150,
    },
    "34": {
      id: "34",
      name: "cherry",
      image: "../images/cherry.jpg",
      price: "22000",
      description:
        "Nikmati kelezatan ceri yang segar dengan rasa manis alami dan tekstur juicy yang menyegarkan. Ceri kami menawarkan warna merah cerah yang menggugah selera dan bisa dinikmati langsung sebagai camilan sehat, ditambahkan ke salad, atau digunakan dalam berbagai resep dessert dan hidangan manis lainnya. Ditanam dengan penuh perhatian di kebun kami, ceri dipetik pada saat kematangan optimal untuk memastikan setiap buah mencapai puncak rasa dan kualitas. Metode budidaya kami memprioritaskan teknik ramah lingkungan dan pengendalian kualitas yang ketat untuk memberikan ceri yang terbaik. Kaya akan vitamin C, antioksidan, dan serat, ceri tidak hanya lezat tetapi juga menyehatkan. Tambahkan ceri segar ke dalam kehidupan Anda untuk sensasi manis yang alami dan manfaat kesehatan yang menyegarkan!",
      additionalImages: ["../images/cherry.jpg", "../images/cherry.jpg"],
      sellerName: "GourmetStore",
      sellerLocation: "Jakarta",
      quantity: 155,
    },
    "35": {
      id: "35",
      name: "Durian",
      image: "../images/durian.jpg",
      price: "14000",
      description:
        "Temukan kelezatan durian premium yang memikat, dikenal sebagai Raja Buah dengan rasa yang unik dan aroma yang khas. Daging durian ini lembut, creamy, dan beraroma kuat, menawarkan pengalaman rasa yang tidak terlupakan. Dengan warna kuning keemasan dan tekstur yang kaya, durian ini sempurna untuk dinikmati langsung, ditambahkan ke dessert, atau dijadikan bahan dalam berbagai resep kuliner eksotis. Ditanam dengan hati-hati di kebun kami menggunakan metode organik, durian dipetik saat matang sempurna untuk memastikan kualitas dan rasa terbaik. Kami menerapkan teknik perawatan yang cermat dan berkelanjutan untuk menghasilkan buah yang segar dan berkualitas tinggi. Nikmati durian premium kami yang penuh dengan vitamin, mineral, dan energi, menjadikannya pilihan yang menggugah selera dan bergizi untuk pencinta buah yang mencari sensasi rasa yang istimewa.",
      additionalImages: ["../images/durian.jpg", "../images/durian.jpg"],
      sellerName: "FarmFresh",
      sellerLocation: "Bogor",
      quantity: 110,
    },
    "36": {
      id: "36",
      name: "Jambu",
      image: "../images/jambu.jpg",
      price: "35000",
      description:
        "Nikmati kesegaran jambu yang menggiurkan dengan rasa manis yang alami dan tekstur yang renyah. Buah jambu ini memiliki daging berwarna putih atau merah yang juicy, dan aroma harum yang menyegarkan. Ideal untuk dimakan langsung, dijadikan jus, atau ditambahkan ke salad dan dessert. Kaya akan vitamin C dan antioksidan, jambu adalah pilihan sehat yang enak untuk setiap hidangan. Ditanam di kebun kami dengan teknik organik dan perawatan yang teliti, memastikan buah jambu dipetik pada puncak kematangannya untuk kualitas dan rasa terbaik. Proses penanaman yang ramah lingkungan menjamin buah yang segar dan berkualitas tinggi. Rasakan manfaat kesehatan dan kelezatan alami dari jambu kami, buah yang sempurna untuk memperkaya diet harian Anda dengan rasa segar dan nutrisi.",
      additionalImages: ["../images/jambu.jpg", "../images/jambu.jpg"],
      sellerName: "VeggieFarm",
      sellerLocation: "Cirebon",
      quantity: 154,
    },
    "37": {
      id: "37",
      name: "Jeruk",
      image: "../images/jeruk.jpg",
      price: "40000",
      description:
        "Rasakan kelezatan jeruk kami yang segar dengan rasa manis yang seimbang dan sentuhan asam yang menyegarkan. Setiap buah jeruk memiliki kulit berwarna cerah dan daging juicy yang penuh dengan vitamin C. Cocok untuk dimakan langsung, dijadikan jus, atau digunakan dalam berbagai resep. Jeruk kami tidak hanya memanjakan lidah tetapi juga memberikan manfaat kesehatan dengan antioksidan dan nutrisi yang melimpah. Ditanam dengan penuh perhatian dalam kebun kami yang terawat, jeruk kami tumbuh dengan teknik pertanian yang ramah lingkungan dan tanpa penggunaan pestisida berbahaya. Proses pemetikan yang tepat memastikan buah jeruk tiba dalam kondisi segar dan berkualitas tinggi. Nikmati kesegaran alami dan manfaat kesehatan dari jeruk kami, pilihan ideal untuk setiap hidangan dan sebagai tambahan yang sempurna untuk gaya hidup sehat Anda.",
      additionalImages: ["../images/jeruk.jpg", "../images/jeruk.jpg"],
      sellerName: "HarvestKing",
      sellerLocation: "Makassar",
      quantity: 1230,
    },
    "38": {
      id: "38",
      name: "Alpukat Mentega",
      image: "../images/alpukat-mentega.jpg",
      price: "25000",
      description:
        "Temukan kelezatan alpukat mentega kami yang creamy dan kaya rasa! Dengan tekstur yang lembut dan rasa buttery yang khas, alpukat ini ideal untuk berbagai hidangan. Nikmati kelezatan alami saat disajikan sebagai topping salad, bahan dalam smoothie, atau diolah menjadi guacamole. Kaya akan vitamin, mineral, dan lemak sehat, alpukat mentega kami memberikan manfaat gizi yang luar biasa untuk diet Anda. Ditanam dengan teknik pertanian modern dalam kebun yang terkelola dengan baik, alpukat mentega kami tumbuh dengan perawatan yang optimal. Tanpa bahan kimia berbahaya dan dengan proses pemetikan yang hati-hati, memastikan buah tiba dalam kondisi prima dan siap untuk dinikmati. Manjakan diri Anda dengan alpukat mentega kami, pilihan ideal untuk menambahkan kelezatan dan nutrisi pada setiap hidangan.",
      additionalImages: [
        "../images/alpukat-mentega.jpg",
        "../images/alpukat-mentega.jpg",
      ],
      sellerName: "OrganicVeg",
      sellerLocation: "Bali",
      quantity: 1110,
    },
    "39": {
      id: "39",
      name: "Kelapa",
      image: "../images/kelapa.jpg",
      price: "13000",
      description:
        "Rasakan kesegaran kelapa kami yang baru dipetik langsung dari pohonnya! Dengan kulit yang tebal dan daging kelapa yang kaya, buah ini menawarkan rasa yang manis dan segar. Cocok untuk berbagai penggunaan, mulai dari bahan dasar minuman tropis hingga campuran hidangan penutup dan masakan. Selain itu, kelapa juga kaya akan nutrisi penting seperti serat, vitamin, dan mineral, memberikan manfaat kesehatan tambahan. Kelapa kami ditanam di kebun kelapa yang terawat dengan baik menggunakan metode organik, tanpa penggunaan pestisida kimia. Proses panen yang hati-hati memastikan kelapa tiba dalam kondisi terbaik, siap untuk memberikan cita rasa tropis yang autentik dan manfaat kesehatan yang optimal. Nikmati kelapa kami dalam berbagai bentuk dan rasakan kelezatannya langsung dari sumbernya!",
      additionalImages: ["../images/kelapa.jpg", "../images/kelapa.jpg"],
      sellerName: "GreenMarket",
      sellerLocation: "Surabaya",
      quantity: 1500,
    },
    "40": {
      id: "40",
      name: "Lemon",
      image: "../images/lemon.jpg",
      price: "18000",
      description:
        "Nikmati kelezatan lemon segar kami yang menambah cita rasa asam yang menyegarkan pada setiap hidangan! Buah lemon ini memiliki kulit kuning cerah dan daging yang juicy, ideal untuk digunakan dalam minuman, salad, saus, atau sebagai bahan penyedap alami. Kaya akan vitamin C, lemon juga memberikan manfaat kesehatan yang luar biasa, termasuk meningkatkan sistem kekebalan tubuh dan mendukung pencernaan. Lemon kami ditanam dengan teknik pertanian yang ramah lingkungan, memastikan buah yang berkualitas tinggi dan bebas dari bahan kimia berbahaya. Setiap lemon dipanen pada puncak kematangan untuk memastikan rasa yang optimal dan kesegaran yang tak tertandingi. Tambahkan sentuhan segar dan cerah pada masakan Anda dengan lemon kami yang berkualitas!",
      additionalImages: ["../images/lemon.jpg", "../images/lemon.jpg"],
      sellerName: "HealthyVeg",
      sellerLocation: "Jakarta",
      quantity: 2345,
    },
    "41": {
      id: "41",
      name: "Mangga",
      image: "../images/mangga.jpg",
      price: "32000",
      description:
        "Rasakan kelezatan mangga segar kami yang memanjakan lidah dengan rasa manis dan tekstur yang lembut! Buah mangga ini memiliki daging berwarna oranye cerah yang juicy dan aroma harum yang menggugah selera. Ideal untuk dinikmati langsung, dibuat jus, atau sebagai tambahan dalam salad dan dessert. Mangga kami kaya akan vitamin A dan C, serta serat yang mendukung kesehatan pencernaan. Mangga kami ditanam di lahan yang subur dengan perawatan yang teliti, memastikan buah yang matang sempurna dan bebas dari bahan kimia. Setiap mangga dipanen pada waktu yang tepat untuk mendapatkan rasa dan kesegaran terbaik. Tambahkan sentuhan tropis pada hidangan Anda dengan mangga kami yang berkualitas tinggi!",
      additionalImages: ["../images/mangga.jpg", "../images/mangga.jpg"],
      sellerName: "VeggieWorld",
      sellerLocation: "Bandung",
      quantity: 133,
    },
    "42": {
      id: "42",
      name: "Manggis",
      image: "../images/manggis.jpg",
      price: "22000",
      description:
        "Dengan kulit berwarna ungu tua yang tebal dan daging putih yang lembut di dalamnya, manggis ini menawarkan rasa manis dan sedikit asam yang sangat menyegarkan. Setiap gigitan memberikan sensasi yang lembut dan juicy, menjadikannya pilihan sempurna untuk dinikmati langsung, ditambahkan dalam salad, atau digunakan dalam dessert. Manggis kami tumbuh di kebun yang terawat dengan baik dan dipanen pada puncak kematangan untuk memastikan kualitas dan kesegaran terbaik. Proses penanaman kami mengutamakan praktik pertanian yang ramah lingkungan untuk menghasilkan buah yang lezat dan berkualitas tinggi. Rasakan kelezatan tropis dari manggis kami dan tambahkan keunikan pada hidangan Anda!",
      additionalImages: ["../images/manggis.jpg", "../images/manggis.jpg"],
      sellerName: "FarmersMarket",
      sellerLocation: "Yogyakarta",
      quantity: 1534,
    },
    "43": {
      id: "43",
      name: "Melon",
      image: "../images/melon.jpg",
      price: "28000",
      description:
        "Buah melon kami memiliki daging yang lembut dan juicy dengan rasa yang manis dan segar. Dengan kulit yang halus dan warna cerah, melon ini adalah pilihan sempurna untuk hidangan penutup, salad, atau dinikmati langsung sebagai camilan sehat. Setiap potong melon memberikan rasa kesegaran tropis yang menyegarkan. Melon kami dibudidayakan dengan teknik pertanian terbaik di kebun yang terjaga dengan baik. Kami memastikan buah ini dipanen pada puncaknya untuk memberikan kualitas terbaik dan rasa yang maksimal. Proses penanaman kami ramah lingkungan untuk menghasilkan melon berkualitas tinggi dan lezat. Rasakan kelezatan melon kami dan tambahkan kesegaran tropis dalam setiap hidangan Anda!",
      additionalImages: ["../images/melon.jpg", "../images/melon.jpg"],
      sellerName: "RootVeg",
      sellerLocation: "Semarang",
      quantity: 213,
    },
    "44": {
      id: "44",
      name: "Nangka",
      image: "../images/nangka.jpg",
      price: "26000",
      description:
        "Buah nangka kami menawarkan daging yang lembut dengan rasa manis dan aroma tropis yang khas. Dengan tekstur yang serbaguna, nangka ini cocok untuk berbagai hidangan, mulai dari camilan segar hingga bahan dalam masakan dan dessert. Setiap potong nangka memberikan sensasi rasa yang kaya dan memuaskan. Nangka kami ditanam dengan metode pertanian berkualitas tinggi di kebun yang terawat dengan baik. Kami memastikan setiap buah dipanen pada kematangan optimal untuk memastikan rasa dan kualitas terbaik. Proses penanaman kami memprioritaskan praktik ramah lingkungan untuk hasil yang optimal dan berkelanjutan. Nikmati kelezatan dan kesegaran nangka kami dalam setiap gigitan!",
      additionalImages: ["../images/nangka.jpg", "../images/nangka.jpg"],
      sellerName: "TropicalVeg",
      sellerLocation: "Medan",
      quantity: 456,
    },
    "45": {
      id: "45",
      name: "Pir",
      image: "../images/pir.jpg",
      price: "45000",
      description:
        "Buah pir ini memiliki daging yang lembut dan juicy dengan rasa manis yang menyegarkan. Setiap gigitan memberikan kombinasi ideal antara rasa manis dan sedikit keasaman yang membuatnya cocok sebagai camilan sehat, bahan tambahan dalam salad, atau bahan utama dalam berbagai dessert. Pir kami ditanam di kebun yang dikelola dengan hati-hati, memastikan setiap buah dipanen pada waktu yang tepat untuk mencapai kematangan sempurna. Kami menggunakan teknik pertanian berkelanjutan untuk menghasilkan pir berkualitas tinggi dengan rasa yang konsisten dan memuaskan. Rasakan kualitas dan kelezatan pir kami yang segar dalam setiap buah!",
      additionalImages: ["../images/pir.jpg", "../images/pir.jpg"],
      sellerName: "GreenHarvest",
      sellerLocation: "Bali",
      quantity: 887,
    },
    "46": {
      id: "46",
      name: "Semangka",
      image: "../images/semangka.jpg",
      price: "7500",
      description:
        "Segarkan hari Anda dengan semangka kami yang juicy dan manis! Dengan daging buah yang merah cerah dan penuh air, semangka ini menawarkan rasa yang lezat dan menyegarkan. Cocok untuk dinikmati langsung sebagai camilan, ditambahkan ke salad buah, atau dibuat jus segar. Semangka kami ditanam dengan teknik pertanian modern dan berkelanjutan, memastikan buah yang dipanen memiliki kualitas terbaik dan rasa yang optimal. Ditanam di tanah yang subur dan dirawat dengan penuh perhatian, semangka ini mencapai kematangan sempurna untuk pengalaman rasa yang maksimal. Nikmati kesegaran dan rasa manis semangka kami dalam setiap potongnya!",
      additionalImages: ["../images/semangka.jpg", "../images/semangka.jpg"],
      sellerName: "FreshFarm",
      sellerLocation: "Jakarta",
      quantity: 987,
    },
    "47": {
      id: "47",
      name: "Strawberry",
      image: "../images/strawberry.jpg",
      price: "35000",
      description:
        "Dengan warna merah cerah dan rasa manis yang menggugah selera, stroberi ini adalah pilihan sempurna untuk camilan sehat, topping salad, atau bahan utama dalam dessert dan smoothies. Setiap buah menawarkan tekstur renyah dan aroma yang menggoda. Stroberi kami ditanam dengan teknik berkualitas tinggi, di lahan yang dirawat secara cermat untuk memastikan buah yang berkualitas terbaik. Ditanam dalam kondisi optimal, stroberi ini tumbuh subur dan dipanen pada puncak kematangan untuk memastikan rasa yang menyenangkan dan kesegaran yang maksimal. Rasakan kelezatan stroberi segar kami dan tambahkan sentuhan manis pada setiap hidangan!",
      additionalImages: [
        "../images/strawberry.jpg",
        "../images/strawberry.jpg",
      ],
      sellerName: "SoyFarm",
      sellerLocation: "Bandung",
      quantity: 932,
    },
    "48": {
      id: "48",
      name: "Lychee",
      image: "../images/lychee.jpg",
      price: "15000",
      description:
        "Dengan kulit merah-merah cerah yang menawan dan daging buah yang lembut, leci ini menawarkan pengalaman rasa yang eksotis dan menyegarkan. Ideal untuk camilan, salad buah, atau sebagai tambahan pada berbagai hidangan penutup. Leci kami dibudidayakan dengan perhatian dan teknik pertanian yang cermat. Tanaman leci dirawat dalam kondisi optimal untuk memastikan buah yang berkualitas tinggi dan rasa yang maksimal. Dipanen pada puncak kematangan, leci ini menjanjikan kesegaran yang tiada tara. Nikmati kelezatan leci segar dan berikan sentuhan tropis pada setiap hidangan Anda!",
      additionalImages: ["../images/lychee.jpg", "../images/lychee.jpg"],
      sellerName: "OrganicVeggie",
      sellerLocation: "Yogyakarta",
      quantity: 346,
    },
    "49": {
      id: "49",
      name: "Kiwi",
      image: "../images/kiwi.jpg",
      price: "35000",
      description:
        "Rasakan kelezatan kiwi premium kami yang kaya rasa dan bergizi! Dengan kulit berwarna coklat keabu-abuan yang berbulu halus dan daging buah hijau cerah yang penuh dengan biji kecil, kiwi ini menawarkan kombinasi rasa manis dan asam yang menyegarkan. Ideal sebagai camilan sehat, tambahan dalam smoothie, atau sebagai topping salad buah. Kiwi kami ditanam dengan penuh perhatian di kebun-kebun yang memiliki iklim ideal untuk memastikan buah yang berkualitas tinggi. Dipanen pada saat kematangan optimal, kiwi ini menawarkan rasa dan tekstur yang terbaik untuk dinikmati. Nikmati kiwi segar kami dan berikan sentuhan eksotis pada hidangan Anda!",
      additionalImages: ["../images/kiwi.jpg", "../images/kiwi.jpg"],
      sellerName: "FruitHarvest",
      sellerLocation: "Surabaya",
      quantity: 333,
    },
    "50": {
      id: "50",
      name: "Jambu Air",
      image: "../images/jambu-air.jpg",
      price: "15000",
      description:
        "Dengan kulit berwarna merah muda cerah dan daging buah yang juicy, jambu air ini memberikan rasa manis dan segar dalam setiap gigitan. Ideal untuk camilan sehat, salad buah, atau sebagai tambahan menyegarkan pada hidangan Anda. Jambu air kami dibudidayakan dengan cermat di kebun yang terawat dengan baik untuk memastikan buah yang berkualitas. Dipanen pada puncak kematangan untuk memberikan rasa dan tekstur terbaik, jambu air ini siap memanjakan lidah Anda. Tambahkan jambu air segar kami ke keranjang belanja Anda dan rasakan kenikmatan alami yang menyegarkan!",
      additionalImages: ["../images/jambu-air.jpg", "../images/jambu-air.jpg"],
      sellerName: "TropicalFruit",
      sellerLocation: "Jakarta",
      quantity: 13,
    },
    "51": {
      id: "51",
      name: "Ayam & Jagung",
      image: "../images/ayam-jagung.jpg",
      price: "10000",
      description:
        "Nikmati kelezatan praktis dengan paket bundling Ayam & Jagung kami! Paket ini menghadirkan potongan ayam berkualitas tinggi yang dipadukan dengan jagung segar yang manis dan renyah. Ideal untuk berbagai resep, dari panggang hingga sup, setiap bahan dalam paket ini dipilih dengan cermat untuk memberikan rasa terbaik. Sempurna untuk makan malam keluarga atau pesta barbekyu. Dapatkan sekarang dan buat hidangan lezat dengan mudah!",
      additionalImages: [
        "../images/ayam-jagung.jpg",
        "../images/ayam-jagung.jpg",
      ],
      sellerName: "HarvestMoon",
      sellerLocation: "Jakarta",
      quantity: 150,
    },
    "52": {
      id: "52",
      name: "Ayam & Tomat",
      image: "../images/ayam-tomat.jpg",
      price: "12000",
      description:
        "Hadirkan kelezatan pada setiap hidangan dengan paket bundling Ayam & Tomat kami! Paket ini menyajikan potongan ayam berkualitas tinggi yang dipadukan dengan tomat segar dan juicy. Tomat memberikan rasa segar dan asam yang sempurna untuk melengkapi hidangan ayam Anda, dari semur hingga panggangan. Ideal untuk memasak makanan keluarga atau acara spesial. Dapatkan bundling ini dan nikmati kombinasi rasa yang lezat dan bergizi!",
      additionalImages: [
        "../images/ayam-tomat.jpg",
        "../images/ayam-tomat.jpg",
      ],
      sellerName: "FreshFarm",
      sellerLocation: "Bandung",
      quantity: 200,
    },
    "53": {
      id: "53",
      name: "Dada Ayam & Selada",
      image: "../images/dada-ayam-selada.jpg",
      price: "15000",
      description:
        "Paket ini menyajikan dada ayam berkualitas tinggi yang empuk dan penuh rasa, dipadukan dengan selada segar dan renyah. Ideal untuk membuat salad sehat, sandwich, atau hidangan panggang. Dengan kombinasi protein dari dada ayam dan nutrisi dari selada, Anda dapat menikmati makanan yang memuaskan dan bergizi setiap hari. Dapatkan bundling ini sekarang dan ciptakan hidangan yang enak dan menyegarkan!",
      additionalImages: [
        "../images/dada-ayam-selada.jpg",
        "../images/dada-ayam-selada.jpg",
      ],
      sellerName: "GreenEarth",
      sellerLocation: "Yogyakarta",
      quantity: 210,
    },
    "54": {
      id: "54",
      name: "Daging Sapi & Sayur",
      image: "../images/daging-sapi-sayur.jpg",
      price: "20000",
      description:
        "Ciptakan hidangan lezat dan bergizi dengan bundling Daging Sapi & Sayur kami! Paket ini menawarkan potongan daging sapi premium yang juicy dan tender, dipadukan dengan campuran sayuran segar dan sehat. Ideal untuk berbagai resep, mulai dari tumisan hingga sup atau panggangan. Nikmati kombinasi protein berkualitas tinggi dan nutrisi sayuran yang memuaskan selera dan mendukung gaya hidup sehat. Dapatkan bundling ini sekarang dan hadirkan sajian yang nikmat dan bergizi di meja makan Anda!",
      additionalImages: [
        "../images/daging-sapi-sayur.jpg",
        "../images/daging-sapi-sayur.jpg",
      ],
      sellerName: "VeggieDelight",
      sellerLocation: "Semarang",
      quantity: 10,
    },
    "55": {
      id: "55",
      name: "Daun Bawang & Wortel",
      image: "../images/daun-bawang-wortel.jpg",
      price: "18000",
      description:
        "Tambahkan kesegaran dan rasa pada masakan Anda dengan bundling Daun Bawang & Wortel kami! Paket ini terdiri dari daun bawang yang renyah dan aromatik serta wortel segar yang manis dan crunchy. Cocok untuk berbagai hidangan, mulai dari sup, tumisan, hingga salad. Nikmati kombinasi sayuran berkualitas tinggi yang memperkaya setiap resep dengan rasa dan nutrisi. Dapatkan bundling ini untuk mempermudah persiapan makanan sehat dan lezat di rumah!",
      additionalImages: [
        "../images/daun-bawang-wortel.jpg",
        "../images/daun-bawang-wortel.jpg",
      ],
      sellerName: "HerbMaster",
      sellerLocation: "Surabaya",
      quantity: 100,
    },
    "56": {
      id: "56",
      name: "Kacang Mix",
      image: "../images/kacang-mix.jpg",
      price: "25000",
      description:
        "Paket ini menyajikan kombinasi kacang-kacangan pilihan, termasuk kacang almond, kacang mete, kacang tanah, dan kenari, yang dipanggang dengan sempurna untuk rasa yang renyah dan gurih. Ideal untuk ngemil saat santai, menambah topping pada salad, atau sebagai campuran dalam resep kue. Kaya akan protein dan lemak sehat, Kacang Mix kami adalah pilihan camilan yang bergizi dan memuaskan. Segera dapatkan bundling ini untuk menambah variasi dan kelezatan pada camilan harian Anda!",
      additionalImages: [
        "../images/kacang-mix.jpg",
        "../images/kacang-mix.jpg",
      ],
      sellerName: "SpiceWorld",
      sellerLocation: "Medan",
      quantity: 50,
    },
    "57": {
      id: "57",
      name: "Kentang & Nugget",
      image: "../images/kentang-nugget.jpg",
      price: "30000",
      description:
        "Rasakan kelezatan yang sempurna dengan bundling Kentang & Nugget kami! Paket ini mencakup kentang segar berkualitas tinggi yang bisa dipanggang atau digoreng hingga renyah, dan nugget ayam lezat yang digoreng dengan lapisan crispy. Ideal untuk hidangan keluarga, makanan cepat saji di rumah, atau acara santai, bundling ini menawarkan kombinasi rasa yang menggugah selera dan mudah disiapkan. Nikmati sajian praktis dan enak ini kapan saja, cocok untuk semua usia!",
      additionalImages: [
        "../images/kentang-nugget.jpg",
        "../images/kentang-nugget.jpg",
      ],
      sellerName: "TropicalFruits",
      sellerLocation: "Bali",
      quantity: 15,
    },
    "58": {
      id: "58",
      name: "Labu & Kol",
      image: "../images/labu-kol.jpg",
      price: "28000",
      description:
        "Sajikan hidangan sehat dan lezat dengan bundling Labu & Kol kami! Paket ini mencakup labu segar yang manis dan lembut, serta kol yang renyah dan bergizi. Kombinasi ini sempurna untuk membuat sup hangat, tumisan, atau salad segar yang menyehatkan. Ideal untuk keluarga yang mengutamakan pola makan sehat tanpa mengorbankan rasa. Nikmati kemudahan menyiapkan hidangan bergizi dengan sentuhan alami dari bundling Labu & Kol kami!",
      additionalImages: ["../images/labu-kol.jpg", "../images/labu-kol.jpg"],
      sellerName: "SpiceKing",
      sellerLocation: "Bandung",
      quantity: 150,
    },
    "59": {
      id: "59",
      name: "Labu & Ubi",
      image: "../images/labu-ubi.jpg",
      price: "22000",
      description:
        "Paket ini menawarkan labu segar yang lembut dan ubi manis yang kenyal, sempurna untuk berbagai hidangan. Gunakan kombinasi ini untuk membuat sup kental, puding sehat, atau hidangan panggang yang menggugah selera. Cocok untuk keluarga yang mencari bahan berkualitas untuk menyajikan makanan bergizi dan penuh rasa. Dapatkan kemudahan dan kelezatan dari bundling Labu & Ubi Manis kami hari ini!",
      additionalImages: ["../images/labu-ubi.jpg", "../images/labu-ubi.jpg"],
      sellerName: "GourmetStore",
      sellerLocation: "Jakarta",
      quantity: 155,
    },
    "60": {
      id: "60",
      name: "Nanas & Semangka",
      image: "../images/nanas-semangka.jpg",
      price: "14000",
      description:
        "Segarkan hari Anda dengan bundling Nanas & Semangka kami! Paket ini menghadirkan kombinasi buah tropis yang cerah dan lezat, ideal untuk meningkatkan suasana hati dan kesehatan. Nikmati nanas yang manis dan juicy serta semangka yang menyegarkan dalam setiap gigitan. Cocok untuk camilan sehat, smoothie, atau salad buah yang menyegarkan. Segera dapatkan bundling Nanas & Semangka ini untuk pengalaman buah tropis yang tak terlupakan!",
      additionalImages: [
        "../images/nanas-semangka.jpg",
        "../images/nanas-semangka.jpg",
      ],
      sellerName: "FarmFresh",
      sellerLocation: "Bogor",
      quantity: 110,
    },
    "61": {
      id: "61",
      name: "Paket Kebab",
      image: "../images/paket-kebab.jpg",
      price: "35000",
      description:
        "Nikmati cita rasa autentik dari kebab dengan Paket Kebab kami! Paket ini menawarkan kombinasi daging kebab yang juicy dan bumbu yang kaya, disajikan bersama roti pita yang lembut, sayuran segar, dan saus lezat. Ideal untuk makan malam keluarga atau acara spesial, Paket Kebab kami memberikan pengalaman makan yang memuaskan dan penuh rasa. Coba sekarang dan rasakan kelezatannya!",
      additionalImages: [
        "../images/paket-kebab.jpg",
        "../images/paket-kebab.jpg",
      ],
      sellerName: "VeggieFarm",
      sellerLocation: "Cirebon",
      quantity: 154,
    },
    "62": {
      id: "62",
      name: "Paket Salad 1",
      image: "../images/paket-salad-1.jpg",
      price: "40000",
      description:
        "Paket ini menawarkan kombinasi sayuran segar yang berkualitas tinggi, termasuk selada renyah, tomat juicy, mentimun segar, dan wortel berwarna cerah. Ditambah dengan dressing pilihan yang lezat, Paket Salad 1 sempurna untuk makan siang yang sehat atau sebagai pendamping makan malam. Nikmati keseimbangan rasa dan nutrisi dengan mudah!",
      additionalImages: [
        "../images/paket-salad-1.jpg",
        "../images/paket-salad-1.jpg",
      ],
      sellerName: "HarvestKing",
      sellerLocation: "Makassar",
      quantity: 1230,
    },
    "63": {
      id: "63",
      name: "Paket Salad 2",
      image: "../images/paket-salad-2.jpg",
      price: "25000",
      description:
        "Paket ini terdiri dari campuran sayuran berkualitas tinggi seperti selada crisp, tomat cherry, paprika warna-warni, dan alpukat creamy. Dilengkapi dengan topping kacang panggang dan dressing khusus yang menggugah selera, Paket Salad 2 adalah pilihan sempurna untuk sajian sehat dan penuh rasa. Ideal untuk makan siang yang cepat atau sebagai hidangan pembuka yang menyegarkan!",
      additionalImages: [
        "../images/paket-salad-2.jpg",
        "../images/paket-salad-2.jpg",
      ],
      sellerName: "OrganicVeg",
      sellerLocation: "Bali",
      quantity: 1110,
    },
    "64": {
      id: "64",
      name: "Paket Sayur Sop",
      image: "../images/paket-sayur-sop.jpg",
      price: "13000",
      description:
        "Paket ini menawarkan campuran sayuran segar seperti wortel, kentang, buncis, dan jagung manis yang siap dimasak menjadi sup lezat. Dengan tambahan rempah-rempah alami dan bumbu khusus, Paket Sayur Sop siap membantu Anda menyiapkan hidangan sop yang bergizi dan penuh rasa. Ideal untuk makan malam keluarga atau hidangan sehat sehari-hari, Paket Sayur Sop adalah pilihan sempurna untuk santapan hangat dan menenangkan!",
      additionalImages: [
        "../images/paket-sayur-sop.jpg",
        "../images/paket-sayur-sop.jpg",
      ],
      sellerName: "GreenMarket",
      sellerLocation: "Surabaya",
      quantity: 1500,
    },
    "65": {
      id: "65",
      name: "Pisang & Mangga",
      image: "../images/pisang-mangga.jpg",
      price: "18000",
      description:
        "Paket ini menghadirkan kombinasi pisang matang yang lembut dan mangga juicy yang segar, sempurna untuk camilan sehat atau tambahan pada smoothie dan dessert. Pisang kaya akan potasium dan serat, sedangkan mangga memberikan vitamin C dan rasa manis alami. Ideal untuk meningkatkan energi Anda sepanjang hari atau membuat hidangan buah yang menyegarkan!",
      additionalImages: [
        "../images/pisang-mangga.jpg",
        "../images/pisang-mangga.jpg",
      ],
      sellerName: "HealthyVeg",
      sellerLocation: "Jakarta",
      quantity: 2345,
    },
    "66": {
      id: "66",
      name: "Sayur & Buah",
      image: "../images/sayur-buah.jpg",
      price: "32000",
      description:
        "Temukan keseimbangan nutrisi dalam satu paket dengan Paket Sayur & Buah! Paket ini menggabungkan sayuran segar yang kaya serat dan vitamin dengan buah-buahan manis dan bergizi. Ideal untuk menyiapkan hidangan sehat dan penuh warna, atau sebagai camilan bergizi sepanjang hari. Nikmati kombinasi terbaik dari sayur dan buah yang tidak hanya lezat tapi juga mendukung gaya hidup sehat Anda!",
      additionalImages: [
        "../images/sayur-buah.jpg",
        "../images/sayur-buah.jpg",
      ],
      sellerName: "VeggieWorld",
      sellerLocation: "Bandung",
      quantity: 133,
    },
    "67": {
      id: "67",
      name: "Timun & Paprika",
      image: "../images/timun-paprika.jpg",
      price: "22000",
      description:
        "Rasakan kesegaran dan kelezatan dengan Paket Timun & Paprika! Kombinasi timun renyah dan paprika berwarna-warni ini sempurna untuk melengkapi salad, membuat camilan sehat, atau sebagai bahan tambahan dalam berbagai hidangan. Timun memberikan kesegaran, sementara paprika menambah cita rasa dan warna cerah pada setiap sajian. Pilihan ideal untuk gaya hidup sehat dan penuh rasa!",
      additionalImages: [
        "../images/timun-paprika.jpg",
        "../images/timun-paprika.jpg",
      ],
      sellerName: "FarmersMarket",
      sellerLocation: "Yogyakarta",
      quantity: 1534,
    },
    "68": {
      id: "68",
      name: "Timun & Strawberry",
      image: "../images/timun-strawberry.jpg",
      price: "28000",
      description:
        "Paket Timun & Strawberry! Timun yang renyah berpadu sempurna dengan manisnya strawberry juicy, menciptakan kombinasi rasa yang menggugah selera dan penuh warna. Ideal untuk salad segar, smoothie, atau camilan sehat yang menyehatkan. Tambahkan sentuhan rasa dan kesegaran pada setiap hidangan Anda dengan paket istimewa ini!",
      additionalImages: [
        "../images/timun-strawberry.jpg",
        "../images/timun-strawberry.jpg",
      ],
      sellerName: "RootVeg",
      sellerLocation: "Semarang",
      quantity: 213,
    },
    "69": {
      id: "69",
      name: "Tomat & Bawang",
      image: "../images/tomat-bawang.jpg",
      price: "26000",
      description:
        "Tambahkan cita rasa yang kaya dan menyegarkan ke dalam setiap masakan dengan Paket Tomat & Bawang! Tomat segar dan bawang aromatik ini merupakan kombinasi klasik yang sempurna untuk saus, sup, dan berbagai hidangan rumah. Dapatkan kualitas terbaik dari dua bahan dapur esensial ini, yang akan membuat setiap resep Anda semakin lezat dan menggugah selera.",
      additionalImages: [
        "../images/tomat-bawang.jpg",
        "../images/tomat-bawang.jpg",
      ],
      sellerName: "TropicalVeg",
      sellerLocation: "Medan",
      quantity: 456,
    },
    "70": {
      id: "70",
      name: "Tomat & Cabe",
      image: "../images/tomat-cabe.jpg",
      price: "45000",
      description:
        "Tingkatkan cita rasa masakan Anda dengan Paket Tomat & Cabe! Tomat segar dan cabe pedas ini adalah pasangan ideal untuk menambah kelezatan dan sedikit kepedasan pada setiap hidangan. Tomat memberikan rasa segar dan manis, sementara cabe menambah intensitas dan kehangatan. Kombinasi ini sempurna untuk saus, sambal, atau bumbu masakan yang menggugah selera. Hadirkan rasa yang memukau ke meja makan Anda dengan paket praktis ini!",
      additionalImages: [
        "../images/tomat-cabe.jpg",
        "../images/tomat-cabe.jpg",
      ],
      sellerName: "GreenHarvest",
      sellerLocation: "Bali",
      quantity: 887,
    },
    "71": {
      id: "71",
      name: "Daging Sapi & Kentang",
      image: "../images/daging-sapi-kentang.jpg",
      price: "7500",
      description:
        "Nikmati kemewahan rasa dengan Paket Daging Sapi & Kentang kami! Bundling ini menawarkan potongan daging sapi berkualitas tinggi yang lembut dan juicy, dipadukan dengan kentang segar yang siap diolah menjadi berbagai hidangan lezat. Ideal untuk membuat steak, roast beef, atau kentang goreng dan panggang. Paket ini memberikan kemudahan dan kepraktisan untuk menciptakan hidangan keluarga yang menggugah selera. Ciptakan momen makan yang istimewa dengan kombinasi klasik ini!",
      additionalImages: [
        "../images/daging-sapi-kentang.jpg",
        "../images/daging-sapi-kentang.jpg",
      ],
      sellerName: "FreshFarm",
      sellerLocation: "Jakarta",
      quantity: 987,
    },
    "72": {
      id: "72",
      name: "Tomat & Daun Bawang",
      image: "../images/tomat-daun-bawang.jpg",
      price: "35000",
      description:
        "Tambahkan sentuhan segar pada masakan Anda dengan Paket Tomat & Daun Bawang kami! Nikmati tomat juicy yang kaya rasa dan daun bawang segar yang harum dalam satu bundling praktis. Ideal untuk membuat saus, salad, atau topping lezat yang menambah cita rasa masakan sehari-hari. Dengan kualitas terjamin dan rasa yang menggugah selera, paket ini adalah pilihan sempurna untuk melengkapi berbagai hidangan Anda!",
      additionalImages: [
        "../images/tomat-daun-bawang.jpg",
        "../images/tomat-daun-bawang.jpg",
      ],
      sellerName: "SoyFarm",
      sellerLocation: "Bandung",
      quantity: 932,
    },
    "73": {
      id: "73",
      name: "Tomat Hijau",
      image: "../images/tomat-hijau.jpg",
      price: "15000",
      description:
        "Tomat hijau yang belum matang sepenuhnya menawarkan tekstur yang renyah dan rasa yang segar, ideal untuk membuat hidangan khas seperti salsa, acar, atau salad dengan sentuhan yang berbeda. Dengan kualitas terbaik dan cita rasa yang khas, paket ini memberikan opsi yang menarik untuk menambah variasi dalam menu Anda!",
      additionalImages: [
        "../images/tomat-hijau.jpg",
        "../images/tomat-hijau.jpg",
      ],
      sellerName: "OrganicVeggie",
      sellerLocation: "Yogyakarta",
      quantity: 346,
    },
    "74": {
      id: "74",
      name: "Ubi & Sawi",
      image: "../images/ubi-sawi.jpg",
      price: "35000",
      description:
        "Nikmati kombinasi sempurna dari Paket Ubi & Sawi kami! Ubi manis dan lembut dipadukan dengan sawi hijau yang segar dan renyah, menciptakan hidangan sehat yang penuh rasa. Ideal untuk berbagai resep, mulai dari sup dan tumisan hingga salad yang menyehatkan. Paket ini menawarkan kesegaran dan nutrisi dalam satu kemasan, sempurna untuk memenuhi kebutuhan gizi sehari-hari Anda!",
      additionalImages: ["../images/ubi-sawi.jpg", "../images/ubi-sawi.jpg"],
      sellerName: "FruitHarvest",
      sellerLocation: "Surabaya",
      quantity: 333,
    },
    "75": {
      id: "75",
      name: "Wortel & Jagung",
      image: "../images/wortel-jagung.jpg",
      price: "15000",
      description:
        "Paket Wortel & Jagung kami! Wortel segar yang manis dan jagung yang renyah bersatu dalam satu bundling, ideal untuk berbagai hidangan. Sempurna untuk salad, sup, atau sebagai tambahan yang menyegarkan untuk hidangan utama Anda. Nikmati kombinasi yang memikat ini dan bawa kehangatan serta kebaikan ke meja makan Anda!",
      additionalImages: [
        "../images/wortel-jagung.jpg",
        "../images/wortel-jagung.jpg",
      ],
      sellerName: "TropicalFruit",
      sellerLocation: "Jakarta",
      quantity: 13,
    },
  };

  return products[id];
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isCheckoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const fetchedProduct = await fetchProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.additionalImages[0]);
        } else {
          console.error(`No product found with id ${id}`);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!product) return <div>Loading...</div>;

  const productReviews = id && reviewsData[id] ? reviewsData[id] : [];

  const handleBackClick = () => {
    if (id) {
      const productId = parseInt(id, 10);
      if (productId >= 1 && productId <= 25) {
        navigate("/productpage1");
      } else if (productId >= 26 && productId <= 50) {
        navigate("/productpage2");
      } else if (productId >= 51 && productId <= 75) {
        navigate("/productpage3");
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

  const handleViewAllReviews = () => {
    if (id) {
      navigate(`/review/${id}`);
    }
  };

  const handleOpenCheckoutDialog = () => setCheckoutDialogOpen(true);
  const handleCloseCheckoutDialog = () => setCheckoutDialogOpen(false);

  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div>
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
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-lg font-semibold mb-2">
                {rupiahFormatter.format(parseFloat(product.price))}
              </p>
              <p className="mb-2">{product.description}</p>
              <p className="mb-2">Penjual: {product.sellerName}</p>
              <p className="mb-2">Lokasi: {product.sellerLocation}</p>
              <p className="mb-2">Rating: 4.5</p>
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
                onClick={handleOpenCheckoutDialog}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
              >
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
                Favorit
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Review Pembeli</h3>
          {productReviews.length > 0 ? (
            <div>
              {productReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start mb-4 p-4 bg-white rounded-lg shadow-md cursor-pointer"
                >
                  <div className="w-16 h-16 mr-4">
                    <img
                      src={review.image}
                      alt={`Review ${review.id}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold mb-1">
                      {review.reviewerName}
                    </p>
                    <p className="text-lg mb-1">
                      <FaStar className="inline text-yellow-500" />{" "}
                      {review.rating} / 5
                    </p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={handleViewAllReviews}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                View All Reviews
              </button>
            </div>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        {/* Checkout Dialog */}
        <CheckoutDialog
          isOpen={isCheckoutDialogOpen}
          onClose={handleCloseCheckoutDialog}
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
