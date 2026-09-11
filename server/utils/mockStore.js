// Comprehensive In-Memory Mock Database for Prototype Demonstration

export const mockUsers = [
  {
    _id: 'admin_1',
    name: 'Dr. Rajesh Kumar (Chief Admin)',
    email: 'admin@lpu.in',
    password: 'password123',
    role: 'admin',
    hostelBlock: 'All',
    staffUnit: 'Central Administration'
  },
  {
    _id: 'warden_bh1',
    name: 'Col. Suresh Verma (Warden BH-1)',
    email: 'warden.bh1@lpu.in',
    password: 'password123',
    role: 'staff',
    hostelBlock: 'BH-1',
    staffUnit: 'BH-1 Warden Office'
  },
  {
    _id: 'warden_bh2',
    name: 'Vikram Singh (Warden BH-2)',
    email: 'warden.bh2@lpu.in',
    password: 'password123',
    role: 'staff',
    hostelBlock: 'BH-2',
    staffUnit: 'BH-2 Warden Office'
  },
  {
    _id: 'warden_gh1',
    name: 'Dr. Sunita Sharma (Warden GH-1)',
    email: 'warden.gh1@lpu.in',
    password: 'password123',
    role: 'staff',
    hostelBlock: 'GH-1',
    staffUnit: 'GH-1 Warden Office'
  },
  {
    _id: 'mess_alpha',
    name: 'Chef Anil Kapoor (Mess Manager)',
    email: 'mess.alpha@lpu.in',
    password: 'password123',
    role: 'staff',
    hostelBlock: 'Mess Alpha',
    staffUnit: 'Mess Alpha Operations'
  },
  // Students
  { _id: 'std_1', name: 'Aarav Patel', email: 'student1@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-1', roomNo: '102' },
  { _id: 'std_2', name: 'Rohan Sharma', email: 'student2@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-1', roomNo: '204' },
  { _id: 'std_3', name: 'Priya Nambiar', email: 'student3@lpu.in', password: 'password123', role: 'student', hostelBlock: 'GH-1', roomNo: '301' },
  { _id: 'std_4', name: 'Ananya Roy', email: 'student4@lpu.in', password: 'password123', role: 'student', hostelBlock: 'GH-1', roomNo: '112' },
  { _id: 'std_5', name: 'Karan Malhotra', email: 'student5@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-2', roomNo: '405' },
  { _id: 'std_6', name: 'Aditya Joshi', email: 'student6@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-2', roomNo: '210' },
  { _id: 'std_7', name: 'Sneha Gupta', email: 'student7@lpu.in', password: 'password123', role: 'student', hostelBlock: 'GH-1', roomNo: '205' },
  { _id: 'std_8', name: 'Ishaan Verma', email: 'student8@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-1', roomNo: '308' },
  { _id: 'std_9', name: 'Devansh Reddy', email: 'student9@lpu.in', password: 'password123', role: 'student', hostelBlock: 'BH-2', roomNo: '115' },
  { _id: 'std_10', name: 'Meera Iyer', email: 'student10@lpu.in', password: 'password123', role: 'student', hostelBlock: 'GH-1', roomNo: '410' },
];

