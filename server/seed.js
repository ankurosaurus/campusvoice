import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Complaint from './models/Complaint.js';
import MessFeedback from './models/MessFeedback.js';
import MessMenu from './models/MessMenu.js';
import Notification from './models/Notification.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to database for seeding...');
    await connectDB();

    console.log('🧹 Clearing existing collections...');
    await User.deleteMany({});
    await Complaint.deleteMany({});
    await MessFeedback.deleteMany({});
    await MessMenu.deleteMany({});
    await Notification.deleteMany({});

    console.log('👤 Creating Users...');

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('password123', salt);

    // 1. Admin User
    const adminUser = await User.create({
      name: 'Dr. Rajesh Kumar (Chief Admin)',
      email: 'admin@lpu.in',
      password: defaultPasswordHash,
      role: 'admin',
      hostelBlock: 'All',
      staffUnit: 'Central Administration'
    });

    // 2. Staff / Wardens
    const wardenBH1 = await User.create({
      name: 'Col. Suresh Verma (Warden BH-1)',
      email: 'warden.bh1@lpu.in',
      password: defaultPasswordHash,
      role: 'staff',
      hostelBlock: 'BH-1',
      staffUnit: 'BH-1 Warden Office'
    });

    const wardenBH2 = await User.create({
      name: 'Vikram Singh (Warden BH-2)',
      email: 'warden.bh2@lpu.in',
      password: defaultPasswordHash,
      role: 'staff',
      hostelBlock: 'BH-2',
      staffUnit: 'BH-2 Warden Office'
    });

    const wardenGH1 = await User.create({
      name: 'Dr. Sunita Sharma (Warden GH-1)',
      email: 'warden.gh1@lpu.in',
      password: defaultPasswordHash,
      role: 'staff',
      hostelBlock: 'GH-1',
      staffUnit: 'GH-1 Warden Office'
    });

    const messStaff = await User.create({
      name: 'Chef Anil Kapoor (Mess Manager)',
      email: 'mess.alpha@lpu.in',
      password: defaultPasswordHash,
      role: 'staff',
      hostelBlock: 'Mess Alpha',
      staffUnit: 'Mess Alpha Operations'
    });

    // 3. 20+ Students
    const studentData = [
      { name: 'Aarav Patel', email: 'student1@lpu.in', block: 'BH-1', room: '102' },
      { name: 'Rohan Sharma', email: 'student2@lpu.in', block: 'BH-1', room: '204' },
      { name: 'Priya Nambiar', email: 'student3@lpu.in', block: 'GH-1', room: '301' },
      { name: 'Ananya Roy', email: 'student4@lpu.in', block: 'GH-1', room: '112' },
      { name: 'Karan Malhotra', email: 'student5@lpu.in', block: 'BH-2', room: '405' },
      { name: 'Aditya Joshi', email: 'student6@lpu.in', block: 'BH-2', room: '210' },
      { name: 'Sneha Gupta', email: 'student7@lpu.in', block: 'GH-1', room: '205' },
      { name: 'Ishaan Verma', email: 'student8@lpu.in', block: 'BH-1', room: '308' },
      { name: 'Devansh Reddy', email: 'student9@lpu.in', block: 'BH-2', room: '115' },
      { name: 'Meera Iyer', email: 'student10@lpu.in', block: 'GH-1', room: '410' },
      { name: 'Siddharth Rao', email: 'student11@lpu.in', block: 'BH-1', room: '502' },
      { name: 'Tanvi Saxena', email: 'student12@lpu.in', block: 'GH-1', room: '104' },
      { name: 'Kabir Das', email: 'student13@lpu.in', block: 'BH-2', room: '312' },
      { name: 'Neha Chawla', email: 'student14@lpu.in', block: 'GH-1', room: '509' },
      { name: 'Varun Nair', email: 'student15@lpu.in', block: 'BH-1', room: '401' },
      { name: 'Riya Sen', email: 'student16@lpu.in', block: 'GH-1', room: '218' },
      { name: 'Harsh Vardhan', email: 'student17@lpu.in', block: 'BH-2', room: '506' },
      { name: 'Bhavya Agarwal', email: 'student18@lpu.in', block: 'GH-1', room: '314' },
      { name: 'Yash Deshmukh', email: 'student19@lpu.in', block: 'BH-1', room: '118' },
      { name: 'Divya Pillai', email: 'student20@lpu.in', block: 'GH-1', room: '402' },
    ];

    const students = [];
    for (const s of studentData) {
      const student = await User.create({
        name: s.name,
        email: s.email,
        password: defaultPasswordHash,
        role: 'student',
        hostelBlock: s.block,
        roomNo: s.room
      });
      students.push(student);
    }

    console.log(`✅ Created Admin, 4 Staff, and ${students.length} Students.`);

    // 4. Seed Weekly Mess Menu
    console.log('🍲 Seeding Weekly Mess Menu...');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

    const dishOptions = {
      Breakfast: [
        { name: 'Aloo Paratha with Curd', category: 'Main', avgRating: 4.6 },
        { name: 'Idli Sambar & Coconut Chutney', category: 'Main', avgRating: 4.2 },
        { name: 'Poha & Jalebi', category: 'Main', avgRating: 3.9 },
        { name: 'Boiled Eggs & Toast', category: 'Side', avgRating: 4.5 },
        { name: 'Masala Tea & Coffee', category: 'Beverage', avgRating: 4.8 }
      ],
      Lunch: [
        { name: 'Paneer Butter Masala', category: 'Main', avgRating: 4.7 },
        { name: 'Dal Tadka & Jeera Rice', category: 'Main', avgRating: 4.4 },
        { name: 'Rajma Chawal', category: 'Main', avgRating: 4.8 },
        { name: 'Mixed Veg Subzi', category: 'Side', avgRating: 3.5 },
        { name: 'Butter Roti & Boondi Raita', category: 'Side', avgRating: 4.3 }
      ],
      Snacks: [
        { name: 'Veg Samosa & Mint Chutney', category: 'Snack', avgRating: 4.5 },
        { name: 'Pav Bhaji', category: 'Snack', avgRating: 4.6 },
        { name: 'Bread Pakora', category: 'Snack', avgRating: 3.8 },
        { name: 'Hot Milk & Tea', category: 'Beverage', avgRating: 4.2 }
      ],
      Dinner: [
        { name: 'Kadhai Paneer / Chicken Curry', category: 'Main', avgRating: 4.6 },
        { name: 'Dal Makhani', category: 'Main', avgRating: 4.7 },
        { name: 'Gulab Jamun', category: 'Dessert', avgRating: 4.9 },
        { name: 'Tandoori Roti & Rice', category: 'Side', avgRating: 4.1 }
      ]
    };

    for (const day of days) {
      for (const meal of meals) {
        await MessMenu.create({
          messUnit: 'Mess Alpha',
          dayOfWeek: day,
          mealType: meal,
          dishes: dishOptions[meal].map(d => ({
            name: d.name,
            category: d.category,
            totalRating: Math.floor(d.avgRating * 25),
            ratingCount: 25,
            avgRating: d.avgRating
          })),
          specialItem: day === 'Sunday' && meal === 'Lunch' ? 'Special Ice Cream & Chole Bhature' : ''
        });
      }
    }

    console.log('✅ Weekly Mess Menu created.');

    // 5. Seed 50+ Sample Complaints with varied statuses, dates, and SLA breaches
    console.log('📋 Seeding 50+ Complaints & Mess Feedback...');

    const sampleCategories = ['electricity', 'plumbing', 'cleanliness', 'wifi', 'furniture', 'security', 'food quality', 'hygiene', 'variety', 'quantity', 'staff behavior'];
    const sampleUrgency = ['low', 'medium', 'high', 'critical'];
    const sampleStatuses = ['Raised', 'Acknowledged', 'In Progress', 'Resolved', 'Reopened'];

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

    let ticketCounter = 1;

    for (let i = 0; i < 55; i++) {
      const student = students[i % students.length];
      const category = sampleCategories[i % sampleCategories.length];
      const urgency = sampleUrgency[i % sampleUrgency.length];
      const categoryTitles = titles[category] || ['General issue reported'];
      const title = categoryTitles[i % categoryTitles.length];
      const status = sampleStatuses[i % sampleStatuses.length];

      // Generate staggered dates over past 10 days
      const daysAgo = (55 - i) * 0.18; 
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      const ackDeadline = new Date(createdAt.getTime() + 24 * 3600 * 1000);
      const resDeadline = new Date(createdAt.getTime() + 72 * 3600 * 1000);

      let acknowledgedAt = null;
      let resolvedAt = null;
      let isSlaBreached = false;
      let reopenedCount = 0;
      let satisfaction = { rated: false, satisfied: null, rating: 0, comment: '' };
      let remarks = [];

      if (status === 'Acknowledged' || status === 'In Progress' || status === 'Resolved') {
        acknowledgedAt = new Date(createdAt.getTime() + Math.random() * 18 * 3600 * 1000);
        remarks.push({
          authorName: 'Assigned Warden',
          authorRole: 'staff',
          note: `Ticket acknowledged and technician dispatched to Room ${student.roomNo}.`,
          statusBefore: 'Raised',
          statusAfter: 'Acknowledged',
          createdAt: acknowledgedAt
        });
      }

      if (status === 'Resolved') {
        const resolveTimeHours = Math.floor(Math.random() * 48) + 4;
        resolvedAt = new Date(createdAt.getTime() + resolveTimeHours * 3600 * 1000);

        remarks.push({
          authorName: 'Assigned Warden',
          authorRole: 'staff',
          note: `Technician completed repair and verified operational status in ${student.block} Room ${student.roomNo}.`,
          statusBefore: 'In Progress',
          statusAfter: 'Resolved',
          createdAt: resolvedAt
        });

        // 80% satisfied, 20% unsatisfied
        const isSat = i % 5 !== 0;
        satisfaction = {
          rated: true,
          satisfied: isSat,
          rating: isSat ? (i % 2 === 0 ? 5 : 4) : 1,
          comment: isSat ? 'Quick resolution by warden team, thanks!' : 'Issue returned after 2 hours. Not fixed properly.',
          ratedAt: new Date(resolvedAt.getTime() + 2 * 3600 * 1000)
        };
      }

      if (status === 'Reopened') {
        acknowledgedAt = new Date(createdAt.getTime() + 12 * 3600 * 1000);
        resolvedAt = new Date(createdAt.getTime() + 36 * 3600 * 1000);
        reopenedCount = 1;

        remarks.push({
          authorName: student.name,
          authorRole: 'student',
          note: 'Student marked resolution as Unsatisfied: "Fan still making noise." — Ticket Reopened automatically.',
          statusBefore: 'Resolved',
          statusAfter: 'Reopened',
          createdAt: new Date(resolvedAt.getTime() + 1000)
        });
      }

      // Simulate SLA breach on certain older un-resolved tickets
      if (daysAgo > 3 && (status === 'Raised' || status === 'Acknowledged' || status === 'Reopened')) {
        isSlaBreached = true;
      }

      const ticketId = `CMP-2026-${(ticketCounter++).toString().padStart(4, '0')}`;

      await Complaint.create({
        ticketId,
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

    // 6. Seed Mess Feedback entries
    for (let j = 0; j < 30; j++) {
      const student = students[j % students.length];
      const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
      const mealType = meals[j % meals.length];
      const ratings = [5, 4, 3, 2, 4, 5, 1, 4, 5];
      const rating = ratings[j % ratings.length];
      const cats = ['food quality', 'hygiene', 'variety', 'quantity', 'staff behavior'];

      await MessFeedback.create({
        student: student._id,
        studentName: student.name,
        messUnit: 'Mess Alpha',
        mealType,
        rating,
        category: cats[j % cats.length],
        comment: rating >= 4 ? 'Great food quality and clean serving counters today.' : 'Food quality needs improvement, rotis were cold.',
        createdAt: new Date(Date.now() - (j * 6 * 3600 * 1000))
      });
    }

    console.log('✅ Created 55 Complaints & 30 Mess Feedback records!');
    console.log('========================================================');
    console.log('🎉 SEEDING COMPLETE! DEMO ACCOUNTS CREATED:');
    console.log('   👑 Admin:       admin@lpu.in        / password123');
    console.log('   🏢 Warden BH-1: warden.bh1@lpu.in   / password123');
    console.log('   🏢 Warden BH-2: warden.bh2@lpu.in   / password123');
    console.log('   🏢 Warden GH-1: warden.gh1@lpu.in   / password123');
    console.log('   🍲 Mess Manager: mess.alpha@lpu.in   / password123');
    console.log('   🎓 Student:     student1@lpu.in     / password123');
    console.log('========================================================');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
