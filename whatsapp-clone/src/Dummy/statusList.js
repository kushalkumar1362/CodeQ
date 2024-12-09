const statusData = [
  {
    id: 1,
    name: "John Doe",
    profilePicture: "https://picsum.photos/seed/john/150",
    allView: false,
    lastUpdated: new Date().toISOString(),
    statuses:
    {
      type: "image",
      url: "https://picsum.photos/seed/johnStatus1/300",
      caption: "Morning vibes 🌞",
      timestamp: new Date().toISOString(),
      view: false,
    }
  },
  {
    id: 2,
    name: "Emily Davis",
    profilePicture: "https://picsum.photos/seed/emily/150",
    allView: true,
    lastUpdated: new Date().toISOString(),
    statuses: [
      {
        type: "image",
        url: "https://picsum.photos/seed/emilyStatus1/300",
        caption: "Nature walk 🌳",
        timestamp: new Date().toISOString(),
        view: true,
      },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    profilePicture: "https://picsum.photos/seed/michael/150",
    allView: true,
    lastUpdated: new Date().toISOString(),
    statuses: [
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        caption: "Throwback to my vacation 🏖️",
        timestamp: new Date().toISOString(),
        view: true,
      },
    ],
  },
  {
    id: 4,
    name: "Sophia Taylor",
    profilePicture: "https://picsum.photos/seed/sophia/150",
    allView: false,
    lastUpdated: new Date().toISOString(),
    statuses: [
      {
        type: "text",
        content: "Feeling grateful today 🙏💖",
        timestamp: new Date().toISOString(),
        view: false,
      },
    ],
  },
  {
    id: 5,
    name: "Chris Wilson",
    profilePicture: "https://picsum.photos/seed/chris/150",
    allView: false,
    lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    statuses: 
      {
        type: "image",
        url: "https://picsum.photos/seed/chrisStatus1/300",
        caption: "Sunset views 🌅",
        timestamp: new Date().toISOString(),
        view: true,
      },
      
  },
];

export default statusData;