// Rich 7-Day Weekly Mess Menu Data with Actual Campus Dishes
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weeklyDishTemplates = {
  Monday: {
    Breakfast: [
      { _id: 'm1_b1', name: 'Aloo Paratha with Amul Butter & Curd', category: 'Main', avgRating: 4.7, ratingCount: 45, totalRating: 211.5 },
      { _id: 'm1_b2', name: 'Boiled Eggs / Omelette', category: 'Side', avgRating: 4.5, ratingCount: 30, totalRating: 135 },
      { _id: 'm1_b3', name: 'Adrak Masala Chai & Coffee', category: 'Beverage', avgRating: 4.8, ratingCount: 60, totalRating: 288 }
    ],
    Lunch: [
      { _id: 'm1_l1', name: 'Paneer Butter Masala', category: 'Main', avgRating: 4.8, ratingCount: 52, totalRating: 249.6 },
      { _id: 'm1_l2', name: 'Dal Tadka & Jeera Rice', category: 'Main', avgRating: 4.4, ratingCount: 38, totalRating: 167.2 },
      { _id: 'm1_l3', name: 'Tandoori Roti & Boondi Raita', category: 'Side', avgRating: 4.3, ratingCount: 25, totalRating: 107.5 }
    ],
    Snacks: [
      { _id: 'm1_s1', name: 'Crispy Veg Samosa & Mint Chutney', category: 'Snack', avgRating: 4.6, ratingCount: 40, totalRating: 184 },
      { _id: 'm1_s2', name: 'Hot Milk & Tea', category: 'Beverage', avgRating: 4.2, ratingCount: 20, totalRating: 84 }
    ],
    Dinner: [
      { _id: 'm1_d1', name: 'Dal Makhani (Slow Cooked)', category: 'Main', avgRating: 4.9, ratingCount: 65, totalRating: 318.5 },
      { _id: 'm1_d2', name: 'Mixed Veg Handi & Steamed Rice', category: 'Main', avgRating: 4.1, ratingCount: 28, totalRating: 114.8 },
      { _id: 'm1_d3', name: 'Hot Gulab Jamun (2 pcs)', category: 'Dessert', avgRating: 4.9, ratingCount: 70, totalRating: 343 }
    ]
  },
  Tuesday: {
    Breakfast: [
      { _id: 'm2_b1', name: 'Steamed Idli & Medu Vada with Sambar', category: 'Main', avgRating: 4.4, ratingCount: 35, totalRating: 154 },
      { _id: 'm2_b2', name: 'Coconut & Tomato Chutney', category: 'Side', avgRating: 4.6, ratingCount: 30, totalRating: 138 },
      { _id: 'm2_b3', name: 'South Indian Filter Coffee', category: 'Beverage', avgRating: 4.9, ratingCount: 50, totalRating: 245 }
    ],
    Lunch: [
      { _id: 'm2_l1', name: 'Delhi Style Rajma Chawal', category: 'Main', avgRating: 4.9, ratingCount: 60, totalRating: 294 },
      { _id: 'm2_l2', name: 'Aloo Gobi Dry Subzi', category: 'Side', avgRating: 3.9, ratingCount: 22, totalRating: 85.8 },
      { _id: 'm2_l3', name: 'Butter Milk (Chaas)', category: 'Beverage', avgRating: 4.5, ratingCount: 40, totalRating: 180 }
    ],
    Snacks: [
      { _id: 'm2_s1', name: 'Mumbai Pav Bhaji with Extra Butter', category: 'Snack', avgRating: 4.8, ratingCount: 55, totalRating: 264 },
      { _id: 'm2_s2', name: 'Cardamom Tea', category: 'Beverage', avgRating: 4.3, ratingCount: 18, totalRating: 77.4 }
    ],
    Dinner: [
      { _id: 'm2_d1', name: 'Kadhai Paneer / Chicken Curry', category: 'Main', avgRating: 4.7, ratingCount: 58, totalRating: 272.6 },
      { _id: 'm2_d2', name: 'Yellow Dal Fry & Phulka', category: 'Main', avgRating: 4.2, ratingCount: 30, totalRating: 126 },
      { _id: 'm2_d3', name: 'Rasgulla', category: 'Dessert', avgRating: 4.6, ratingCount: 42, totalRating: 193.2 }
    ]
  },
  Wednesday: {
    Breakfast: [
      { _id: 'm3_b1', name: 'Indori Poha with Sev & Jalebi', category: 'Main', avgRating: 4.5, ratingCount: 48, totalRating: 216 },
      { _id: 'm3_b2', name: 'Sprouted Moong Salad', category: 'Side', avgRating: 4.1, ratingCount: 15, totalRating: 61.5 },
      { _id: 'm3_b3', name: 'Hot Milk / Tea', category: 'Beverage', avgRating: 4.4, ratingCount: 32, totalRating: 140.8 }
    ],
    Lunch: [
      { _id: 'm3_l1', name: 'Punjabi Chole Bhature', category: 'Main', avgRating: 4.9, ratingCount: 75, totalRating: 367.5 },
      { _id: 'm3_l2', name: 'Jeera Rice & Sirka Pyaz', category: 'Side', avgRating: 4.6, ratingCount: 40, totalRating: 184 },
      { _id: 'm3_l3', name: 'Sweet Lassi', category: 'Beverage', avgRating: 4.8, ratingCount: 50, totalRating: 240 }
    ],
    Snacks: [
      { _id: 'm3_s1', name: 'Paneer Bread Pakora', category: 'Snack', avgRating: 4.3, ratingCount: 30, totalRating: 129 },
      { _id: 'm3_s2', name: 'Coffee / Green Tea', category: 'Beverage', avgRating: 4.1, ratingCount: 16, totalRating: 65.6 }
    ],
    Dinner: [
      { _id: 'm3_d1', name: 'Shahi Paneer', category: 'Main', avgRating: 4.7, ratingCount: 45, totalRating: 211.5 },
      { _id: 'm3_d2', name: 'Dal Panchmel & Naan', category: 'Main', avgRating: 4.3, ratingCount: 26, totalRating: 111.8 },
      { _id: 'm3_d3', name: 'Fruit Custard', category: 'Dessert', avgRating: 4.4, ratingCount: 35, totalRating: 154 }
    ]
  },
  Thursday: {
    Breakfast: [
      { _id: 'm4_b1', name: 'Crispy Masala Dosa with Coconut Chutney', category: 'Main', avgRating: 4.8, ratingCount: 50, totalRating: 240 },
      { _id: 'm4_b2', name: 'Hot Sambar', category: 'Side', avgRating: 4.3, ratingCount: 25, totalRating: 107.5 },
      { _id: 'm4_b3', name: 'Special Masala Tea', category: 'Beverage', avgRating: 4.7, ratingCount: 40, totalRating: 188 }
    ],
    Lunch: [
      { _id: 'm4_l1', name: 'Hyderabadi Veg Biryani with Mirchi Salan', category: 'Main', avgRating: 4.7, ratingCount: 65, totalRating: 305.5 },
      { _id: 'm4_l2', name: 'Cucumber Raita & Papad', category: 'Side', avgRating: 4.4, ratingCount: 30, totalRating: 132 }
    ],
    Snacks: [
      { _id: 'm4_s1', name: 'Aloo Tikki Chaat with Dahi & Chutney', category: 'Snack', avgRating: 4.7, ratingCount: 42, totalRating: 197.4 },
      { _id: 'm4_s2', name: 'Hot Milk', category: 'Beverage', avgRating: 4.0, ratingCount: 15, totalRating: 60 }
    ],
    Dinner: [
      { _id: 'm4_d1', name: 'Malai Kofta Curry', category: 'Main', avgRating: 4.8, ratingCount: 50, totalRating: 240 },
      { _id: 'm4_d2', name: 'Dal Fry & Butter Roti', category: 'Main', avgRating: 4.3, ratingCount: 28, totalRating: 120.4 },
      { _id: 'm4_d3', name: 'Sujee Halwa with Dry Fruits', category: 'Dessert', avgRating: 4.6, ratingCount: 38, totalRating: 174.8 }
    ]
  },
  Friday: {
    Breakfast: [
      { _id: 'm5_b1', name: 'Puri Bhaji (Aloo Tamatar Curry)', category: 'Main', avgRating: 4.6, ratingCount: 45, totalRating: 207 },
      { _id: 'm5_b2', name: 'Boiled Eggs / Toast', category: 'Side', avgRating: 4.4, ratingCount: 22, totalRating: 96.8 },
      { _id: 'm5_b3', name: 'Tea & Coffee', category: 'Beverage', avgRating: 4.6, ratingCount: 35, totalRating: 161 }
    ],
    Lunch: [
      { _id: 'm5_l1', name: 'Kadi Pakoda & Rice', category: 'Main', avgRating: 4.5, ratingCount: 40, totalRating: 180 },
      { _id: 'm5_l2', name: 'Bhindi Masala & Roti', category: 'Side', avgRating: 4.0, ratingCount: 20, totalRating: 80 }
    ],
    Snacks: [
      { _id: 'm5_s1', name: 'Onion & Corn Pakora', category: 'Snack', avgRating: 4.5, ratingCount: 35, totalRating: 157.5 },
      { _id: 'm5_s2', name: 'Masala Chai', category: 'Beverage', avgRating: 4.7, ratingCount: 45, totalRating: 211.5 }
    ],
    Dinner: [
      { _id: 'm5_d1', name: 'Paneer Lababdar', category: 'Main', avgRating: 4.8, ratingCount: 55, totalRating: 264 },
      { _id: 'm5_d2', name: 'Dal Makhani & Peas Pulao', category: 'Main', avgRating: 4.7, ratingCount: 40, totalRating: 188 },
      { _id: 'm5_d3', name: 'Vanilla Ice Cream Cup', category: 'Dessert', avgRating: 4.8, ratingCount: 60, totalRating: 288 }
    ]
  },
  Saturday: {
    Breakfast: [
      { _id: 'm6_b1', name: 'Gobhi Paratha with White Butter', category: 'Main', avgRating: 4.7, ratingCount: 48, totalRating: 225.6 },
      { _id: 'm6_b2', name: 'Curd & Pickle', category: 'Side', avgRating: 4.5, ratingCount: 25, totalRating: 112.5 },
      { _id: 'm6_b3', name: 'Special Milk Tea', category: 'Beverage', avgRating: 4.8, ratingCount: 40, totalRating: 192 }
    ],
    Lunch: [
      { _id: 'm6_l1', name: 'Chana Dal & Rice', category: 'Main', avgRating: 4.2, ratingCount: 30, totalRating: 126 },
      { _id: 'm6_l2', name: 'Baingan Bharta', category: 'Side', avgRating: 3.8, ratingCount: 18, totalRating: 68.4 }
    ],
    Snacks: [
      { _id: 'm6_s1', name: 'Veg Grilled Sandwich', category: 'Snack', avgRating: 4.6, ratingCount: 38, totalRating: 174.8 },
      { _id: 'm6_s2', name: 'Hot Coffee', category: 'Beverage', avgRating: 4.4, ratingCount: 22, totalRating: 96.8 }
    ],
    Dinner: [
      { _id: 'm6_d1', name: 'Butter Chicken / Butter Paneer', category: 'Main', avgRating: 4.9, ratingCount: 80, totalRating: 392 },
      { _id: 'm6_d2', name: 'Jeera Rice & Tandoori Roti', category: 'Side', avgRating: 4.5, ratingCount: 35, totalRating: 157.5 },
      { _id: 'm6_d3', name: 'Chocolate Ice Cream Sundae', category: 'Dessert', avgRating: 4.9, ratingCount: 75, totalRating: 367.5 }
    ]
  },
  Sunday: {
    Breakfast: [
      { _id: 'm7_b1', name: 'Chole Puri & Meetha Halwa', category: 'Main', avgRating: 4.9, ratingCount: 70, totalRating: 343 },
      { _id: 'm7_b2', name: 'Masala Omelette', category: 'Side', avgRating: 4.6, ratingCount: 32, totalRating: 147.2 },
      { _id: 'm7_b3', name: 'Special Sunday Chai', category: 'Beverage', avgRating: 4.9, ratingCount: 65, totalRating: 318.5 }
    ],
    Lunch: [
      { _id: 'm7_l1', name: 'Special Sunday Feast: Paneer Do Pyaza / Chicken Dum Biryani', category: 'Main', avgRating: 5.0, ratingCount: 100, totalRating: 500 },
      { _id: 'm7_l2', name: 'Dal Tadka, Butter Naan & Pineapple Raita', category: 'Side', avgRating: 4.8, ratingCount: 60, totalRating: 288 }
    ],
    Snacks: [
      { _id: 'm7_s1', name: 'Samosa Chaat & Chutney', category: 'Snack', avgRating: 4.7, ratingCount: 45, totalRating: 211.5 },
      { _id: 'm7_s2', name: 'Cold Coffee', category: 'Beverage', avgRating: 4.8, ratingCount: 50, totalRating: 240 }
    ],
    Dinner: [
      { _id: 'm7_d1', name: 'Matar Paneer', category: 'Main', avgRating: 4.6, ratingCount: 40, totalRating: 184 },
      { _id: 'm7_d2', name: 'Dal Fry & Veg Pulao', category: 'Main', avgRating: 4.3, ratingCount: 25, totalRating: 107.5 },
      { _id: 'm7_d3', name: 'Rice Kheer with Pistachios', category: 'Dessert', avgRating: 4.8, ratingCount: 55, totalRating: 264 }
    ]
  }
};

