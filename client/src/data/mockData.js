// Client-side instant mock dataset for 100% reliable prototype rendering

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weeklyDishTemplates = {
  Monday: {
    Breakfast: [
      { _id: 'm1_b1', name: 'Aloo Paratha with Amul Butter & Fresh Curd', category: 'Main', avgRating: 4.8, ratingCount: 45 },
      { _id: 'm1_b2', name: 'Boiled Eggs / Masala Omelette', category: 'Side', avgRating: 4.5, ratingCount: 30 },
      { _id: 'm1_b3', name: 'Ginger Masala Chai & Hot Coffee', category: 'Beverage', avgRating: 4.9, ratingCount: 60 }
    ],
    Lunch: [
      { _id: 'm1_l1', name: 'Paneer Butter Masala', category: 'Main', avgRating: 4.8, ratingCount: 52 },
      { _id: 'm1_l2', name: 'Dal Tadka & Jeera Rice', category: 'Main', avgRating: 4.4, ratingCount: 38 },
      { _id: 'm1_l3', name: 'Butter Roti & Cucumber Boondi Raita', category: 'Side', avgRating: 4.3, ratingCount: 25 }
    ],
    Snacks: [
      { _id: 'm1_s1', name: 'Crispy Veg Samosa & Mint Chutney', category: 'Snack', avgRating: 4.6, ratingCount: 40 },
      { _id: 'm1_s2', name: 'Hot Milk & Cardamom Tea', category: 'Beverage', avgRating: 4.2, ratingCount: 20 }
    ],
    Dinner: [
      { _id: 'm1_d1', name: 'Slow Cooked Dal Makhani', category: 'Main', avgRating: 4.9, ratingCount: 65 },
      { _id: 'm1_d2', name: 'Mixed Veg Handi & Steamed Basmati Rice', category: 'Main', avgRating: 4.2, ratingCount: 28 },
      { _id: 'm1_d3', name: 'Hot Gulab Jamun (2 pcs)', category: 'Dessert', avgRating: 4.9, ratingCount: 70 }
    ]
  },
  Tuesday: {
    Breakfast: [
      { _id: 'm2_b1', name: 'Steamed Idli & Medu Vada with Sambar', category: 'Main', avgRating: 4.5, ratingCount: 35 },
      { _id: 'm2_b2', name: 'Coconut & Tomato Mint Chutney', category: 'Side', avgRating: 4.6, ratingCount: 30 },
      { _id: 'm2_b3', name: 'South Indian Filter Coffee', category: 'Beverage', avgRating: 4.9, ratingCount: 50 }
    ],
    Lunch: [
      { _id: 'm2_l1', name: 'Delhi Style Rajma Chawal', category: 'Main', avgRating: 4.9, ratingCount: 60 },
      { _id: 'm2_l2', name: 'Aloo Gobi Dry Subzi', category: 'Side', avgRating: 4.0, ratingCount: 22 },
      { _id: 'm2_l3', name: 'Chilled Sweet Butter Milk (Chaas)', category: 'Beverage', avgRating: 4.6, ratingCount: 40 }
    ],
    Snacks: [
      { _id: 'm2_s1', name: 'Mumbai Pav Bhaji with Extra Butter', category: 'Snack', avgRating: 4.8, ratingCount: 55 },
      { _id: 'm2_s2', name: 'Special Masala Chai', category: 'Beverage', avgRating: 4.4, ratingCount: 18 }
    ],
    Dinner: [
      { _id: 'm2_d1', name: 'Kadhai Paneer / Chicken Curry', category: 'Main', avgRating: 4.7, ratingCount: 58 },
      { _id: 'm2_d2', name: 'Yellow Dal Fry & Phulka Roti', category: 'Main', avgRating: 4.3, ratingCount: 30 },
      { _id: 'm2_d3', name: 'Sweet Rasgulla', category: 'Dessert', avgRating: 4.6, ratingCount: 42 }
    ]
  },
  Wednesday: {
    Breakfast: [
      { _id: 'm3_b1', name: 'Indori Poha with Sev & Crispy Jalebi', category: 'Main', avgRating: 4.6, ratingCount: 48 },
      { _id: 'm3_b2', name: 'Sprouted Moong Salad', category: 'Side', avgRating: 4.2, ratingCount: 15 },
      { _id: 'm3_b3', name: 'Hot Milk & Tea', category: 'Beverage', avgRating: 4.4, ratingCount: 32 }
    ],
    Lunch: [
      { _id: 'm3_l1', name: 'Amritsari Chole Bhature', category: 'Main', avgRating: 4.9, ratingCount: 75 },
      { _id: 'm3_l2', name: 'Jeera Rice & Sirka Pyaz', category: 'Side', avgRating: 4.6, ratingCount: 40 },
      { _id: 'm3_l3', name: 'Punjabi Sweet Lassi', category: 'Beverage', avgRating: 4.8, ratingCount: 50 }
    ],
    Snacks: [
      { _id: 'm3_s1', name: 'Paneer Bread Pakora', category: 'Snack', avgRating: 4.4, ratingCount: 30 },
      { _id: 'm3_s2', name: 'Hot Coffee / Green Tea', category: 'Beverage', avgRating: 4.2, ratingCount: 16 }
    ],
    Dinner: [
      { _id: 'm3_d1', name: 'Shahi Paneer Curry', category: 'Main', avgRating: 4.7, ratingCount: 45 },
      { _id: 'm3_d2', name: 'Dal Panchmel & Butter Naan', category: 'Main', avgRating: 4.4, ratingCount: 26 },
      { _id: 'm3_d3', name: 'Chilled Fruit Custard', category: 'Dessert', avgRating: 4.5, ratingCount: 35 }
    ]
  },
  Thursday: {
    Breakfast: [
      { _id: 'm4_b1', name: 'Crispy Masala Dosa with Coconut Chutney', category: 'Main', avgRating: 4.8, ratingCount: 50 },
      { _id: 'm4_b2', name: 'Hot Vegetable Sambar', category: 'Side', avgRating: 4.3, ratingCount: 25 },
      { _id: 'm4_b3', name: 'Special Masala Tea', category: 'Beverage', avgRating: 4.7, ratingCount: 40 }
    ],
    Lunch: [
      { _id: 'm4_l1', name: 'Hyderabadi Veg Biryani with Mirchi Salan', category: 'Main', avgRating: 4.8, ratingCount: 65 },
      { _id: 'm4_l2', name: 'Cucumber Raita & Roasted Papad', category: 'Side', avgRating: 4.4, ratingCount: 30 }
    ],
    Snacks: [
      { _id: 'm4_s1', name: 'Aloo Tikki Chaat with Dahi & Chutneys', category: 'Snack', avgRating: 4.7, ratingCount: 42 },
      { _id: 'm4_s2', name: 'Hot Milk', category: 'Beverage', avgRating: 4.1, ratingCount: 15 }
    ],
    Dinner: [
      { _id: 'm4_d1', name: 'Malai Kofta Curry', category: 'Main', avgRating: 4.8, ratingCount: 50 },
      { _id: 'm4_d2', name: 'Dal Fry & Butter Roti', category: 'Main', avgRating: 4.3, ratingCount: 28 },
      { _id: 'm4_d3', name: 'Sujee Halwa with Almonds', category: 'Dessert', avgRating: 4.6, ratingCount: 38 }
    ]
  },
  Friday: {
    Breakfast: [
      { _id: 'm5_b1', name: 'Chole Puri with Aloo Tamatar Curry', category: 'Main', avgRating: 4.7, ratingCount: 45 },
      { _id: 'm5_b2', name: 'Boiled Eggs / Toast', category: 'Side', avgRating: 4.4, ratingCount: 22 },
      { _id: 'm5_b3', name: 'Tea & Coffee', category: 'Beverage', avgRating: 4.6, ratingCount: 35 }
    ],
    Lunch: [
      { _id: 'm5_l1', name: 'Punjabi Kadi Pakoda & Steamed Rice', category: 'Main', avgRating: 4.6, ratingCount: 40 },
      { _id: 'm5_l2', name: 'Bhindi Masala & Hot Phulka', category: 'Side', avgRating: 4.1, ratingCount: 20 }
    ],
    Snacks: [
      { _id: 'm5_s1', name: 'Crispy Onion & Corn Pakora', category: 'Snack', avgRating: 4.5, ratingCount: 35 },
      { _id: 'm5_s2', name: 'Adrak Masala Chai', category: 'Beverage', avgRating: 4.7, ratingCount: 45 }
    ],
    Dinner: [
      { _id: 'm5_d1', name: 'Paneer Lababdar', category: 'Main', avgRating: 4.8, ratingCount: 55 },
      { _id: 'm5_d2', name: 'Dal Makhani & Peas Pulao', category: 'Main', avgRating: 4.7, ratingCount: 40 },
      { _id: 'm5_d3', name: 'Vanilla Ice Cream Cup', category: 'Dessert', avgRating: 4.8, ratingCount: 60 }
    ]
  },
  Saturday: {
    Breakfast: [
      { _id: 'm6_b1', name: 'Gobhi Paratha with White Butter & Curd', category: 'Main', avgRating: 4.7, ratingCount: 48 },
      { _id: 'm6_b2', name: 'Mixed Pickle', category: 'Side', avgRating: 4.5, ratingCount: 25 },
      { _id: 'm6_b3', name: 'Special Milk Tea', category: 'Beverage', avgRating: 4.8, ratingCount: 40 }
    ],
    Lunch: [
      { _id: 'm6_l1', name: 'Chana Dal & Rice', category: 'Main', avgRating: 4.2, ratingCount: 30 },
      { _id: 'm6_l2', name: 'Baingan Bharta', category: 'Side', avgRating: 3.9, ratingCount: 18 }
    ],
    Snacks: [
      { _id: 'm6_s1', name: 'Veg Grilled Club Sandwich', category: 'Snack', avgRating: 4.6, ratingCount: 38 },
      { _id: 'm6_s2', name: 'Hot Coffee', category: 'Beverage', avgRating: 4.4, ratingCount: 22 }
    ],
    Dinner: [
      { _id: 'm6_d1', name: 'Butter Chicken / Butter Paneer', category: 'Main', avgRating: 4.9, ratingCount: 80 },
      { _id: 'm6_d2', name: 'Jeera Rice & Tandoori Roti', category: 'Side', avgRating: 4.5, ratingCount: 35 },
      { _id: 'm6_d3', name: 'Chocolate Ice Cream Sundae', category: 'Dessert', avgRating: 4.9, ratingCount: 75 }
    ]
  },
  Sunday: {
    Breakfast: [
      { _id: 'm7_b1', name: 'Special Chole Puri & Meetha Sujee Halwa', category: 'Main', avgRating: 4.9, ratingCount: 70 },
      { _id: 'm7_b2', name: 'Masala Omelette', category: 'Side', avgRating: 4.6, ratingCount: 32 },
      { _id: 'm7_b3', name: 'Special Sunday Chai', category: 'Beverage', avgRating: 4.9, ratingCount: 65 }
    ],
    Lunch: [
      { _id: 'm7_l1', name: 'Special Sunday Feast: Paneer Do Pyaza / Chicken Dum Biryani', category: 'Main', avgRating: 5.0, ratingCount: 100 },
      { _id: 'm7_l2', name: 'Dal Tadka, Butter Naan & Pineapple Raita', category: 'Side', avgRating: 4.8, ratingCount: 60 }
    ],
    Snacks: [
      { _id: 'm7_s1', name: 'Samosa Chaat with Sweet Chutney', category: 'Snack', avgRating: 4.7, ratingCount: 45 },
      { _id: 'm7_s2', name: 'Chilled Cold Coffee', category: 'Beverage', avgRating: 4.8, ratingCount: 50 }
    ],
    Dinner: [
      { _id: 'm7_d1', name: 'Matar Paneer Curry', category: 'Main', avgRating: 4.6, ratingCount: 40 },
      { _id: 'm7_d2', name: 'Dal Fry & Veg Pulao', category: 'Main', avgRating: 4.3, ratingCount: 25 },
      { _id: 'm7_d3', name: 'Rice Kheer with Pistachios & Cardamom', category: 'Dessert', avgRating: 4.8, ratingCount: 55 }
    ]
  }
};

