import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1) Create 5 users
  const usersData = [
    { email: 'alice@example.com', username: 'alice', password: 'password123', firstName: 'Alice', lastName: 'Johnson', isActive: true, role: 'user' },
    { email: 'bob@example.com', username: 'bob', password: 'password123', firstName: 'Bob', lastName: 'Smith', isActive: true, role: 'user' },
    { email: 'carol@example.com', username: 'carol', password: 'password123', firstName: 'Carol', lastName: 'Davis', isActive: true, role: 'user' },
    { email: 'dave@example.com', username: 'dave', password: 'password123', firstName: 'Dave', lastName: 'Miller', isActive: false, role: 'user' },
    { email: 'erin@example.com', username: 'erin', password: 'password123', firstName: 'Erin', lastName: 'Wilson', isActive: true, role: 'admin' },
  ];

  const createdUsers = [] as any[];
  for (const u of usersData) {
    const hashedPassword = await hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        username: u.username,
        password: hashedPassword,
        firstName: u.firstName,
        lastName: u.lastName,
        isActive: u.isActive,
        role: u.role,
        createdAt: new Date(),
      },
    });
    createdUsers.push(user);
  }

  console.log(`✅ Created ${createdUsers.length} users`);

  // 2) Create 5 survey interests
  const interests = ['Technology', 'Health', 'Finance', 'Education', 'Sports'];
  const createdInterests = [] as any[];
  for (const name of interests) {
    const si = await prisma.surveyInterest.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    createdInterests.push(si);
  }
  console.log(`✅ Created ${createdInterests.length} survey interests`);

  // 3) Create 5 payments (one per first 5 users)
  const payments = [] as any[];
  for (let i = 0; i < 5; i++) {
    const p = await prisma.payment.upsert({
      where: { reference: `PAY-${Date.now()}-${i}` },
      update: {},
      create: {
        amount: 100 + i * 10,
        currency: 'NGN',
        status: 'paid',
        method: 'card',
        reference: `PAY-${Date.now()}-${i}`,
        description: `Seed payment ${i}`,
        paidAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: createdUsers[i].id,
      },
    });
    payments.push(p);
  }
  console.log(`✅ Created ${payments.length} payments`);

  // 4) Create 5 billings - attach to users 0..4
  const billings = [] as any[];
  for (let i = 0; i < 5; i++) {
    const b = await prisma.billing.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        planName: `Plan ${i + 1}`,
        amount: 9.99 + i,
        currency: 'NGN',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * (i + 1)),
        userId: createdUsers[i].id,
      },
    });
    billings.push(b);
  }
  console.log(`✅ Created ${billings.length} billings`);

  // 5) Create 5 surveys each by a user and connect to some interests
  const surveys = [] as any[];
  for (let i = 0; i < 5; i++) {
    const s = await prisma.survey.create({
      data: {
        title: `Seed Survey ${i + 1}`,
        description: `This is a seeded survey #${i + 1}`,
        status: i % 2 === 0 ? 'published' : 'draft',
        requireResponse: true,
        minResponse: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        userId: createdUsers[i].id,
        surveyInterests: {
          connect: [
            { id: createdInterests[i % createdInterests.length].id },
          ],
        },
      },
    });
    surveys.push(s);
  }
  console.log(`✅ Created ${surveys.length} surveys`);

  // 6) Create 5 questions (one per survey)
  const questions = [] as any[];
  const sampleOptions = [['Yes', 'No'], ['A', 'B', 'C'], ['1', '2', '3'], ['Red', 'Green'], ['Option1', 'Option2']];
  for (let i = 0; i < 5; i++) {
    const q = await prisma.question.create({
      data: {
        surveyId: surveys[i].id,
        text: `Question ${i + 1} for survey ${surveys[i].id}`,
        type: i % 2 === 0 ? 'SINGLE_CHOICE' : 'TEXT',
        options: sampleOptions[i],
        scaleMin: i % 2 === 0 ? 1 : undefined,
        scaleMax: i % 2 === 0 ? 5 : undefined,
        allowUpload: false,
        userId: createdUsers[i].id,
      },
    });
    questions.push(q);
  }
  console.log(`✅ Created ${questions.length} questions`);

  // 7) Create 5 responses linking users, surveys and questions
  const responses = [] as any[];
  for (let i = 0; i < 5; i++) {
    const r = await prisma.response.create({
      data: {
        userId: createdUsers[(i + 1) % createdUsers.length].id,
        surveyId: surveys[i].id,
        questionId: questions[i].id,
        answerText: i % 2 === 0 ? `Answer text ${i}` : undefined,
        answerOption: i % 2 === 0 ? sampleOptions[i][0] : undefined,
        answerOptions: i % 2 !== 0 ? sampleOptions[i] : undefined,
        rating: i % 2 === 0 ? 4 : undefined,
        uploadUrl: undefined,
      },
    });
    responses.push(r);
  }
  console.log(`✅ Created ${responses.length} responses`);

  // 8) Create 5 tickets with nested attachments
  const tickets = [] as any[];
  for (let i = 0; i < 5; i++) {
    const ticket = await prisma.ticket.create({
      data: {
        title: `Seed Ticket ${i + 1}`,
        description: `A sample ticket seeded ${i + 1}`,
        status: 'OPEN',
        priority: i % 2 === 0 ? 'MEDIUM' : 'HIGH',
        category: 'general',
        userId: createdUsers[i].id,
        assignedToId: createdUsers[(i + 1) % createdUsers.length].id,
        attachments: {
          create: [
            { url: `https://example.com/file-${i + 1}.png`, filename: `file-${i + 1}.png` },
          ],
        },
      },
      include: { attachments: true },
    });
    tickets.push(ticket);
  }
  console.log(`✅ Created ${tickets.length} tickets (with attachments)`);

  // 9) Create 5 standalone files (not linked to tickets)
  const files = [] as any[];
  for (let i = 0; i < 5; i++) {
    const f = await prisma.file.create({
      data: {
        url: `https://example.com/standalone-${i + 1}.txt`,
        filename: `standalone-${i + 1}.txt`,
      },
    });
    files.push(f);
  }
  console.log(`✅ Created ${files.length} standalone files`);

  // 10) Create 5 notifications for different users
  const notifications = [] as any[];
  for (let i = 0; i < 5; i++) {
    const n = await prisma.notification.create({
      data: {
        userId: createdUsers[i].id,
        title: `Welcome ${createdUsers[i].firstName}`,
        message: `This is a seeded notification #${i + 1}`,
        type: 'system',
      },
    });
    notifications.push(n);
  }
  console.log(`✅ Created ${notifications.length} notifications`);

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
