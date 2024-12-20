const chatData = [
  {
    id: 1,
    name: "John Doe",
    profilePicture: "https://picsum.photos/seed/john/150",
    lastMessage: "Hey, how are you?",
    timestamp: "10:45 AM",
    unreadCount: 20,
    messages: Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "John Doe" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from John" : "from Me"}`,
      timestamp: `10:${30 + index} AM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 2,
    name: "Jane Smith",
    profilePicture: "https://picsum.photos/seed/jane/150",
    lastMessage: "Let's catch up later!",
    timestamp: "09:30 AM",
    unreadCount: 0,
    messages: Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Jane Smith" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Jane" : "from Me"}`,
      timestamp: `09:${15 + index} AM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 3,
    name: "Michael Brown",
    profilePicture: "https://picsum.photos/seed/michael/150",
    lastMessage: "Did you get the report?",
    timestamp: "Yesterday",
    unreadCount: 1,
    messages: Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Michael Brown" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Michael" : "from Me"}`,
      timestamp: `2:${index + 15} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 4,
    name: "Emily Davis",
    profilePicture: "https://picsum.photos/seed/emily/150",
    lastMessage: "Thanks for the help!",
    timestamp: "2:15 PM",
    unreadCount: 0,
    messages: Array.from({ length: 28 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Emily Davis" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Emily" : "from Me"}`,
      timestamp: `2:${10 + index} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 5,
    name: "Chris Wilson",
    profilePicture: "https://picsum.photos/seed/chris/150",
    lastMessage: "Meeting at 3 PM, don't forget.",
    timestamp: "Monday",
    unreadCount: 3,
    messages: Array.from({ length: 22 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Chris Wilson" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Chris" : "from Me"}`,
      timestamp: `3:${index + 10} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 6,
    name: "Sophia Taylor",
    profilePicture: "https://picsum.photos/seed/sophia/150",
    lastMessage: "Great job on the project!",
    timestamp: "Sunday",
    unreadCount: 0,
    messages: Array.from({ length: 27 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Sophia Taylor" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Sophia" : "from Me"}`,
      timestamp: `5:${index + 5} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 7,
    name: "Daniel Anderson",
    profilePicture: "https://picsum.photos/seed/daniel/150",
    lastMessage: "Call me when you’re free.",
    timestamp: "10:20 AM",
    unreadCount: 1,
    messages: Array.from({ length: 24 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Daniel Anderson" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Daniel" : "from Me"}`,
      timestamp: `10:${index + 15} AM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 8,
    name: "Olivia Martinez",
    profilePicture: "https://picsum.photos/seed/olivia/150",
    lastMessage: "Are you coming to the party?",
    timestamp: "Yesterday",
    unreadCount: 0,
    messages: Array.from({ length: 26 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Olivia Martinez" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Olivia" : "from Me"}`,
      timestamp: `9:${index + 10} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 9,
    name: "Liam Garcia",
    profilePicture: "https://picsum.photos/seed/liam/150",
    lastMessage: "Okay, got it!",
    timestamp: "Monday",
    unreadCount: 0,
    messages: Array.from({ length: 29 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Liam Garcia" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Liam" : "from Me"}`,
      timestamp: `3:${index + 15} PM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
  {
    id: 10,
    name: "Ava Rodriguez",
    profilePicture: "https://picsum.photos/seed/ava/150",
    lastMessage: "See you soon!",
    timestamp: "Sunday",
    unreadCount: 2,
    messages: Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      sender: index % 2 === 0 ? "Ava Rodriguez" : "Me",
      message: `Message ${index + 1} ${index % 2 === 0 ? "from Ava" : "from Me"}`,
      timestamp: `11:${index + 10} AM`,
      isSentByMe: index % 2 !== 0,
    })),
  },
];

export default chatData;
