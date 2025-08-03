import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@madzone.cz' },
    update: {},
    create: {
      clerkId: 'demo-clerk-id',
      email: 'demo@madzone.cz',
      firstName: 'Demo',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create columns for Kanban board
  const todoColumn = await prisma.column.upsert({
    where: { id: 'todo-column' },
    update: {},
    create: {
      id: 'todo-column',
      title: 'To Do',
      position: 0,
      color: '#ef4444',
    },
  });

  const inProgressColumn = await prisma.column.upsert({
    where: { id: 'in-progress-column' },
    update: {},
    create: {
      id: 'in-progress-column',
      title: 'In Progress',
      position: 1,
      color: '#f59e0b',
    },
  });

  const reviewColumn = await prisma.column.upsert({
    where: { id: 'review-column' },
    update: {},
    create: {
      id: 'review-column',
      title: 'Review',
      position: 2,
      color: '#3b82f6',
    },
  });

  const doneColumn = await prisma.column.upsert({
    where: { id: 'done-column' },
    update: {},
    create: {
      id: 'done-column',
      title: 'Done',
      position: 3,
      color: '#10b981',
    },
  });

  console.log('✅ Created Kanban columns');

  // Create demo tasks
  const tasks = [
    {
      title: 'Implementovat GraphQL API',
      description: 'Vytvořit GraphQL endpoint pro týmový panel',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      columnId: inProgressColumn.id,
      position: 0,
    },
    {
      title: 'Navrhnout UI komponenty',
      description: 'Vytvořit základní UI komponenty pro aplikaci',
      status: 'DONE',
      priority: 'MEDIUM',
      columnId: doneColumn.id,
      position: 0,
    },
    {
      title: 'Testování funkcí',
      description: 'Provést kompletní testování všech funkcí',
      status: 'TODO',
      priority: 'LOW',
      columnId: todoColumn.id,
      position: 0,
    },
    {
      title: 'Code Review',
      description: 'Zkontrolovat kód před deploymentem',
      status: 'REVIEW',
      priority: 'HIGH',
      columnId: reviewColumn.id,
      position: 0,
    },
  ];

  for (const taskData of tasks) {
    await prisma.task.create({
      data: {
        ...taskData,
        createdById: user.id,
        assigneeId: user.id,
      },
    });
  }

  console.log('✅ Created demo tasks');

  // Create demo events
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const events = [
    {
      title: 'Týmová porada',
      description: 'Pravidelná týmová porada',
      start: today,
      end: new Date(today.getTime() + 60 * 60 * 1000), // 1 hour later
      allDay: false,
      color: '#3b82f6',
    },
    {
      title: 'Sprint Planning',
      description: 'Plánování nového sprintu',
      start: tomorrow,
      end: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      allDay: false,
      color: '#10b981',
    },
    {
      title: 'Retrospektiva',
      description: 'Sprint retrospektiva',
      start: nextWeek,
      allDay: true,
      color: '#f59e0b',
    },
  ];

  for (const eventData of events) {
    await prisma.event.create({
      data: {
        ...eventData,
        createdById: user.id,
      },
    });
  }

  console.log('✅ Created demo events');

  // Create expense categories
  const categories = [
    { name: 'Kancelářské potřeby', color: '#3b82f6', icon: '📎' },
    { name: 'Software', color: '#10b981', icon: '💻' },
    { name: 'Jídlo a pití', color: '#f59e0b', icon: '🍕' },
    { name: 'Doprava', color: '#ef4444', icon: '🚗' },
  ];

  const categoryPromises = categories.map(category =>
    prisma.expenseCategory.create({
      data: category,
    })
  );

  const createdCategories = await Promise.all(categoryPromises);
  console.log('✅ Created expense categories');

  // Create demo expenses
  const expenses = [
    {
      title: 'Licence na IDE',
      description: 'Roční licence na vývojové prostředí',
      amount: 2500.0,
      currency: 'CZK',
      date: today,
      categoryId: createdCategories[1].id, // Software
      status: 'APPROVED',
    },
    {
      title: 'Týmový oběd',
      description: 'Oběd pro celý vývojový tým',
      amount: 1200.0,
      currency: 'CZK',
      date: yesterday(),
      categoryId: createdCategories[2].id, // Jídlo a pití
      status: 'PENDING',
    },
    {
      title: 'Kancelářské papíry',
      description: 'Papíry pro tiskárnu',
      amount: 350.0,
      currency: 'CZK',
      date: lastWeek(),
      categoryId: createdCategories[0].id, // Kancelářské potřeby
      status: 'APPROVED',
    },
  ];

  for (const expenseData of expenses) {
    await prisma.expense.create({
      data: {
        ...expenseData,
        createdById: user.id,
      },
    });
  }

  console.log('✅ Created demo expenses');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'site_settings' },
    update: {},
    create: {
      id: 'site_settings',
      heroTitle: 'Madzone.cz',
      heroSubtitle: 'Moderní týmový nástroj pro správu projektů',
      primaryColor: '#3b82f6',
    },
  });

  console.log('✅ Created site settings');

  console.log('🎉 Database seeded successfully!');
}

function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function lastWeek() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
