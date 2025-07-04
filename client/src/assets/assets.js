import as_logo from '../assets/AS.png'
import bike_01 from '../assets/bike_id_01.jpg'
import bike_02 from '../assets/bike_id_02.jpg'
import bike_03 from '../assets/bike_id_03.jpg'
import bike_04 from '../assets/bike_id_04.jpg'
import bike_05 from '../assets/bike_id_05.jpg'
import bike_06 from '../assets/bike_id_06.jpg'
import bike_07 from '../assets/bike_id_07.jpg'
import bike_08 from '../assets/bike_id_08.jpg'
import bike_09 from '../assets/bike_id_09.jpg'
import bike_10 from '../assets/bike_id_10.jpg'
import bike_11 from '../assets/bike_id_11.jpg'
import bike_12 from '../assets/bike_id_12.jpg'
import bike_13 from '../assets/bike_id_13.jpg'
import bike_14 from '../assets/bike_id_14.jpg'
import bike_15 from '../assets/bike_id_15.jpg'
import bike_16 from '../assets/bike_id_16.jpg'
import bike_17 from '../assets/bike_id_17.jpg'
import bike_18 from '../assets/bike_id_18.jpg'
import close_icon from '../assets/close_icon.png'
import close from '../assets/close.png'
import back_icon from '../assets/back.png'
import next_icon from '../assets/next.png'
import send_icon from '../assets/send.png'
import user from '../assets/user_1.png'
import chatbot from '../assets/chatbot.png'
import chatbot_1 from '../assets/chatbot_1.png'
import bot from '../assets/bot.png'

const assets = {
    as_logo,
    bike_01,
    bike_02,
    bike_03,
    bike_04,
    bike_05,
    bike_06,
    bike_07,
    bike_08,
    bike_09,
    bike_10,
    bike_11,
    bike_12,
    bike_13,
    bike_14,
    bike_15,
    bike_16,
    bike_17,
    bike_18,
    close_icon,
    back_icon,
    next_icon,
    send_icon,
    user,
    chatbot,
    chatbot_1,
    close,
    bot
    
}

export const sampleProducts = [
  {
    id:1001,
    name: "Toyota Corolla",
    model: "2021 XLI",
    brand: "Toyota",
    description: [
      "Reliable performance for daily commuting.",
      "Great fuel economy.",
      "Spacious interior and sleek design."
    ],
    specifications: "1496cc Petrol Engine, CVT Transmission, 5-Seater",
    price: 4500000,
    image: [
      bike_01,
      
    ]
  },
  {
    id:1002,
    name: "Honda Civic",
    model: "2020 EX",
    brand: "Honda",
    description: [
      "Sporty looks and powerful performance.",
      "Advanced safety features.",
      "Premium interior comfort."
    ],
    specifications: "1799cc i-VTEC Engine, Automatic, Sunroof",
    price: 5900000,
    image: [
      bike_02
    ]
  },
  {
    id:1003,
    name: "Nissan X-Trail",
    model: "2019 ST",
    brand: "Nissan",
    description: [
      "Ideal for family adventures.",
      "All-wheel drive capability.",
      "Spacious luggage and cabin area."
    ],
    specifications: "2488cc Petrol Engine, 4WD, Automatic, 7-Seater",
    price: 6800000,
    image: [
      bike_03
    ]
  },
  {
    id:1004,
    name: "Suzuki Wagon R",
    model: "2022 FX",
    brand: "Suzuki",
    description: [
      "Compact yet highly efficient.",
      "Perfect for urban driving.",
      "Easy parking and great fuel mileage."
    ],
    specifications: "998cc Engine, Manual, 5-Seater",
    price: 3200000,
    image: [
      bike_04
    ]
  },
   {
    id:1005,
    name: "Toyota Corolla 2",
    model: "2021 XLI",
    brand: "Toyota",
    description: [
      "Reliable performance for daily commuting.",
      "Great fuel economy.",
      "Spacious interior and sleek design."
    ],
    specifications: "1496cc Petrol Engine, CVT Transmission, 5-Seater",
    price: 4500000,
    image: [
      bike_05,
      
    ]
  },
  {
    id:1006,
    name: "Honda Civic 2",
    model: "2020 EX",
    brand: "Honda",
    description: [
      "Sporty looks and powerful performance.",
      "Advanced safety features.",
      "Premium interior comfort."
    ],
    specifications: "1799cc i-VTEC Engine, Automatic, Sunroof",
    price: 5900000,
    image: [
      bike_06
    ]
  },
  {
    id:1007,
    name: "Nissan X-Trail 2",
    model: "2019 ST",
    brand: "Nissan",
    description: [
      "Ideal for family adventures.",
      "All-wheel drive capability.",
      "Spacious luggage and cabin area."
    ],
    specifications: "2488cc Petrol Engine, 4WD, Automatic, 7-Seater",
    price: 6800000,
    image: [
      bike_07
    ]
  },
  {
    id:1008,
    name: "Suzuki Wagon R 2",
    model: "2022 FX",
    brand: "Suzuki",
    description: [
      "Compact yet highly efficient.",
      "Perfect for urban driving.",
      "Easy parking and great fuel mileage."
    ],
    specifications: "998cc Engine, Manual, 5-Seater",
    price: 3200000,
    image: [
      bike_08
    ]
  }
];

export const fakePromotion = [
      {
        id: 1,
        title: "July Mega Sale",
        description: "Get up to 20% off on selected vehicles this July!",
        image: bike_10,
        validUntil: "2025-07-31",
      },
      {
        id: 2,
        title: "Free Vehicle Servicing",
        description: "Free first service for all purchases before August 15th.",
        image: bike_08,
        validUntil: "2025-08-15",
      },
      {
        id: 3,
        title: "Trade-In Bonus",
        description: "Trade in your old car and receive a bonus of Rs. 100,000!",
        image: bike_12,
        validUntil: "2025-08-31",
      },
    ];

export default assets;