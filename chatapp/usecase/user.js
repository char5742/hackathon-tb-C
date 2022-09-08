const { User, Message } = require("@prisma/client");
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
                roomId: 1,
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
        if (user.password !== password) {
            return null;
        }

        return user;
    }

    /**
     * @param {number} userId
     * @param {number} roomId
     * @return {Promise<void>}
     */
    static async enterRoom(userId, roomId) {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                roomId,
            },
        });
    }
    /**
     * @param {number} userId
     * @param {number} roomId
     * @return {Promise<void>}
     */
    static async exitRoom(userId, roomId) {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                roomId: 0,
                rooms: {
                    update: {
                        where: {
                            id: roomId,
                        },
                        data: {
                            updated: new Date(),
                        },
                    },
                },
            },
        });
    }

    static async getUserByName(userName) {
        return await prisma.user.findUnique({
            where: {
                name: userName,
            },
        });
    }
    static async getUserAll() {
        return await prisma.user.findMany();
    }
};