export const INITIAL_MENU = [];
days.forEach(day => {
  ['Breakfast', 'Lunch', 'Snacks', 'Dinner'].forEach(meal => {
    INITIAL_MENU.push({
      _id: `menu_${day}_${meal}`,
      messUnit: 'Mess Alpha',
      dayOfWeek: day,
      mealType: meal,
      dishes: weeklyDishTemplates[day][meal],
      specialItem: day === 'Sunday' && (meal === 'Lunch' || meal === 'Breakfast') ? '⭐ Special Sunday Campus Feast' : ''
    });
  });
});

// Seed Initial Complaints
export const INITIAL_COMPLAINTS = [
  {
    _id: 'cmp_1',
    ticketId: 'CMP-2026-0001',
    type: 'hostel',
    studentName: 'Aarav Patel',
    studentEmail: 'student1@lpu.in',
    block: 'BH-1',
    roomNo: '102',
    category: 'electricity',
    urgency: 'critical',
    title: 'Geyser trip switch sparking in 3rd floor bath',
    description: 'The bathroom geyser switch on 3rd floor trip box sparks whenever switched on. Needs urgent electrician repair.',
    status: 'Raised',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [],
    satisfaction: { rated: false },
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: 'cmp_2',
    ticketId: 'CMP-2026-0002',
    type: 'hostel',
    studentName: 'Rohan Sharma',
    studentEmail: 'student2@lpu.in',
    block: 'BH-1',
    roomNo: '204',
    category: 'plumbing',
    urgency: 'high',
    title: 'Shower head leaking continuously in Room 204',
    description: 'Shower valve doesn\'t close fully, causing water waste and slippery bathroom floor.',
    status: 'Acknowledged',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [{ authorName: 'Col. Suresh Verma', authorRole: 'staff', note: 'Plumber Sharma assigned to Room 204.', createdAt: new Date(Date.now() - 7200000).toISOString() }],
    satisfaction: { rated: false },
    createdAt: new Date(Date.now() - 10800000).toISOString()
  },
  {
    _id: 'cmp_3',
    ticketId: 'CMP-2026-0003',
    type: 'hostel',
    studentName: 'Priya Nambiar',
    studentEmail: 'student3@lpu.in',
    block: 'GH-1',
    roomNo: '301',
    category: 'wifi',
    urgency: 'medium',
    title: 'Wi-Fi signal timing out on 3rd floor wing',
    description: 'Campus internet drops connection every 15 minutes during study hours.',
    status: 'In Progress',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [{ authorName: 'Dr. Sunita Sharma', authorRole: 'staff', note: 'IT Network team replacing router access point on 3rd floor.', createdAt: new Date(Date.now() - 14400000).toISOString() }],
    satisfaction: { rated: false },
    createdAt: new Date(Date.now() - 18000000).toISOString()
  },
  {
    _id: 'cmp_4',
    ticketId: 'CMP-2026-0004',
    type: 'hostel',
    studentName: 'Karan Malhotra',
    studentEmail: 'student5@lpu.in',
    block: 'BH-2',
    roomNo: '405',
    category: 'cleanliness',
    urgency: 'high',
    title: 'Corridor trash bin overflowed on 4th floor',
    description: 'Trash has not been emptied for 2 days near room 405.',
    status: 'Resolved',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [{ authorName: 'Vikram Singh', authorRole: 'staff', note: 'Housekeeping team cleared trash bins and disinfected corridor.', createdAt: new Date(Date.now() - 21600000).toISOString() }],
    satisfaction: { rated: true, satisfied: true, rating: 5, comment: 'Thank you for quick cleaning!' },
    createdAt: new Date(Date.now() - 28800000).toISOString()
  },
  {
    _id: 'cmp_5',
    ticketId: 'CMP-2026-0005',
    type: 'hostel',
    studentName: 'Sneha Gupta',
    studentEmail: 'student7@lpu.in',
    block: 'GH-1',
    roomNo: '205',
    category: 'furniture',
    urgency: 'high',
    title: 'Ceiling fan making screeching noise',
    description: 'Fan bearing is loose and makes unbearable noise at night.',
    status: 'Reopened',
    isSlaBreached: true,
    reopenedCount: 1,
    remarks: [
      { authorName: 'Dr. Sunita Sharma', authorRole: 'staff', note: 'Technician greased fan bearing.', createdAt: new Date(Date.now() - 36000000).toISOString() },
      { authorName: 'Sneha Gupta', authorRole: 'student', note: 'Student rated resolution as Unsatisfied: "Noise returned after 1 hour." — Ticket Reopened automatically.', createdAt: new Date(Date.now() - 18000000).toISOString() }
    ],
    satisfaction: { rated: true, satisfied: false, rating: 1, comment: 'Noise returned after 1 hour.' },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'cmp_6',
    ticketId: 'CMP-2026-0006',
    type: 'mess',
    studentName: 'Rahul Verma',
    studentEmail: 'student4@lpu.in',
    block: 'Mess Alpha',
    roomNo: '108',
    category: 'food quality',
    urgency: 'high',
    title: 'Dal Makhani served cold during Wednesday dinner',
    description: 'Dal Makhani temperature was lukewarm and spices were insufficient during 8 PM dinner slot in Mess Alpha.',
    status: 'Raised',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [],
    satisfaction: { rated: false },
    createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    _id: 'cmp_7',
    ticketId: 'CMP-2026-0007',
    type: 'mess',
    studentName: 'Ananya Roy',
    studentEmail: 'student6@lpu.in',
    block: 'Mess Alpha',
    roomNo: '304',
    category: 'food quality',
    urgency: 'medium',
    title: 'Water dispenser valve leakage near Counter 2 in Mess Alpha',
    description: 'Clean drinking water dispenser is leaking onto the mess hall floor near Counter 2.',
    status: 'Acknowledged',
    isSlaBreached: false,
    reopenedCount: 0,
    remarks: [{ authorName: 'Chef Anil Kapoor', authorRole: 'staff', note: 'Mess maintenance staff assigned to replace water dispenser gasket.', createdAt: new Date(Date.now() - 3600000).toISOString() }],
    satisfaction: { rated: false },
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const INITIAL_ADMIN_ANALYTICS = {
  summary: {
    totalComplaints: 55,
    resolvedCount: 42,
    avgResolutionHours: 14.2,
    slaComplianceRatePercent: 94.8,
    breachedCount: 3,
    reopenedCount: 4
  },
  blockAnalytics: [
    { blockName: 'BH-1', total: 18, resolved: 15, breached: 1, reopened: 1, avgHours: 12.5 },
    { blockName: 'BH-2', total: 14, resolved: 11, breached: 1, reopened: 1, avgHours: 15.1 },
    { blockName: 'GH-1', total: 12, resolved: 9, breached: 1, reopened: 1, avgHours: 16.4 },
    { blockName: 'Mess Alpha', total: 11, resolved: 7, breached: 0, reopened: 1, avgHours: 9.8 }
  ],
  categoryBreakdown: [
    { name: 'Electricity', count: 16 },
    { name: 'Plumbing', count: 12 },
    { name: 'Food Quality', count: 14 },
    { name: 'Wi-Fi', count: 8 },
    { name: 'Cleanliness', count: 5 }
  ],
  trendData: [
    { day: 'Mon', raised: 8, resolved: 7 },
    { day: 'Tue', raised: 12, resolved: 10 },
    { day: 'Wed', raised: 15, resolved: 14 },
    { day: 'Thu', raised: 9, resolved: 9 },
    { day: 'Fri', raised: 11, resolved: 10 }
  ]
};

export const INITIAL_LEADERBOARD = [
  { blockName: 'Mess Alpha', staffName: 'Chef Anil Kapoor', resolutionRate: 98.2, avgHours: 9.8, score: 99, badge: '🏆 Fastest Resolution Unit' },
  { blockName: 'BH-1 Hostel', staffName: 'Col. Suresh Verma', resolutionRate: 95.5, avgHours: 12.5, score: 96, badge: '⭐ Highest Satisfaction' },
  { blockName: 'BH-2 Hostel', staffName: 'Vikram Singh', resolutionRate: 91.2, avgHours: 15.1, score: 88, badge: '👍 Consistent Performer' },
  { blockName: 'GH-1 Girls Hostel', staffName: 'Dr. Sunita Sharma', resolutionRate: 88.5, avgHours: 16.4, score: 85, badge: '⚡ High Volume Handler' }
];

export const INITIAL_TRANSPARENCY_METRICS = {
  overallResolutionRatePercent: 94.8,
  avgResponseTimeHours: 4.2,
  blockMetrics: [
    { blockName: 'Mess Alpha', rate: 98.2, avgHours: 2.1, activeTickets: 2 },
    { blockName: 'BH-1 Boys Hostel', rate: 95.5, avgHours: 3.5, activeTickets: 3 },
    { blockName: 'BH-2 Boys Hostel', rate: 91.2, avgHours: 4.8, activeTickets: 4 },
    { blockName: 'GH-1 Girls Hostel', rate: 88.5, avgHours: 5.2, activeTickets: 3 }
  ],
  recentResolutions: [
    { _id: 'rec_1', title: 'Plumbing leak repaired in Room 204', block: 'BH-1', completedAgo: '2 hours ago', resolvedBy: 'Col. Suresh Verma' },
    { _id: 'rec_2', title: 'Corridor trash bin cleared & disinfected', block: 'BH-2', completedAgo: '6 hours ago', resolvedBy: 'Vikram Singh' },
    { _id: 'rec_3', title: 'Hygiene audit conducted in Mess kitchen', block: 'Mess Alpha', completedAgo: '8 hours ago', resolvedBy: 'Chef Anil Kapoor' }
  ]
};

