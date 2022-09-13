const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const rakus = await prisma.user.create({
        data: {
            name: "rakus",
            password: "rakus",
            rooms: {
                create: {
                    roomId: 1,
                    created: new Date(),
                    updated: new Date(),
                },
            },
        },
    });

    await [...Array(20)]
        .map((v, k) => k)
        .map(async (v) => {
            await prisma.user.create({
                data: {
                    name: `rakus${v}`,
                    password: `rakus${v}`,
                    rooms: {
                        create: {
                            roomId: 1,
                            created: new Date(),
                            updated: new Date(),
                        },
                    },
                },
            });
        });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
