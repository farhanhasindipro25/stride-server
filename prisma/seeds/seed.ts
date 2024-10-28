import { Priority, PrismaClient, Status } from '@prisma/client';
function generateUID(length: number) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let uid = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uid += characters[randomIndex];
  }

  return uid;
}


const prisma = new PrismaClient();
async function main() {
  // Backing Up Category Data
  const existingCategories = await prisma.categories.findMany();
  if (existingCategories.length === 0) {
    const categoriesData = [
      {
        uid: generateUID(6),
        slug: 'backlog',
        name: 'BACKLOG',
        status: Status.ACTIVE,
        createdAt: new Date('2024-10-27T15:44:18.829Z'),
        updatedAt: new Date('2024-10-27T20:16:37.689Z'),
      },
      {
        uid: generateUID(6),
        slug: 'in-sprint',
        name: 'IN SPRINT',
        status: Status.ACTIVE,
        createdAt: new Date('2024-10-26T19:23:27.256Z'),
        updatedAt: new Date('2024-10-27T18:34:01.213Z'),
      },
      {
        uid: generateUID(6),
        slug: 'in-progress',
        name: 'IN PROGRESS',
        status: Status.ACTIVE,
        createdAt: new Date('2024-10-27T17:13:38.273Z'),
        updatedAt: new Date('2024-10-27T17:13:38.273Z'),
      },
      {
        uid: generateUID(6),
        slug: 'completed',
        name: 'COMPLETED',
        status: Status.ACTIVE,
        createdAt: new Date('2024-10-27T18:34:17.601Z'),
        updatedAt: new Date('2024-10-27T18:34:17.601Z'),
      },
      {
        uid: generateUID(6),
        slug: 'in-review',
        name: 'IN REVIEW',
        status: Status.ACTIVE,
        createdAt: new Date('2024-10-27T18:34:28.964Z'),
        updatedAt: new Date('2024-10-27T18:34:28.964Z'),
      },
    ];

    for (const category of categoriesData) {
      await prisma.categories.create({
        data: category,
      });
    }

    console.log('Categories seeded successfully!');
  }
  else {
    console.log('Categories already seeded. Skipping...');
  }

  // Backing Up Tags Data
  const existingTags = await prisma.tags.findMany();
    if (existingTags.length === 0) {
        const tagsData = [
            {
                uid: generateUID(6),
                slug: 'frontend',
                name: 'FRONTEND',
                createdAt: new Date('2024-10-27T19:04:25.923Z'),
                updatedAt: new Date('2024-10-27T19:04:25.923Z'),
            },
            {
                uid: generateUID(6),
                slug: 'backend',
                name: 'BACKEND',
                createdAt: new Date('2024-10-27T19:04:33.896Z'),
                updatedAt: new Date('2024-10-27T19:04:33.896Z'),
            },
            {
                uid: generateUID(6),
                slug: 'design',
                name: 'DESIGN',
                createdAt: new Date('2024-10-27T19:04:38.631Z'),
                updatedAt: new Date('2024-10-27T19:04:38.631Z'),
            },
            {
                uid: generateUID(6),
                slug: 'devops',
                name: 'DEVOPS',
                createdAt: new Date('2024-10-27T19:04:43.801Z'),
                updatedAt: new Date('2024-10-27T19:04:43.801Z'),
            },
            {
                uid: generateUID(6),
                slug: 'quality-assurance',
                name: 'QUALITY ASSURANCE',
                createdAt: new Date('2024-10-27T19:04:53.885Z'),
                updatedAt: new Date('2024-10-27T19:04:53.885Z'),
            },
            {
                uid: generateUID(6),
                slug: 'testing',
                name: 'TESTING',
                createdAt: new Date('2024-10-27T19:05:35.323Z'),
                updatedAt: new Date('2024-10-27T19:05:35.323Z'),
            },
            {
                uid: generateUID(6),
                slug: 'test',
                name: 'TEST',
                createdAt: new Date('2024-10-27T20:14:40.242Z'),
                updatedAt: new Date('2024-10-27T20:14:40.242Z'),
            },
        ];
        for (const tag of tagsData) {
            await prisma.tags.create({
                data: tag,
            });
        }
        console.log('Tags seeded successfully!');
    } else {
        console.log('Tags already seeded. Skipping...');
    }

    const existingTasks = await prisma.tasks.findMany();
    if (existingTasks.length === 0) {
        const taskData = {
            uid: generateUID(6),
            title: 'Hello There. Welcome to Stride!',
            description: 'Get started right away by editing this task.',
            dueDate: new Date(),
            priority: Priority.NORMAL,
            completionStatus: false,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.tasks.create({
            data: taskData,
        });

        console.log('Greeting Task seeded successfully!');
    } else {
        console.log('Tasks already seeded. Skipping...');
    }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
