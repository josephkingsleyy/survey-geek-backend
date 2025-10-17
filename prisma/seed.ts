import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ USERS
  const usersData = [
    { email: 'alice@example.com', username: 'alice', password: 'password123', firstName: 'Alice', lastName: 'Johnson', isActive: true, role: 'user' },
    { email: 'bob@example.com', username: 'bob', password: 'password123', firstName: 'Bob', lastName: 'Smith', isActive: true, role: 'user' },
    { email: 'carol@example.com', username: 'carol', password: 'password123', firstName: 'Carol', lastName: 'Davis', isActive: true, role: 'user' },
    { email: 'dave@example.com', username: 'dave', password: 'password123', firstName: 'Dave', lastName: 'Miller', isActive: false, role: 'user' },
    { email: 'erin@example.com', username: 'erin', password: 'password123', firstName: 'Erin', lastName: 'Wilson', isActive: true, role: 'admin' },
  ];

  const createdUsers: Awaited<ReturnType<typeof prisma.user.create>>[] = [];
  for (const u of usersData) {
    const hashedPassword = await hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hashedPassword, createdAt: new Date() },
    });
    createdUsers.push(user);
  }
  console.log(`✅ Created ${createdUsers.length} users`);

  // 2️⃣ SURVEY INTERESTS

  const interests = ['Technology', 'Health', 'Finance', 'Education', 'Sports'];
  // const createdInterests = [];
  const createdInterests: Awaited<ReturnType<typeof prisma.surveyInterest.create>>[] = [];
  for (const name of interests) {
    const si = await prisma.surveyInterest.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    createdInterests.push(si);
  }
  console.log(`✅ Created ${createdInterests.length} survey interests`);

  // 3️⃣ PAYMENTS
  // const payments = [];
  const payments: Awaited<ReturnType<typeof prisma.payment.create>>[] = [];
  for (let i = 0; i < 5; i++) {
    const ref = `PAY-${Date.now()}-${i}`;
    const p = await prisma.payment.upsert({
      where: { reference: ref },
      update: {},
      create: {
        amount: 100 + i * 10,
        currency: 'NGN',
        status: 'paid',
        method: 'card',
        reference: ref,
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

  // 4️⃣ BILLINGS
  // const billings = [];
  const billings: Awaited<ReturnType<typeof prisma.billing.create>>[] = [];
  for (let i = 0; i < 5; i++) {
    const b = await prisma.billing.create({
      data: {
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

  // 5️⃣ SURVEYS + SECTIONS + QUESTIONS
  // const surveys = [];
  const surveys: Awaited<ReturnType<typeof prisma.survey.create>>[] = [];
  const sampleOptions = [['Yes', 'No'], ['A', 'B', 'C'], ['1', '2', '3'], ['Red', 'Green'], ['Option1', 'Option2']];

  for (let i = 0; i < 5; i++) {
    const survey = await prisma.survey.create({
      data: {
        title: `Seed Survey ${i + 1}`,
        description: `This is a seeded survey #${i + 1}`,
        status: i % 2 === 0 ? 'OPEN' : 'DRAFT',
        requireResponse: true,
        minResponse: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        userId: createdUsers[i].id,
        surveyInterests: {
          connect: [{ id: createdInterests[i % createdInterests.length].id }],
        },
      },
    });
    surveys.push(survey);

    // ➕ Create a section for each survey
    const section = await prisma.section.create({
      data: {
        title: `Section 1 for Survey ${i + 1}`,
        description: 'Seeded section for demo',
        surveyId: survey.id,
      },
    });

    // ➕ Create a question under that section
    const question = await prisma.question.create({
      data: {
        sectionId: section.id, // ✅ correct relation
        text: `Question ${i + 1} for survey ${survey.id}`,
        type: i % 2 === 0 ? 'SINGLE_CHOICE' : 'TEXT',
        options: sampleOptions[i],
        scaleMin: i % 2 === 0 ? 1 : undefined,
        scaleMax: i % 2 === 0 ? 5 : undefined,
        allowUpload: false,
        userId: createdUsers[i].id,
      },
    });

    console.log(`✅ Created question: ${question.text}`);
  }

  // 6️⃣ RESPONSES
  // const responses = [];
  const responses: Awaited<ReturnType<typeof prisma.response.create>>[] = [];
  for (let i = 0; i < surveys.length; i++) {
    const section = await prisma.section.findFirst({ where: { surveyId: surveys[i].id } });
    const question = await prisma.question.findFirst({ where: { sectionId: section!.id } });

    const r = await prisma.response.create({
      data: {
        userId: createdUsers[(i + 1) % createdUsers.length].id,
        surveyId: surveys[i].id,
        questionId: question!.id,
        answerText: i % 2 === 0 ? `Answer text ${i}` : null,
        answerOption: i % 2 === 0 ? 'Yes' : null,
        rating: i % 2 === 0 ? 4 : null,
        updatedAt: new Date(),
      },
    });
    responses.push(r);
  }
  console.log(`✅ Created ${responses.length} responses`);

  // 7️⃣ TICKETS (with attachments)
  // const tickets = [];
  const tickets: Awaited<ReturnType<typeof prisma.ticket.create>>[] = [];
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
            {
              url: `https://example.com/file-${i + 1}.png`,
              filename: `file-${i + 1}.png`,
            },
          ],
        },
      },
      include: { attachments: true },
    });
    tickets.push(ticket);
  }
  console.log(`✅ Created ${tickets.length} tickets (with attachments)`);

  // 8️⃣ FILES
  // const files = [];
  const files: Awaited<ReturnType<typeof prisma.file.create>>[] = [];

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

  // 9️⃣ NOTIFICATIONS
  // const notifications = [];
  const notifications: Awaited<ReturnType<typeof prisma.notification.create>>[] = [];

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
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
