const { User, UserRoom, Message } = require("@prisma/client");
const prisma = require("../prisma/db");

exports.MessageUsecase = class {
    /**
     *
     * @param {string} senderName
     * @param {number} roomId
     * @param {string} data
     * @return {Promise<Message>}
     */
    static async sendMessage(senderName, roomId, data, isMemo = false) {
        const message = await prisma.message.create({
            data: {
                data,
                roomId,
                isMemo,
                created: new Date(),
            },
        });
        await prisma.user.update({
            where: {
                name: senderName,
            },
            data: {
                messages: {
                    connect: { id: message.id },
                },
            },
        });
        return message;
    }

    /**
     *
     * @param {number} messageid
     * @return {Promise<void>}
     */
    static async deleteMessage(messageid) {
        await prisma.message.delete({
            where: {
                messageid,
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
