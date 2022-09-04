const { User, UserRoom, Message } = require("@prisma/client");
const prisma = require("../prisma/db");

exports.MessageUsecase = class {
    /**
     *
     * @param {number} senderId
     * @param {number} roomId
     * @param {string} data
     */
    static async sendMessage(senderId, roomId, data, isMemo = false) {
        await prisma.user.update({
            where: {
                id: senderId,
            },
            data: {
                messages: {
                    create: {
                        data,
                        roomId,
                        isMemo,
                        created: new Date(),
                    },
                },
            },
        });
    }
    /**
     *
     * @param {number} roomId
     */
    static async getRoomMessage(roomId) {
        return await prisma.message.findMany({
            where: {
                roomId,
                isMemo: false,
            },
        });
    }
    /**
     *
     * @param {number} senderId
     * @param {number} roomId
     */
    static async getMemo(senderId, roomId) {
        return await prisma.message.findMany({
            where: {
                roomId,
                senderId,
                isMemo: true,
            },
        });
    }
};
