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
                sender: {
                    connect: {
                        name: senderName,
                    },
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
                id: messageid,
            },
        });
    }

    /**
     *
     * @param {number} roomId
     * @param {Date|undefined} since
     * @param {boolean|undefined} isMemo
     */
    static async getRoomMessage(roomId, since, isMemo) {
        return await prisma.message.findMany({
            where: {
                roomId,
                isMemo,
                created: {
                    gt: since,
                },
            },
            orderBy: {
                created: "asc",
            },
        });
    }
};
