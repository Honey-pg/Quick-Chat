// Dummy messages data
// Fields: id, text, senderId, receiverId, seen, createdAt (ISO), image (optional import)
// Usage:
// import messages from "./messages";
// messages.filter(m => (m.senderId === 1 && m.receiverId === 2) || (m.senderId === 2 && m.receiverId === 1))

import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

const now = new Date();
const minutesAgo = (mins) => new Date(now.getTime() - mins * 60 * 1000).toISOString();

const messages = [
  // Alison (1) ↔ Enrique (2)
  { id: 1, text: "Hey Enrique! How's your day going?", senderId: 1, receiverId: 2, seen: true, createdAt: minutesAgo(120), image: null },
  { id: 2, text: "Hey Alison! Pretty good, just wrapped a meeting.", senderId: 2, receiverId: 1, seen: true, createdAt: minutesAgo(118), image: null },
  { id: 3, text: "Nice! Sharing the mockup here.", senderId: 1, receiverId: 2, seen: true, createdAt: minutesAgo(116), image: pic1 },
  { id: 4, text: "Looks clean. Maybe increase padding on the header.", senderId: 2, receiverId: 1, seen: true, createdAt: minutesAgo(114), image: null },

  // Marco (3) ↔ Martin (4)
  { id: 5, text: "Martin, got time to review the PR?", senderId: 3, receiverId: 4, seen: true, createdAt: minutesAgo(60), image: null },
  { id: 6, text: "On it. Any breaking changes?", senderId: 4, receiverId: 3, seen: true, createdAt: minutesAgo(58), image: null },
  { id: 7, text: "No breaking changes, added tests too.", senderId: 3, receiverId: 4, seen: true, createdAt: minutesAgo(56), image: null },
  { id: 8, text: "Great. Screenshot of coverage:", senderId: 3, receiverId: 4, seen: true, createdAt: minutesAgo(55), image: pic2 },

  // Richard (5) ↔ Alison (1)
  { id: 9, text: "Alison, can you check the docs intro?", senderId: 5, receiverId: 1, seen: false, createdAt: minutesAgo(15), image: null },
  { id: 10, text: "Sure! Send the link.", senderId: 1, receiverId: 5, seen: false, createdAt: minutesAgo(14), image: null },
  { id: 11, text: "Uploading the draft image.", senderId: 5, receiverId: 1, seen: false, createdAt: minutesAgo(12), image: img1 },
  { id: 12, text: "Got it. I like this section.", senderId: 1, receiverId: 5, seen: false, createdAt: minutesAgo(10), image: null },

  // Enrique (2) ↔ Richard (5)
  { id: 13, text: "Meeting at 3pm?", senderId: 2, receiverId: 5, seen: false, createdAt: minutesAgo(8), image: null },
  { id: 14, text: "Yes. Agenda attached.", senderId: 5, receiverId: 2, seen: false, createdAt: minutesAgo(7), image: img2 },

  // Mixed examples with images and recent timestamps
  { id: 15, text: "New banner draft.", senderId: 4, receiverId: 2, seen: false, createdAt: minutesAgo(5), image: pic3 },
  { id: 16, text: "Looks awesome!", senderId: 2, receiverId: 4, seen: false, createdAt: minutesAgo(4), image: null },
];

export default messages;