export const mockMessMenu = [];

days.forEach(day => {
  ['Breakfast', 'Lunch', 'Snacks', 'Dinner'].forEach(meal => {
    mockMessMenu.push({
      _id: `menu_${day}_${meal}`,
      messUnit: 'Mess Alpha',
      dayOfWeek: day,
      mealType: meal,
      dishes: weeklyDishTemplates[day][meal],
      specialItem: day === 'Sunday' && (meal === 'Lunch' || meal === 'Breakfast') ? '⭐ Special Sunday Campus Feast' : ''
    });
  });
});

// Seed 55 Complaints in Memory
const categories = ['electricity', 'plumbing', 'cleanliness', 'wifi', 'furniture', 'security', 'food quality', 'hygiene', 'variety', 'quantity', 'staff behavior'];
const urgencyList = ['low', 'medium', 'high', 'critical'];
const statusList = ['Raised', 'Acknowledged', 'In Progress', 'Resolved', 'Reopened'];

const titles = {
  electricity: ['Geyser trip switch not working in bathroom', 'Ceiling fan making loud screeching noise', 'Power socket near desk spark warning', 'Study table light fixture dead'],
  plumbing: ['Shower head leaking continuously', 'Sink drain clogged completely', 'Flush tank valve broken', 'Low water pressure on 4th floor'],
  cleanliness: ['Corridor trash bin overflowed', 'Dustbin not emptied for 3 days', 'Washroom mirror soiled and uncleaned', 'Water dispenser tray dirty'],
  wifi: ['Wi-Fi signal drops every 10 mins', 'Campus login portal timing out on 3rd floor', 'Ethernet port loose pin connection', 'Extremely slow bandwidth during evening peak'],
  furniture: ['Study chair wheel missing', 'Wardrobe door handle broken', 'Bed frame squeaking violently', 'Desk drawer stuck jammed'],
  security: ['Biometric door scanner slow reader', 'Window latch broken on ground floor', 'Balcony safety railing loose', 'Corridor camera IR light flickering'],
  'food quality': ['Raw un-cooked rotis served at lunch', 'Salty dal tadka in dinner', 'Sour curd served with paratha', 'Cold tea served in morning'],
  hygiene: ['Fly found in salad counter', 'Uncleaned dining table numbers 12-14', 'Washing area floor slippery and wet', 'Staff not wearing hairnets'],
  variety: ['Same cabbage vegetable served 3 days in row', 'Lack of fruit options in breakfast', 'No South Indian breakfast options', 'Limited vegan options'],
  quantity: ['Gravy ran out 20 mins before dinner end', 'Only 1 paratha allowed per student', 'Rice tray empty at 1:30 PM', 'Milk shortage in morning tea'],
  'staff behavior': ['Mess server rude when asking for extra roti', 'Counter staff ignoring queue order', 'Night security shouting loudly', 'Cleaning staff arguing about room timing']
};

