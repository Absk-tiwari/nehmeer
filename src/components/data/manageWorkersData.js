import user1 from "../../assets/img/user1.png";

/*
  NOTE:
  - Using same image for now (user1)
  - Later you can add user2, user3 images
  - Structure is fully API-ready
*/

export const manageWorkersData = [
  {
    id: 1,
    type: "babysitter",
    name: "Antara Pandey",
    role: "Babysitter",
    experience: "3 Years",
    rating: 4.8,
    reviews: 122,
    age: 28,
    location: "Delhi, India",
    image: user1,
    verified: true,
    status: "active",

    about: {
      language: "Hindi",
      education: "8th pass",
      religion: "Hinduism",
      status: "Married",
      description:
        "Dedicated and caring babysitter with 3 years of experience handling newborns and toddlers. Very patient and trustworthy."
    },

    salary: {
      partTime: {
        price: "₹5,000/month",
        slots: ["7am-10am", "12pm-3pm", "5pm-8pm"]
      },
      fullTime: {
        price: "₹10,000/month",
        slots: ["24 hours stay to help"]
      }
    }
  },

  {
    id: 2,
    type: "cook",
    name: "Riya Sharma",
    role: "Home Cook",
    experience: "5 Years",
    rating: 4.6,
    reviews: 89,
    age: 32,
    location: "Noida, India",
    image: user1,
    verified: true,
    status: "completed",

    about: {
      language: "Hindi, English",
      education: "10th pass",
      religion: "Hinduism",
      status: "Married",
      description:
        "Experienced vegetarian and non-vegetarian cook. Specialized in North Indian meals and meal planning."
    },

    salary: {
      partTime: {
        price: "₹6,000/month",
        slots: ["8am-11am", "6pm-9pm"]
      },
      fullTime: {
        price: "₹12,000/month",
        slots: ["Live-in cooking service"]
      }
    }
  },

  {
    id: 3,
    type: "maid",
    name: "Sunita Verma",
    role: "House Maid",
    experience: "4 Years",
    rating: 4.5,
    reviews: 64,
    age: 35,
    location: "Gurgaon, India",
    image: user1,
    verified: false,
    status: "active",

    about: {
      language: "Hindi",
      education: "5th pass",
      religion: "Hinduism",
      status: "Widow",
      description:
        "Hardworking and punctual maid with expertise in cleaning, laundry, and daily household chores."
    },

    salary: {
      partTime: {
        price: "₹4,000/month",
        slots: ["7am-9am", "5pm-7pm"]
      },
      fullTime: {
        price: "₹9,000/month",
        slots: ["Full-day household help"]
      }
    }
  },

  {
    id: 4,
    type: "elder-care",
    name: "Meena Kapoor",
    role: "Elder Care Assistant",
    experience: "6 Years",
    rating: 4.9,
    reviews: 143,
    age: 40,
    location: "Faridabad, India",
    image: user1,
    verified: true,
    status: "completed",

    about: {
      language: "Hindi, Punjabi",
      education: "12th pass",
      religion: "Hinduism",
      status: "Married",
      description:
        "Professional elder care provider with experience in assisting senior citizens with daily routines and medication management."
    },

    salary: {
      partTime: {
        price: "₹7,000/month",
        slots: ["9am-12pm", "4pm-7pm"]
      },
      fullTime: {
        price: "₹15,000/month",
        slots: ["24-hour live-in care"]
      }
    }
  }
];