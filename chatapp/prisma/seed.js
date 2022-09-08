const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const rakus = await prisma.user.create({
        data: {
            name: "rakus",
            password: "rakus",
            roomId: 0,
        },
    });

    const rakus1 = await prisma.user.create({
        data: {
            name: "rakus1",
            password: "rakus1",
            roomId: 0,
        },
    });

    console.log({ rakus, rakus1 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