export const mockComplaints = [];

for (let i = 0; i < 55; i++) {
  const student = mockUsers[5 + (i % 10)];
  const category = categories[i % categories.length];
  const urgency = urgencyList[i % urgencyList.length];
  const categoryTitles = titles[category] || ['General maintenance issue'];
  const title = categoryTitles[i % categoryTitles.length];
  const status = statusList[i % statusList.length];

  const daysAgo = (55 - i) * 0.18;
  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  const ackDeadline = new Date(createdAt.getTime() + 24 * 3600 * 1000);
  const resDeadline = new Date(createdAt.getTime() + 72 * 3600 * 1000);

  let acknowledgedAt = (status !== 'Raised') ? new Date(createdAt.getTime() + 12 * 3600 * 1000) : null;
  let resolvedAt = (status === 'Resolved' || status === 'Reopened') ? new Date(createdAt.getTime() + 36 * 3600 * 1000) : null;
  let isSlaBreached = daysAgo > 3 && (status === 'Raised' || status === 'Acknowledged' || status === 'Reopened');
  let reopenedCount = status === 'Reopened' ? 1 : 0;

  const isSat = i % 5 !== 0;
  const satisfaction = (status === 'Resolved') ? {
    rated: true,
    satisfied: isSat,
    rating: isSat ? 5 : 1,
    comment: isSat ? 'Quick resolution by warden team, thanks!' : 'Issue returned after 2 hours. Not fixed properly.',
    ratedAt: new Date(resolvedAt.getTime() + 2 * 3600 * 1000)
  } : { rated: false, satisfied: null, rating: 0, comment: '' };

  const remarks = [];
  if (acknowledgedAt) {
    remarks.push({
      authorName: 'Assigned Warden',
      authorRole: 'staff',
      note: `Ticket acknowledged and technician dispatched to Room ${student.roomNo}.`,
      statusBefore: 'Raised',
      statusAfter: 'Acknowledged',
      createdAt: acknowledgedAt
    });
  }

  if (resolvedAt) {
    remarks.push({
      authorName: 'Assigned Warden',
      authorRole: 'staff',
      note: `Technician completed repair and verified operational status in ${student.hostelBlock} Room ${student.roomNo}.`,
      statusBefore: 'In Progress',
      statusAfter: 'Resolved',
      createdAt: resolvedAt
    });
  }

  if (status === 'Reopened') {
    remarks.push({
      authorName: student.name,
      authorRole: 'student',
      note: 'Student marked resolution as Unsatisfied: "Fan still making noise." — Ticket Reopened automatically.',
      statusBefore: 'Resolved',
      statusAfter: 'Reopened',
      createdAt: new Date(resolvedAt.getTime() + 1000)
    });
  }

  mockComplaints.push({
    _id: `mock_ticket_${i + 1}`,
    ticketId: `CMP-2026-${(i + 1).toString().padStart(4, '0')}`,
    type: category.includes('food') || category === 'hygiene' || category === 'variety' || category === 'quantity' ? 'mess' : 'hostel',
    student: student._id,
    studentName: student.name,
    studentEmail: student.email,
    block: student.hostelBlock,
    roomNo: student.roomNo,
    category,
    urgency,
    title,
    description: `Detailed description of issue: ${title} observed in block ${student.hostelBlock}, Room ${student.roomNo}. Needs immediate attendance.`,
    photoUrl: '',
    status,
    acknowledgedAt,
    resolvedAt,
    slaAckDeadline: ackDeadline,
    slaResolveDeadline: resDeadline,
    isSlaBreached,
    slaBreachedReason: isSlaBreached ? 'Resolution SLA Breached (>72h)' : '',
    reopenedCount,
    remarks,
    satisfaction,
    createdAt
  });
}

// Seed Mess Feedback
export const mockMessFeedback = [
  { _id: 'mf_1', studentName: 'Aarav Patel', messUnit: 'Mess Alpha', mealType: 'Lunch', rating: 5, category: 'food quality', comment: 'Paneer butter masala was excellent!', createdAt: new Date(Date.now() - 2 * 3600 * 1000) },
  { _id: 'mf_2', studentName: 'Priya Nambiar', messUnit: 'Mess Alpha', mealType: 'Breakfast', rating: 4, category: 'hygiene', comment: 'Clean counters today.', createdAt: new Date(Date.now() - 6 * 3600 * 1000) },
  { _id: 'mf_3', studentName: 'Karan Malhotra', messUnit: 'Mess Alpha', mealType: 'Dinner', rating: 2, category: 'quantity', comment: 'Gravy ran out 20 mins early.', createdAt: new Date(Date.now() - 14 * 3600 * 1000) },
  { _id: 'mf_4', studentName: 'Sneha Gupta', messUnit: 'Mess Alpha', mealType: 'Lunch', rating: 5, category: 'staff behavior', comment: 'Staff was very helpful.', createdAt: new Date(Date.now() - 20 * 3600 * 1000) },
];
