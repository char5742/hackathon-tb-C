const { User, Message, UserRoom } = require("@prisma/client");
const prisma = require("../prisma/db");
class UsedException extends Error {}

exports.UserUsecase = class {
    /**
     * @param {string} userName
     * @param {string} password
     * @return {Promise<void>}
     * @throws {UsedException}
     */
    static async signUp(userName, password) {
        const user = await prisma.user.findUnique({
            where: {
                name: userName,
            },
        });
        // 同じ名前が存在しないように
        if (user != null) {
            throw new UsedException();
        }
        await prisma.user.create({
            data: {
                name: userName,
                password: password,
            },
        });
    }
    /**
     * @param {string} userName
     * @param {string} password
     * @return {Promise<User|null>}
     */
    static async signIn(userName, password) {
        const user = await prisma.user.findUnique({
            where: {
                name: userName,
            },
        });
        if (user === null || user.password !== password) {
            return null;
        }
        return user;
    }

    /**
     * @param {string} userName
     * @param {number} roomId
     * @return {Promise<void>}
     */
    static async enterRoom(userName, roomId) {
        await prisma.userRoom.upsert({
            where: {
                roomId_userName: {
                    userName,
                    roomId,
                },
            },
            update: {
                updated: new Date(),
            },
            create: {
                roomId,
                created: new Date(),
                updated: new Date(),
                user: {
                    connect: {
                        name: userName,
                    },
                },
            },
        });
    }
    /**
     * @param {string} userName
     * @param {number} roomId
     * @return {Promise<void>}
     */
    static async exitRoom(userName, roomId) {
        await prisma.userRoom.update({
            where: {
                roomId_userName: {
                    userName,
                    roomId,
                },
            },
            data: {
                updated: new Date(),
            },
        });
    }
    /**
     * @param {string} userName
     * @return {Promise<User|null>}
     */
    static async getUserByName(userName) {
        return await prisma.user.findUnique({
            where: {
                name: userName,
            },
            include: {
                rooms: {
                    created: true,
                    updated: true,
                },
            },
        });
    }

    /**
     * @param {string} userName
     * @param {number} roomId
     * @return {Promise<UserRoom|null>}
     */
    static async getUserRoom(userName, roomId) {
        return await prisma.userRoom.findUnique({
            where: {
                roomId_userName: {
                    userName,
                    roomId,
                },
            },
        });
    }

    static async getUserAllByRoom(roomId) {
        return await prisma.userRoom
            .findMany({
                where: {
                    roomId,
                },
                orderBy: {
                    updated: "asc",
                },
                select: {
                    user: true,
                },
            })
            .then((v) => v.map((u) => u.user));
    }

    static async getUserAll() {
        return await prisma.user.findMany();
    }
};
